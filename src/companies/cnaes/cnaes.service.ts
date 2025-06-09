import { Injectable } from '@nestjs/common';
import { CreateCnaeDto } from './dto/create-cnae.dto';
import { UpdateCnaeDto } from './dto/update-cnae.dto';

@Injectable()
export class CnaesService {
  create(createCnaeDto: CreateCnaeDto) {
    return 'This action adds a new cnae';
  }

  findAll() {
    return `This action returns all cnaes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cnae`;
  }

  update(id: number, updateCnaeDto: UpdateCnaeDto) {
    return `This action updates a #${id} cnae`;
  }

  remove(id: number) {
    return `This action removes a #${id} cnae`;
  }
}
