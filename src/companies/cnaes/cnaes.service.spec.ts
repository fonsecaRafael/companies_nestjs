import { Test, TestingModule } from '@nestjs/testing';
import { CnaesService } from './cnaes.service';
import { Cnae } from './entities/cnae.entity';
import { CreateCnaeDto } from './dto/create-cnae.dto';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('CnaesService', () => {
  let service: CnaesService;
  let cnaeRepository: Repository<Cnae>;

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
            create: jest.fn().mockImplementation(dto => dto),
            save: jest.fn().mockResolvedValue(mockCnae),
            find: jest.fn().mockResolvedValue([mockCnae]),
            findOne: jest
              .fn()
              .mockImplementation((options: any) =>
                Promise.resolve(options.where.id === mockCnae.id ? mockCnae : null),
              ),
            softDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CnaesService>(CnaesService);
    cnaeRepository = module.get<Repository<Cnae>>(getRepositoryToken(Cnae));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should create a CNAE', async () => {
      const result = await service.create(dto);
      expect(result).toEqual(mockCnae);
      expect(cnaeRepository.save).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of CNAEs', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockCnae]);
      expect(cnaeRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should return a CNAE when ID exists', async () => {
      const result = await service.findOne(mockCnae.id);
      expect(result).toEqual(mockCnae);
      expect(cnaeRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockCnae.id },
      });
    });

    it('should return null when id does not exist', async () => {
      jest.spyOn(cnaeRepository, 'findOne').mockResolvedValueOnce(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('softDelete()', () => {
    it('should perform a CNAE soft delete', async () => {
      const id = 1;
      jest.spyOn(cnaeRepository, 'softDelete').mockResolvedValue({ affected: 1 } as any);

      await service.softDelete(id);
      expect(cnaeRepository.softDelete).toHaveBeenCalledWith({ id });
    });

    it('should throw NotFoundException if CNAE does not exist', async () => {
      jest.spyOn(cnaeRepository, 'softDelete').mockResolvedValue({ affected: 0 } as any);

      await expect(service.softDelete(1)).rejects.toThrow(NotFoundException);
    });
  });
});
