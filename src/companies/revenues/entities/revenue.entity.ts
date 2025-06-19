import { Company } from '../../../companies/entities/company.entity';
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Revenue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  year: number;

  @Column('int')
  month: number;

  @Column('decimal', { precision: 15, scale: 2 })
  value: number;

  @DeleteDateColumn()
  deletedAt?: Date;

  // Relationship
  @ManyToOne(() => Company, (company) => company.revenues)
  company: Company;
}
