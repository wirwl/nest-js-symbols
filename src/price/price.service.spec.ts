import { Test, TestingModule } from '@nestjs/testing';
import { ERRORS, PriceService } from './price.service';

describe('PriceService', () => {
  let service: PriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceService],
    }).compile();

    service = module.get<PriceService>(PriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Check isValidExchange function', () => {
    it('Check isValidExchange function, right value: binance', () => {
      expect(service.isValidExchange('binance')).toBeTruthy();
    });

    it('Check isValidExchange function, right value: bitmex', () => {
      expect(service.isValidExchange('bitmex')).toBeTruthy();
    });

    it('Check isValidExchange function, right value: bybit', () => {
      expect(service.isValidExchange('bybit')).toBeTruthy();
    });

    it('Check isValidExchange function, wrong value: abcdef', () => {
      expect(service.isValidExchange('abcdef')).toBeFalsy();
    });
  });

  describe('Check getPrice function return value', () => {
    jest.setTimeout(30000);
    it('Single values in symbols and dates for binance exchange', async () => {
      const res: PriceResponce = JSON.parse(`{"ETH/USDT":{"1619740800000":2757.04}}`);
      expect(await service.getPrice({
        exchange: 'binance',
        symbols: 'ETH/USDT',
        dates: '2021-04-30'
      })).
        toStrictEqual(res);
    });

    it('Multiple values in symbols and dates for binance exchange', async () => {
      const res: PriceResponce = JSON.parse(`{"BTC/USDT":{"1619568000000":55011.97,"1619654400000":54846.23,"1619740800000":53555},"ETH/USDT":{"1619568000000":2666.13,"1619654400000":2748.23,"1619740800000":2757.04}}`);
      expect(await service.getPrice({
        exchange: 'binance',
        symbols: 'BTC/USDT,ETH/USDT',
        dates: '2021-04-28,2021-04-29,2021-04-30'
      })).
        toStrictEqual(res);
    });

    it('Check if bitmex exchange is present', async () => {
      const res: PriceResponce = JSON.parse(`{"BTC/USD":{"1619568000000":55050.5,"1619654400000":54869.5,"1619740800000":53524},"ETH/USD":{"1619568000000":2674,"1619654400000":2752.75,"1619740800000":2761.05}}`);
      expect(await service.getPrice({
        exchange: 'bitmex',
        symbols: 'BTC/USD,ETH/USD',
        dates: '2021-04-28,2021-04-29,2021-04-30'
      })).
        toStrictEqual(res);
    });

    it('Check if bybit exchange is present', async () => {
      const res: PriceResponce = JSON.parse(`{"BTC/USDT":{"1619568000000":54993.5,"1619654400000":54827,"1619740800000":53508},"ETH/USDT":{"1619568000000":2667.95,"1619654400000":2748,"1619740800000":2758.85}}`);
      expect(await service.getPrice({
        exchange: 'bybit',
        symbols: 'BTC/USDT,ETH/USDT',
        dates: '2021-04-28,2021-04-29,2021-04-30'
      })).
        toStrictEqual(res);
    });

    it('Check if wrong exchange name is present', async () => {
      expect(await service.getPrice({
        exchange: 'WrongABC',
        symbols: 'BTC/USD,ETH/USD',
        dates: '2021-04-28,2021-04-29,2021-04-30'
      })).
        toStrictEqual(ERRORS.invalidExchange);
    });

    it('Wrong symbol will be ignored', async () => {
      const res: PriceResponce = JSON.parse(`{"BTC/USD":{"1619568000000":55050.5}}`);
      expect(await service.getPrice({
        exchange: 'bitmex',
        symbols: 'BTC/USD, ETHRUB',
        dates: '2021-04-28'
      })).
        toStrictEqual(res);
    });
  });

});
