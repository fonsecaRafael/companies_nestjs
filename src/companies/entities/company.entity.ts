import { ApiProperty } from '@nestjs/swagger';
import { CompanySize, CompanyStatus, LegalNature } from '../../shared/enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Address } from '../../addresses/entities/address.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { Partner } from '../partners/entities/partner.entity';
import { Revenue } from '../revenues/entities/revenue.entity';
import { Product } from '../products/entities/product.entity';
import { Cnae } from '../cnaes/entities/cnae.entity';

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

  // Relationship
  @OneToMany(() => Address, (address) => address.company)
  addresses: Address[];

  @OneToMany(() => Contact, (contact) => contact.company)
  contacts: Contact[];

  @OneToMany(() => Partner, (partner) => partner.company)
  partners: Partner[];

  @OneToMany(() => Cnae, (cnae) => cnae.company)
  cnaes: Cnae[];

  @OneToMany(() => Revenue, (revenue) => revenue.company)
  revenues: Revenue[];

  @OneToMany(() => Product, (product) => product.company)
  products: Product[];
}
