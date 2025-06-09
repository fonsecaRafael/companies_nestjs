import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { PartnersModule } from './partners/partners.module';
import { CnaesModule } from './cnaes/cnaes.module';
import { RevenuesModule } from './revenues/revenues.module';
import { ProductsModule } from './products/products.module';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  imports: [PartnersModule, CnaesModule, RevenuesModule, ProductsModule],
})
export class CompaniesModule {}
