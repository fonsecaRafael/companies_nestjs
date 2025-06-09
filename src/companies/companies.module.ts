import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { PartnersModule } from './partners/partners.module';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  imports: [PartnersModule],
})
export class CompaniesModule {}
