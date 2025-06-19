import { Company } from '../../companies/entities/company.entity';
import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Partner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @Column({ unique: true })
  cpf: string;

  @DeleteDateColumn()
  deletedAt?: Date;

  // Relationship
  @ManyToMany(() => Company, (company) => company.partners)
  @JoinTable({
    name: 'company_partners',
    joinColumn: { name: 'partner_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'company_id', referencedColumnName: 'id' },
  })
  companies: Company[];
}
