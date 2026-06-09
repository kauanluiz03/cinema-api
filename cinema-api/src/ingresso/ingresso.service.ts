import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIngressoDto } from './dto/create-ingresso.dto';
import { UpdateIngressoDto } from './dto/update-ingresso.dto';

@Injectable()
export class IngressoService {
  constructor(private readonly prisma: PrismaService) {}

  create(createIngressoDto: CreateIngressoDto) {
    return this.prisma.ingresso.create({ data: createIngressoDto });
  }

  findAll() {
    return this.prisma.ingresso.findMany({
      include: { sessao: true, pedidos: true },
    });
  }

  async findOne(id: number) {
    const ingresso = await this.prisma.ingresso.findUnique({
      where: { id },
      include: { sessao: true, pedidos: true },
    });
    if (!ingresso) {
      throw new NotFoundException(`Ingresso com id ${id} não encontrado`);
    }
    return ingresso;
  }

  async update(id: number, updateIngressoDto: UpdateIngressoDto) {
    await this.findOne(id);
    return this.prisma.ingresso.update({
      where: { id },
      data: updateIngressoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.ingresso.delete({ where: { id } });
  }
}
