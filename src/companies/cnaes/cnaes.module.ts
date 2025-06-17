import { Module } from '@nestjs/common';
import { CnaesService } from './cnaes.service';
import { CnaesController } from './cnaes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cnae } from './entities/cnae.entity';

@Module({
  controllers: [CnaesController],
  providers: [CnaesService],
  imports: [TypeOrmModule.forFeature([Cnae])],
})
export class CnaesModule {}
