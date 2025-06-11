import { ApiProperty } from '@nestjs/swagger';
import { CompanySize, CompanyStatus, LegalNature } from 'src/shared/enums';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: '00.000.000/0001-00' })
  cnpj: string;

  @Column()
  @ApiProperty({ example: 'Razão Social Ltda' })
  company_name: string;

  @Column()
  @ApiProperty({ example: 'Nome Fantasia' })
  commercial_name: string;

  @Column()
  @ApiProperty({ example: 'Rua Exemplo, 123' })
  address: string;

  @Column({ type: 'date' })
  @ApiProperty({ example: '2020-01-01' })
  founding_date: Date;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  @ApiProperty({ example: 1000000 })
  capital_social: number;

  @Column({ type: 'enum', enum: LegalNature })
  @ApiProperty({ enum: LegalNature })
  legal_nature: LegalNature;

  @Column({ type: 'enum', enum: CompanySize })
  @ApiProperty({ enum: CompanySize })
  size: CompanySize;

  @Column({ type: 'enum', enum: CompanyStatus })
  @ApiProperty({ enum: CompanyStatus })
  status: CompanyStatus;

  @Column({ type: 'date' })
  @ApiProperty({ example: '2023-01-01' })
  status_date: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
