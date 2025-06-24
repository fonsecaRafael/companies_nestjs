import { Module } from '@nestjs/common';
import { RevenuesService } from './revenues.service';
import { RevenuesController } from './revenues.controller';
import { Revenue } from './entities/revenue.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [RevenuesController],
  providers: [RevenuesService],
  imports: [TypeOrmModule.forFeature([Revenue])],
})
export class RevenuesModule {}
