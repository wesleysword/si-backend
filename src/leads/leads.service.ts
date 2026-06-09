import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) {}

  create(createLeadDto: CreateLeadDto) {
    return this.prisma.lead.create({
      data: createLeadDto,
    });
  }

  findAll() {
    return this.prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  update(id: string, updateLeadDto: UpdateLeadDto) {
    return this.prisma.lead.update({
      where: { id },
      data: updateLeadDto,
    });
  }

  remove(id: string) {
    return this.prisma.lead.delete({
      where: { id },
    });
  }
}