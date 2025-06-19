import { Company } from '../../../companies/entities/company.entity';
import { ProductType } from '../../../shared/enums/product-type.enum';
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ProductType })
  type: ProductType;

  @Column({ type: 'varchar', length: 20 })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  @Column('decimal', { precision: 11, scale: 2 })
  price: number;

  @DeleteDateColumn()
  deletedAt?: Date;

  // Relationship
  @ManyToOne(() => Company, (company) => company.products)
  company: Company;
}
