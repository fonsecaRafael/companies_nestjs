import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompaniesService } from './companies.service';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { NotFoundException } from '@nestjs/common/exceptions';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let companyRepository: Repository<Company>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompaniesService,
        {
          provide: getRepositoryToken(Company),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            softDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
    companyRepository = module.get<Repository<Company>>(
      getRepositoryToken(Company),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should create a company', () => {
      const dto: CreateCompanyDto = {
        name: 'Empresa Teste',
        cnpj: '12.345.678/0001-99',
        address: 'Rua Exemplo, 123',
      };

      const mockCompany = { id: 1, ...dto, deletedAt: null };
      jest.spyOn(companyRepository, 'create').mockReturnValue(mockCompany);
      jest.spyOn(companyRepository, 'save').mockResolvedValue(mockCompany);

      const result = service.create(dto);
      expect(
        companyRepository.create.bind(companyRepository),
      ).toHaveBeenCalledWith(dto);
      expect(
        companyRepository.save.bind(companyRepository),
      ).toHaveBeenCalledWith(mockCompany);
      expect(result).toEqual(mockCompany);
    });
  });

  describe('findAll()', () => {
    it('should return active companies', () => {
      const mockCompanies: Company[] = [
        {
          id: 1,
          name: 'Empresa A',
          cnpj: '12.345.678/0001-99',
          address: 'Rua A, 123',
          deletedAt: null,
        },
      ];

      jest.spyOn(companyRepository, 'find').mockResolvedValue(mockCompanies);

      const result = service.findAll();
      expect(
        companyRepository.find.bind(companyRepository),
      ).toHaveBeenCalledWith({ where: { deletedAt: null } });
      expect(result).toEqual(mockCompanies);
    });
  });

  describe('findOne()', () => {
    it('should return a company by CNPJ', () => {
      const id = 1;
      const mockCompany: Company = {
        id,
        cnpj: '12.345.678/0001-99',
        name: 'Empresa Teste',
        address: 'Rua Exemplo, 123',
        deletedAt: null,
      };

      jest.spyOn(companyRepository, 'findOne').mockResolvedValue(mockCompany);

      const result = service.findOne(id);
      expect(
        companyRepository.findOne.bind(companyRepository),
      ).toHaveBeenCalledWith({ where: { id, deletedAt: null } });
      expect(result).toEqual(mockCompany);
    });

    it('should throw NotFoundException if company does not exist', async () => {
      jest.spyOn(companyRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(8)).rejects.toThrow(NotFoundException);
    });
  });

  describe('softDelete()', () => {
    it('should perform soft delete', () => {
      jest
        .spyOn(companyRepository, 'softDelete')
        .mockResolvedValue({ affected: 1 } as any);

      service.softDelete(1);
      expect(
        companyRepository.softDelete.bind(companyRepository),
      ).toHaveBeenCalledWith({ id: '1' });
    });

    it('should throw NotFoundException if company does not exist', async () => {
      jest
        .spyOn(companyRepository, 'softDelete')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.softDelete(2)).rejects.toThrow(NotFoundException);
    });
  });
});
