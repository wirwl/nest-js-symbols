/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { PriceDto } from './price.dto';

const ccxt = require('ccxt');

const validExchanges = ['binance', 'bitmex', 'bybit'];

const isValidExchange = (exchange: string): boolean =>
  validExchanges.includes(exchange);

@Injectable()
export class PriceService {
  async getPrice(price: PriceDto): Promise<PriceResponce> {
    if (!isValidExchange(price.exchange))
      return {
        error: `Неправильное имя биржи, допустимые значения: 'binance', 'bitmex', 'bybit'`,
      };

    const result = {};
    const exchange = new ccxt[price.exchange]();
    const symbols = price.symbols && price.symbols.split(',');
    const dates = price.dates && price.dates.split(',');

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    if (exchange.has.fetchOHLCV)
      for (const symbol of symbols) {
        await exchange.loadMarkets();

        if (exchange.symbols.includes(symbol)) {
          result[symbol] = {};

          for (const date of dates) {
            await sleep(exchange.rateLimit); // milliseconds
            const fData = await exchange.fetchOHLCV(
              symbol,
              exchange.timeframes['1d'],
              exchange.parse8601(`${date}T00:00:00Z`),
              1,
            );

            const [date8601, openPrice] = fData[0];
            if (date8601 && openPrice)
              result[symbol][exchange.iso8601(date8601)] = openPrice;
          }
        }
      }

    return result;
  }
}