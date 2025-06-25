import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePartnerDto {
  @ApiProperty({
    example: 'Rafael Abreu Fonseca',
    description: 'Nome completo do sócio da empresa. Máximo 120 caracteres.',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '000.000.000-00',
    description: 'Código que descreve um CPF.',
  })
  @IsString()
  cpf: string;

  @IsNumber()
  companyId: number;
}
