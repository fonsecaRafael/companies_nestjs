import { CompanySize, CompanyStatus, LegalNature, Tributation } from '../../shared/enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToMany,
  Index,
} from 'typeorm';
import { Address } from '../../addresses/entities/address.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { Partner } from '../../partners/entities/partner.entity';
import { Revenue } from '../revenues/entities/revenue.entity';
import { Product } from '../products/entities/product.entity';
import { Cnae } from '../cnaes/entities/cnae.entity';

@Entity()
@Index(['cnpj'], {
  unique: true,
  where: '"deletedAt" IS NULL',
})
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: false })
  cnpj: string;

  @Column({ type: 'varchar', length: 200 })
  company_name: string;

  @Column({ type: 'varchar', length: 150 })
  commercial_name: string;

  @Column({ type: 'date' })
  founding_date: Date;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  capital_social: number;

  @Column({ type: 'enum', enum: LegalNature })
  legal_nature: LegalNature;

  @Column({ type: 'enum', enum: CompanySize })
  size: CompanySize;

  @Column({ type: 'enum', enum: CompanyStatus })
  status: CompanyStatus;

  @Column({ type: 'date' })
  status_date: Date;

  @Column({ type: 'enum', enum: Tributation })
  tributation: Tributation;

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

  @ManyToMany(() => Partner, (partner) => partner.companies)
  partners: Partner[];

  @OneToMany(() => Cnae, (cnae) => cnae.company)
  cnaes: Cnae[];

  @OneToMany(() => Revenue, (revenue) => revenue.company)
  revenues: Revenue[];

  @OneToMany(() => Product, (product) => product.company)
  products: Product[];
}
