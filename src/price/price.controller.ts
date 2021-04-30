import { Get, Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { PriceDto } from './price.dto';
import { PriceService } from './price.service';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  async getPrice(@Query() priceDTO: PriceDto): Promise<string> {
    return await this.priceService.getPrice(priceDTO);
  }
}
