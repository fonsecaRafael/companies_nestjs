// update-company.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CompanySize, LegalNature, CompanyStatus } from '../../shared/enums';
import { IsString, IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class UpdateCompanyDto {
  @ApiPropertyOptional({
    example: 'Razão Social Ltda',
    description: 'Razão social',
  })
  @IsString()
  @IsOptional()
  company_name?: string;

  @ApiPropertyOptional({
    example: 'Lojas Americaaanas',
    description: 'Nome comercial',
  })
  @IsString()
  @IsOptional()
  commercial_name?: string;

  @ApiPropertyOptional({
    example: '2020-12-31',
    description: 'Data de fundação',
  })
  @IsDate()
  @IsOptional()
  founding_date?: Date;

  @ApiPropertyOptional({
    example: 10000.85,
    description: 'Capital social em R$',
  })
  @IsNumber()
  @IsOptional()
  capital_social?: number;

  @ApiPropertyOptional({ enum: LegalNature, example: LegalNature.LTDA })
  @IsEnum(LegalNature)
  @IsOptional()
  legal_nature?: LegalNature;

  @ApiPropertyOptional({ enum: CompanySize, example: CompanySize.MEDIUM })
  @IsEnum(CompanySize)
  @IsOptional()
  size?: CompanySize;

  @ApiPropertyOptional({ enum: CompanyStatus, example: CompanyStatus.ACTIVE })
  @IsEnum(CompanyStatus)
  @IsOptional()
  status?: CompanyStatus;

  @ApiPropertyOptional({
    example: '2023-12-31',
    description: 'Data do último status',
  })
  @IsDate()
  @IsOptional()
  status_date?: Date;
}
