import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { ProductType } from 'src/shared/enums';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({ enum: ProductType, example: ProductType.PRODUCT })
  @IsEnum(ProductType)
  @IsOptional()
  type: ProductType;

  @ApiPropertyOptional({
    example: 'JBTY9856KL3',
    description: 'Código que identifica o produto. Tamanho máximo 20 caracteres.',
  })
  @IsString()
  @IsOptional()
  code: string;

  @ApiPropertyOptional({
    example: 'Esta é a caixa de som mais potente do Brasil!',
    description: 'Descrição do produto. Tamanho máximo 200 caracteres.',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({
    example: 200.25,
    description: 'Valor com até duas casas decimais que representa o preço do produto em Reais.',
  })
  @IsNumber()
  @IsOptional()
  price: number;
}
