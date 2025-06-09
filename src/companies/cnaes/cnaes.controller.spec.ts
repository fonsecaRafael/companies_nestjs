import { Test, TestingModule } from '@nestjs/testing';
import { CnaesController } from './cnaes.controller';
import { CnaesService } from './cnaes.service';

describe('CnaesController', () => {
  let controller: CnaesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CnaesController],
      providers: [CnaesService],
    }).compile();

    controller = module.get<CnaesController>(CnaesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
