import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../src/companies/entities/company.entity';
import { Address } from '../src/addresses/entities/address.entity';
import { Contact } from '../src/contacts/entities/contact.entity';
import { Partner } from '../src/partners/entities/partner.entity';
import { Cnae } from '../src/companies/cnaes/entities/cnae.entity';
import { Product } from '../src/companies/products/entities/product.entity';
import { Revenue } from '../src/companies/revenues/entities/revenue.entity';

export const TestDBModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test_user',
  password: 'test_password',
  database: 'nest_companies_test',
  entities: [Company, Cnae, Product, Revenue, Address, Contact, Partner], // Adicione todas entidades testadas
  synchronize: true,
  dropSchema: true,
});
