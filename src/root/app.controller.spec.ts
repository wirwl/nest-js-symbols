import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return some text', () => {
      const url=`/price?exchange=binance&symbols=BTC/USDT,ETH/USDT,USDT/RUB&dates=2021-04-27,2021-04-28,2021-04-29,2021-04-30,2021-04-01,2021-04-02`;
      expect(appController.getHello()).toBe(`<p>For test /price follow this link: <a href=${url}>${url}</a></p>`);
    });
  });
});
