/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { json } from 'express';
import { time } from 'node:console';
import { PriceDto } from './price.dto';

const ccxt = require('ccxt');

@Injectable()
export class PriceService {
  async getPrice(price: PriceDto): Promise<string> {
    const exchange = new ccxt[price.exchange]();
    const symbols = price.symbols && price.symbols.split(',');
    const dates = price.dates && price.dates.split(',');
    const result = {};

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (const symbol of symbols) {
      result[symbol] = {};
      for (const date of dates) {
        if (exchange.has.fetchOHLCV) {
          await sleep(exchange.rateLimit); // milliseconds
          const fData = await exchange.fetchOHLCV(
            symbol,
            exchange.timeframes['1d'],
            exchange.parse8601(`${date}T00:00:00Z`),
            1,
          );
          // return JSON.stringify(fData[0]);
          const [date8601, openPrice] = fData[0];
          if (date8601 && openPrice)
            result[symbol][exchange.iso8601(date8601)] = openPrice;
        }
      }
    }

    return JSON.stringify(result);
  }
}

/*
{
  exchange: 'binance',
  symbols: [
    {
      symbol: 'BTC/USDT',
      prices: [
        '1514764800000': 4000000,
        '1514774800000': 5000000,
        '1514784800000': 6000000,
      ]
    },
    {
      symbol: 'BTC/RUB',
      prices: [
        '1514764800000': 4000000,
        '1514774800000': 5000000,
        '1514784800000': 6000000,
      ]
    }
  ]
}
*/

/*
{
  exchange: 'binance',
  dates: [
    '1514764800000': [      
      'BTC/USDT': 4000000,      
      'BTC/RUB': 4000000      
    ],
    '1514774800000': [
      'BTC/USDT': 4000000,
      'BTC/RUB': 4000000      
    ],
    '1514784800000': [      
      'BTC/USDT': 4000000,      
      'BTC/RUB': 4000000,
    ]
  ]
}
*/

/*
[   
    '1514764800000': [      
      'BTC/USDT': 4000000,      
      'BTC/RUB': 4000000      
    ],
    '1514774800000': [
      'BTC/USDT': 4000000,
      'BTC/RUB': 4000000      
    ],
    '1514784800000': [      
      'BTC/USDT': 4000000,      
      'BTC/RUB': 4000000,
    ]  
]
*/

/*
{
  {
    price
  }
}
*/
