import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    example: 'Quadra 86 Bloco B',
    description: 'Parte do endereço, máximo 100 caracteres.',
  })
  @IsString()
  logradouro: string;

  @ApiProperty({
    example: 'Brasília',
    description: 'Nome da cidade, máximo 50 caracteres.',
  })
  @IsString()
  city: string;

  @ApiProperty({
    example: '777-0225',
    description: 'Código de 8 dígitos.',
  })
  cep: string;

  @ApiProperty({
    example: 'Ao lado da sorveteria Doce Mel',
    description: 'Espaço que comporta pontos de referência, máximo 50 caracteres.',
  })
  @IsString()
  complement: string;

  @ApiProperty({
    example: 'DF',
    description: 'Sigla da entidade federativa, máximo 02 caracteres.',
  })
  @IsString()
  uf: string;

  @ApiProperty({
    example: '06',
    description: 'Número da casa.',
  })
  @IsNumber()
  numero: number;

  @ApiProperty({
    example: '2020-01-01',
    description: 'Data em que este endereço passou a ser o endereço do cliente.',
  })
  @IsDate()
  startDate: Date;

  @ApiProperty({
    example: '2024-01-01',
    description: 'Data em que este endereço deixou de ser o endereço do cliente.',
  })
  @IsDate()
  endDate: Date | null;

  @ApiProperty({
    example: 'Avenida São Paulo',
    description: 'Parte principal do endereço.',
  })
  @IsString()
  street: string;

  // Relationship
  @IsNumber()
  companyId: number;
}
