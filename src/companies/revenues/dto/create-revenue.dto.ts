import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateRevenueDto {
  @ApiProperty({
    example: '2025',
    description: '4 dígitos que representam o ano em questão.',
  })
  @IsNumber()
  year: number;

  @ApiProperty({
    example: '02',
    description: 'Número entre 01 e 12 que representa o mês do ano.',
  })
  @IsNumber()
  month: number;

  @ApiProperty({
    example: '1500.25',
    description: 'Valor com até duas casas decimais que representam o valor faturado naquele mês pela empresa.',
  })
  @IsNumber()
  value: number;
}
