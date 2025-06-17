import { Test, TestingModule } from '@nestjs/testing';
import { CnaesService } from './cnaes.service';
import { Cnae } from './entities/cnae.entity';
import { CreateCnaeDto } from './dto/create-cnae.dto';
import { Repository } from 'typeorm';

// inicio

import { getRepositoryToken } from '@nestjs/typeorm';

// fim
describe('CnaesService', () => {
  let service: CnaesService;
  let repository: Repository<Cnae>;

  const dto: CreateCnaeDto = {
    code: '2599-3/02',
    description: 'FERRO E AÇO CORTE E DOBRA (NÃO ASSOCIADO AO COMÉRCIO)',
    main: true,
  };

  const mockCnae = {
    id: 1,
    ...dto,
    company: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CnaesService,
        {
          provide: getRepositoryToken(Cnae),
          useValue: {
            save: jest.fn().mockResolvedValue(mockCnae),
            find: jest.fn().mockResolvedValue([mockCnae]),
            findOne: jest
              .fn()
              .mockImplementation((options: any) =>
                Promise.resolve(options.where.id === mockCnae.id ? mockCnae : null),
            ),
            softDelete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<CnaesService>(CnaesService);
    repository = module.get<Repository<Cnae>>(getRepositoryToken(Cnae));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should create a CNAE', async () => {
      const result = await service.create(dto);
      expect(result).toEqual(mockCnae);
      expect(repository.save).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of CNAEs', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockCnae]);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should return a CNAE when ID exists', async () => {
      const result = await service.findOne(mockCnae.id);
      expect(result).toEqual(mockCnae);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: mockCnae.id },
      });
    });

    it('should return null when id does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
      const result = await service.findOne(999);
      expect(result).toBeNull();
    });
  });

  describe('softDelete()', () => {
    it('should delete a CNAE', async () => {
      const result = await service.softDelete(mockCnae.id);
      expect(result).toBeUndefined();
      expect(repository.softDelete).toHaveBeenCalledWith({
        id: mockCnae.id,
      });
    });

    it('should throw error when CNAE not found', async () => {
      jest.spyOn(repository, 'softDelete').mockResolvedValueOnce({ affected: 0 });
      await expect(service.softDelete(999)).rejects.toThrow('CNAE não encontrado.');
    });
  });
});
