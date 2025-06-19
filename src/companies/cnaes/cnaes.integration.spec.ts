import { Test } from '@nestjs/testing';
import { CnaesModule } from './cnaes.module';
import { CnaesService } from './cnaes.service';
import { Cnae } from './entities/cnae.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../entities/company.entity';
import { Address } from '../../addresses/entities/address.entity';
import { Partner } from '../../partners/entities/partner.entity';
import { Revenue } from '../revenues/entities/revenue.entity';
import { Product } from '../products/entities/product.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { CreateCnaeDto } from './dto/create-cnae.dto';

describe('CnaesService (Integration)', () => {
  let service: CnaesService;
  const dto = new CreateCnaeDto();
  Object.assign(dto, {
    code: '2599-3/02',
    description: 'FERRO E AÇO CORTE E DOBRA (NÃO ASSOCIADO AO COMÉRCIO)',
    main: true,
  });

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'test_user',
          password: 'test_password',
          database: 'nest_companies_test',
          entities: [Cnae, Company, Address, Partner, Revenue, Product, Contact],
          synchronize: true,
          dropSchema: true,
        }),
        CnaesModule,
      ],
    }).compile();

    service = module.get<CnaesService>(CnaesService);
  });

  afterEach(async () => {
    await service['cnaeRepository'].clear();
  });

  it('should create a CNAE', async () => {
    const created = await service.create(dto);
    expect(created).toHaveProperty('id');
  });

  it('should find a CNAE', async () => {
    const created = await service.create(dto);
    const found = await service.findOne(created.id);
    expect(found.id).toBe(created.id);
  });

  it('should create a CNAE', async () => {
    const created = await service.create(dto);
    const updated = await service.update(created.id, {
      main: false,
    });
    expect(updated.main).toBe(false);
  });

  it('should create a CNAE', async () => {
    const created = await service.create(dto);
    const found = await service.findOne(created.id);
    await service.softDelete(found.id);
    await expect(service.findOne(created.id)).rejects.toThrow('CNAE não encontrado');
  });
});
