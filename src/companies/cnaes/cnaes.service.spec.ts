import { Test, TestingModule } from '@nestjs/testing';
import { CnaesService } from './cnaes.service';

describe('CnaesService', () => {
  let service: CnaesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CnaesService],
    }).compile();

    service = module.get<CnaesService>(CnaesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
