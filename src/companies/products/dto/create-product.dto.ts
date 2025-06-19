import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ProductType } from 'src/shared/enums';

export class CreateProductDto {
  @ApiProperty({ enum: ProductType, example: ProductType.PRODUCT })
  @IsEnum(ProductType)
  type: ProductType;

  @ApiProperty({
    example: 'JBTY9856KL3',
    description: 'Código que identifica o produto. Tamanho máximo 20 caracteres.',
  })
  @IsString()
  code: string;

  @ApiProperty({
    example: 'Esta é a caixa de som mais potente do Brasil!',
    description: 'Descrição do produto. Tamanho máximo 200 caracteres.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 200.25,
    description: 'Valor com até duas casas decimais que representa o preço do produto em Reais.'
  })
  @IsNumber()
  price: number;
}
