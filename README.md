## Описание

Api для получения цены открытия валютных пар на биржах: binance, bitmex, bybit.

Примеры url:
+ http://localhost:3000/price?exchange=binance&symbols=BTC/USDT,ETH/USDT,USDT/RUB&dates=2021-04-27,2021-04-28,2021-04-29,2021-04-30,2021-04-01,2021-04-02
+ http://localhost:3000/price?exchange=bitmex&symbols=BTC/USD,ETH/USD&dates=2021-04-27,2021-04-28,2021-04-29,2021-04-30,2021-04-01,2021-04-02
+ http://localhost:3000/price?exchange=bybit&symbols=BTC/USDT,ETH/USDT&dates=2021-04-27,2021-04-28,2021-04-29,2021-04-30,2021-04-01,2021-04-02

## Установка

```bash
$ yarn install
```

## Запуск

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Тесты

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```