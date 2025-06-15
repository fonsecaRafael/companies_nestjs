import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompaniesService } from './companies.service';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CompanySize, CompanyStatus, LegalNature, Tributation } from '../shared/enums';

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
    companyRepository = module.get<Repository<Company>>(getRepositoryToken(Company));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should create a company', async () => {
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
      jest.spyOn(companyRepository, 'create').mockReturnValue(mockCompany);
      jest.spyOn(companyRepository, 'save').mockResolvedValue(mockCompany);

      const result = await service.create(dto);
      expect(companyRepository.create).toHaveBeenCalledWith(dto);
      expect(companyRepository.save).toHaveBeenCalledWith(mockCompany);
      expect(result).toEqual(mockCompany);
    });
  });

  describe('findAll()', () => {
    it('should return active companies', async () => {
      const mockCompanies: Company[] = [
        {
          id: 1,
          name: 'Empresa A',
          cnpj: '12.345.678/0001-99',
          deletedAt: undefined,
        },
      ];

      jest.spyOn(companyRepository, 'find').mockResolvedValue(mockCompanies);

      const result = await service.findAll();
      expect(companyRepository.find).toHaveBeenCalledWith({
        where: { deletedAt: null },
      });
      expect(result).toEqual(mockCompanies);
    });
  });

  // describe('findOne()', () => {
  //   it('should return a company by CNPJ', async () => {
  //     const cnpj = '12.345.678/0001-99';
  //     const mockCompany: Company = {
  //       id: 1,
  //       cnpj,
  //       name: 'Empresa Teste',
  //       deletedAt: null,
  //     };

  //     jest.spyOn(companyRepository, 'findOne').mockResolvedValue(mockCompany);

  //     const result = await service.findOne(cnpj);
  //     expect(companyRepository.findOne).toHaveBeenCalledWith({
  //       where: { cnpj, deletedAt: null },
  //     });
  //     expect(result).toEqual(mockCompany);
  //   });

  //   it('should throw NotFoundException if company does not exist', async () => {
  //     jest.spyOn(companyRepository, 'findOne').mockResolvedValue(null);

  //     await expect(service.findOne('00.000.000/0001-00')).rejects.toThrow(NotFoundException);
  //   });
  // });

  // describe('softDelete()', () => {
  //   it('should perform soft delete', async () => {
  //     const cnpj = '12.345.678/0001-99';
  //     jest.spyOn(companyRepository, 'softDelete').mockResolvedValue({ affected: 1 } as any);

  //     await service.softDelete(cnpj);
  //     expect(companyRepository.softDelete).toHaveBeenCalledWith({ cnpj });
  //   });

  //   it('should throw NotFoundException if company does not exist', async () => {
  //     jest.spyOn(companyRepository, 'softDelete').mockResolvedValue({ affected: 0 } as any);

  //     await expect(service.softDelete('00.000.000/0001-00')).rejects.toThrow(NotFoundException);
  //   });
  // });
});
