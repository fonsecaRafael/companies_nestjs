import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from './entities/partner.entity';
import { Company } from '../companies/entities/company.entity';

@Module({
  controllers: [PartnersController],
  providers: [PartnersService],
  imports: [TypeOrmModule.forFeature([Partner, Company])],
})
export class PartnersModule {}
