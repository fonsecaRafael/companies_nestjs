import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { PartnersModule } from './partners/partners.module';
import { CnaesModule } from './cnaes/cnaes.module';
import { RevenuesModule } from './revenues/revenues.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  imports: [PartnersModule, CnaesModule, RevenuesModule, ProductsModule, TypeOrmModule.forFeature([Company])],
})
export class CompaniesModule {}
