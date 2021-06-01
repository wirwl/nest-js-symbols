Используя typescript, nestjs и библиотеку ccxt создайте веб сервис, в котором будет реализована поддержка следующего REST запроса:

### /price

Запрос принимает GET параметры:

- exchange - только binance, bitmex, bybit
- symbols - торговая пара (или несколько). Пример торговой пары: BTC/USDT
- dates - массив дат для цены в формате yyyy-mm-dd Например: 2020-12-01

Возвращает: цены символа на указанной бирже в указанные даты. В формате JSON.

### Для получения цены с биржи используйте:

- метод fetchOHLCV в библиотеке ccxt
- timeframe = 1d
- Из возвращенного биржей результата возьмите цену открытия (open), 2-й элемент в массиве, возвращаемом fetchOHLCV

### Где почитать документацию:

[https://nestjs.com/](https://nestjs.com/)
[https://github.com/ccxt/ccxt](https://github.com/ccxt/ccxt)
[https://github.com/ccxt/ccxt/wiki/Manual](https://github.com/ccxt/ccxt/wiki/Manual)

### Дополнительные плюсы:

- Чистый код, комментарии
- Покрытие тестами кода
- Построить визуальный график изменения цены на основе этих данных


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
