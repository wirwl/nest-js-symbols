import { Get, Query, Render } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { PriceDto } from './price.dto';
import { PriceService } from './price.service';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  @Render('price')
  async getPrice(@Query() priceDTO: PriceDto): Promise<PriceResponce> {
    return { data: JSON.stringify( await this.priceService.getPrice(priceDTO))};
  }
}
