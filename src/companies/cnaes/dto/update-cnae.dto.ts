import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateCnaeDto } from './create-cnae.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateCnaeDto extends PartialType(CreateCnaeDto) {
  @ApiPropertyOptional({
    example: '2599-3/02',
    description: 'Código informado pelo IBGE. Tamanho máximo 10.',
  })
  @IsString()
  @IsOptional()
  code: string;

  @ApiPropertyOptional({
    example: 'FERRO E AÇO CORTE E DOBRA (NÃO ASSOCIADO AO COMÉRCIO)',
    description: 'Descrição informada pelo IBGE.',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({
    example: 'true',
    description: 'Informa se esta é a atividade principal executada pela empresa ou não.',
  })
  @IsBoolean()
  @IsOptional()
  main: boolean;
}
