import { Test, TestingModule } from '@nestjs/testing';
import { PriceController } from './price.controller';
import { PriceService } from './price.service';

describe('PriceController', () => {
  let controller: PriceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceService],
      controllers: [PriceController],
    }).compile();

    controller = module.get<PriceController>(PriceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
