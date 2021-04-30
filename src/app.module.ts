import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PriceController } from './price/price.controller';
import { PriceService } from './price/price.service';

@Module({
  imports: [],
  controllers: [AppController, PriceController],
  providers: [AppService, PriceService],
})
export class AppModule {}
