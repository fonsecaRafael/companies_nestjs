import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanySize, CompanyStatus, LegalNature, Tributation } from '../shared/enums';
import { NotFoundException } from '@nestjs/common';

describe('CompaniesController', () => {
  let controller: CompaniesController;
  let service: CompaniesService;

  const dto: CreateCompanyDto = {
    company_name: 'Empresa Teste',
    cnpj: '12.345.678/0001-99',
    commercial_name: 'Nome Fantasia',
    founding_date: new Date(2024, 12, 31),
    capital_social: 15000.25,
    legal_nature: LegalNature.LTDA,
    size: CompanySize.SMALL,
    status: CompanyStatus.ACTIVE,
    status_date: new Date(2022, 12, 31),
    tributation: Tributation.SIMPLES,
  };

  const mockCompany = {
    id: 1,
    ...dto,
    addresses: [],
    contacts: [],
    partners: [],
    cnaes: [],
    revenues: [],
    products: [],
    created_at: new Date(2024, 1, 1),
    updated_at: new Date(),
    deletedAt: undefined,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [
        {
          provide: CompaniesService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockCompany),
            findAll: jest.fn().mockResolvedValue([mockCompany]),
            findOne: jest
              .fn()
              .mockImplementation((id: number) => Promise.resolve(id === mockCompany.id ? mockCompany : null)),
            softDelete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);
    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a company', async () => {
      const result = await controller.create(dto);
      expect(result).toEqual(mockCompany);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of companies', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockCompany]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should return a company when id exists', async () => {
      const result = await controller.findOne(mockCompany.id);
      expect(result).toEqual(mockCompany);
      expect(service.findOne).toHaveBeenCalledWith(mockCompany.id);
    });

    it('should return 404 when id does not exist', async () => {
      const companyNotFoundMsg = 'Empresa não encontrado.';
      (service.findOne as jest.Mock).mockRejectedValueOnce(new NotFoundException(companyNotFoundMsg));
      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('softDelete()', () => {
    it('should delete a company', async () => {
      await controller.remove(mockCompany.id);
      expect(service.softDelete).toHaveBeenCalledWith(mockCompany.id);
    });
  });
});