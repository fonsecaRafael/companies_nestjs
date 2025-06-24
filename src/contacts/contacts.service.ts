import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const company = await this.companyRepository.findOne({ where: { id: createContactDto.companyId } });
    if (!company) {
      throw new NotFoundException('Empresa não encontrada.');
    }
    const contact = this.contactRepository.create({ ...createContactDto, company });
    return this.contactRepository.save(contact);
  }

  async findAll(): Promise<Contact[]> {
    return this.contactRepository.find();
  }

  async findOne(id: number): Promise<Contact> {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (!contact) {
      throw new NotFoundException('Contato não encontrado.');
    }
    return contact;
  }

  async update(id: number, updateContactDto: UpdateContactDto): Promise<Contact> {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (!contact) {
      throw new NotFoundException('Contato não encontrado.');
    }
    this.contactRepository.merge(contact, updateContactDto);
    return this.contactRepository.save(contact);
  }

  async softDelete(id: number): Promise<void> {
    const result = await this.contactRepository.softDelete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Contato não encontrado.');
    }
  }
}
