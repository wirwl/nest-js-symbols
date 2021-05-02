import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/root/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  jest.setTimeout(30000);

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    const url=`/price?exchange=binance&symbols=BTC/USDT,ETH/USDT,USDT/RUB&dates=2021-04-27,2021-04-28,2021-04-29,2021-04-30,2021-04-01,2021-04-02`;
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(`<p>For test /price follow this link: <a href=${url}>${url}</a></p>`);
  });
});
