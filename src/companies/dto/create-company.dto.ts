// create-company.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsEnum, IsNumber } from 'class-validator';
import { IsCnpj } from '../../validators/iscnpj.decorator';
import { CompanySize, LegalNature, CompanyStatus } from '../../shared/enums';

export class CreateCompanyDto {
  @ApiProperty({
    example: '00.000.000/0001-00',
    description: 'CNPJ da empresa',
  })
  @IsCnpj()
  cnpj: string;

  @ApiProperty({ example: 'Razão Social Ltda', description: 'Razão social' })
  @IsString()
  company_name: string;

  @ApiProperty({ example: 'Nome Fantasia', description: 'Nome comercial' })
  @IsString()
  commercial_name: string;

  @ApiProperty({ example: '2020-01-01', description: 'Data de fundação' })
  @IsDate()
  founding_date: Date;

  @ApiProperty({ example: 1000000, description: 'Capital social em R$' })
  @IsNumber()
  capital_social: number;

  @ApiProperty({ enum: LegalNature, example: LegalNature.LTDA })
  @IsEnum(LegalNature)
  legal_nature: LegalNature;

  @ApiProperty({ enum: CompanySize, example: CompanySize.MEDIUM })
  @IsEnum(CompanySize)
  size: CompanySize;

  @ApiProperty({ enum: CompanyStatus, example: CompanyStatus.ACTIVE })
  @IsEnum(CompanyStatus)
  status: CompanyStatus;

  @ApiProperty({ example: '2023-01-01', description: 'Data do último status' })
  @IsDate()
  status_date: Date;
}
