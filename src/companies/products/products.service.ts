import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newproduct = this.productRepository.create(createProductDto);
    return this.productRepository.save(newproduct);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) throw new NotFoundException('CNAE não encontrado');
    return product;
  }

  async update(id: number, updateCnaeDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }
    this.productRepository.merge(product, updateCnaeDto);
    return this.productRepository.save(product);
  }

  async softDelete(id: number): Promise<void> {
    const result = await this.productRepository.softDelete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Cnae não encontrado.');
    }
  }
}
