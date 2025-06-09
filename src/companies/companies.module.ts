import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { PartnersModule } from './partners/partners.module';
import { CnaesModule } from './cnaes/cnaes.module';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  imports: [PartnersModule, CnaesModule],
})
export class CompaniesModule {}
