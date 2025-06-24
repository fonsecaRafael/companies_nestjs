import { IsNumber, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  street: string;

  @IsString()
  city: string;

  // Relationship
  @IsNumber()
  companyId: number;
}
