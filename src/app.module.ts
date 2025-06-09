import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [CompaniesModule, AddressesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
