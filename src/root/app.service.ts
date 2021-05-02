import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const url=`/price?exchange=binance&symbols=BTC/USDT,ETH/USDT,USDT/RUB&dates=2021-04-27,2021-04-28,2021-04-29,2021-04-30,2021-04-01,2021-04-02`;
    return `<p>For test /price follow this link: <a href=${url}>${url}</a></p>`;
  }
}
