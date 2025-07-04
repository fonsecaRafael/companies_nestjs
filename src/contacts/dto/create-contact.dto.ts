import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({
    example: 'XX123459999',
    description: 'Sequencia de números que representam um telefone brasileiro.',
  })
  @IsString()
  phone: string;

  @IsNumber()
  companyId: number;
}
