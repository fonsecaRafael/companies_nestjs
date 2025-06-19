import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateCnaeDto {
  @ApiProperty({
    example: '2599-3/02',
    description: 'Código informado pelo IBGE. Tamanho máximo 10.',
  })
  @IsString()
  code: string;

  @ApiProperty({
    example: 'FERRO E AÇO CORTE E DOBRA (NÃO ASSOCIADO AO COMÉRCIO)',
    description: 'Descrição informada pelo IBGE.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'true',
    description: 'Informa se esta é a atividade principal executada pela empresa ou não.',
  })
  @IsBoolean()
  main: boolean;
}
