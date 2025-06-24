import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateRevenueDto {
  @ApiPropertyOptional({
    example: '2025',
    description: '4 dígitos que representam o ano em questão.',
  })
  @IsNumber()
  @IsOptional()
  year: number;

  @ApiPropertyOptional({
    example: '02',
    description: 'Número entre 01 e 12 que representa o mês do ano.',
  })
  @IsNumber()
  @IsOptional()
  month: number;

  @ApiPropertyOptional({
    example: '1500.25',
    description: 'Valor com até duas casas decimais que representam o valor faturado naquele mês pela empresa.',
  })
  @IsNumber()
  @IsOptional()
  value: number;
}
