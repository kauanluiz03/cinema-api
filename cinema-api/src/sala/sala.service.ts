import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';

@Injectable()
export class SalaService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSalaDto: CreateSalaDto) {
    return this.prisma.sala.create({ data: createSalaDto });
  }

  findAll() {
    return this.prisma.sala.findMany({
      include: { cinema: true, sessoes: true },
    });
  }

  async findOne(id: number) {
    const sala = await this.prisma.sala.findUnique({
      where: { id },
      include: { cinema: true, sessoes: true },
    });
    if (!sala) {
      throw new NotFoundException(`Sala com id ${id} não encontrada`);
    }
    return sala;
  }

  async update(id: number, updateSalaDto: UpdateSalaDto) {
    await this.findOne(id);
    return this.prisma.sala.update({
      where: { id },
      data: updateSalaDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.sala.delete({ where: { id } });
  }
}
