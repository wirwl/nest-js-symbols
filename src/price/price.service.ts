import { Injectable } from '@nestjs/common';
import { PriceDto } from './price.dto';

const ccxt = require('ccxt');

const validExchanges = ['binance', 'bitmex', 'bybit'];

export const ERRORS = {
  invalidExchange: {
    error: "Неправильное имя биржи, допустимые значения: binance, bitmex, bybit",
  }
};


@Injectable()
export class PriceService {
  // Метод для проверки входит ли имя биржи в список допустимых
  isValidExchange = (exchange: string): boolean => validExchanges.includes(exchange);

  // Метод для получения данных с биржи
  async getPrice(price: PriceDto): Promise<PriceResponce> {
    // Если неправильное имя биржи, возвращаем ошибку
    if (!this.isValidExchange(price.exchange))
      return ERRORS.invalidExchange;

    const result = {};
    const exchange = new ccxt[price.exchange]();
    const symbols = price.symbols && price.symbols.split(',');
    const dates = price.dates && price.dates.split(',');

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    if (exchange.has.fetchOHLCV) {
      await exchange.loadMarkets();
      // Проходим по списку валютных пар
      for (const symbol of symbols) {
        // Проверяем есть ли валютная пара на бирже
        if (exchange.symbols.includes(symbol)) {
          result[symbol] = {};

          // Проходим по указанным датам
          for (const date of dates) {
            await sleep(exchange.rateLimit);
            const fData = await exchange.fetchOHLCV(
              symbol,
              '1d',
              exchange.parse8601(`${date}T00:00:00Z`),
              1,
            );

            const [date8601, openPrice] = fData[0];
            if (date8601 && openPrice)
              result[symbol][date8601] = openPrice;
          }
        }
      }
    }

    return result;
  }
}
