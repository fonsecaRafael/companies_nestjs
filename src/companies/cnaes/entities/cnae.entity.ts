import { Company } from 'src/companies/entities/company.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Cnae {
  /********************************************************************************
   ** This entity should have  your values to code and description obtained from **
   ** an IBGE table, and made a relationship 1 Cnae to N companies in order to   **
   ** normalization of DB but this table is huge and make the project to complex **
   ** So lets make a simplification here                                         **
   ********************************************************************************/
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column()
  main: boolean;

  // Relationship
  @ManyToOne(() => Company, (company) => company.cnaes)
  company: Company;
}
