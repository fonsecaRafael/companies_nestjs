import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Company } from '../../companies/entities/company.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  logradouro: string;

  @Column({ type: 'varchar', length: 50 })
  city: string;

  @Column({ type: 'varchar', length: 8 })
  cep: string;

  @Column({ type: 'varchar', length: 50 })
  complement: string;

  @Column({ type: 'varchar', length: 2 })
  uf: string;

  @Column('int')
  numero: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date | null;

  @DeleteDateColumn()
  deletedAt?: Date;

  // Relationship
  @ManyToOne(() => Company, (company) => company.addresses)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
