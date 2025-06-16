import { Test, TestingModule } from '@nestjs/testing';
import { CnaesController } from './cnaes.controller';
import { CnaesService } from './cnaes.service';
import { CreateCnaeDto } from './dto/create-cnae.dto';
import { NotFoundException } from '@nestjs/common';

describe('CnaesController', () => {
  let controller: CnaesController;
  let service: CnaesService;

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
      controllers: [CnaesController],
      providers: [
        {
          provide: CnaesService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockCnae),
            findAll: jest.fn().mockResolvedValue([mockCnae]),
            findOne: jest
              .fn()
              .mockImplementation((id: number) => Promise.resolve(id === mockCnae.id ? mockCnae : null)),
            softDelete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<CnaesController>(CnaesController);
    service = module.get<CnaesService>(CnaesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a CNAE', async () => {
      const result = await controller.create(dto);
      expect(result).toEqual(mockCnae);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of companies', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockCnae]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should return a CNAE when id exists', async () => {
      const result = await controller.findOne(mockCnae.id);
      expect(result).toEqual(mockCnae);
    });

    it('should return 404 when id does not exist', async () => {
      const cnaeNotFoundMsg = 'CNAE não encontrado.';
      (service.findOne as jest.Mock).mockRejectedValueOnce(new NotFoundException(cnaeNotFoundMsg));
      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('softDelete()', () => {
    it('should delete a CNAE', async () => {
      await controller.remove(mockCnae.id);
      expect(service.softDelete).toHaveBeenCalledWith(mockCnae.id);
    });
  });
});
