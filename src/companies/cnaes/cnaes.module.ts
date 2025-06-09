import { Module } from '@nestjs/common';
import { CnaesService } from './cnaes.service';
import { CnaesController } from './cnaes.controller';

@Module({
  controllers: [CnaesController],
  providers: [CnaesService],
})
export class CnaesModule {}
