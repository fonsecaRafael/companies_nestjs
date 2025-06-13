import { Company } from '../../companies/entities/company.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Partner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  cpf: string;

  // Relationship
  @ManyToMany(() => Company, (company) => company.partners)
  @JoinTable({
    name: 'company_partners',
    joinColumn: { name: 'partner_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'company_id', referencedColumnName: 'id' },
  })
  companies: Company[];
}
