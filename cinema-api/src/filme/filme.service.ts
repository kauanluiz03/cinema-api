import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';

@Injectable()
export class FilmeService {
  constructor(private readonly prisma: PrismaService) {}

  create(createFilmeDto: CreateFilmeDto) {
    return this.prisma.filme.create({
      data: {
        ...createFilmeDto,
        dataInicioExibicao: new Date(createFilmeDto.dataInicioExibicao),
        dataFinalExibicao: new Date(createFilmeDto.dataFinalExibicao),
      },
    });
  }

  findAll() {
    return this.prisma.filme.findMany({
      include: { cinema: true, sessoes: true },
    });
  }

  async findOne(id: number) {
    const filme = await this.prisma.filme.findUnique({
      where: { id },
      include: { cinema: true, sessoes: true },
    });
    if (!filme) {
      throw new NotFoundException(`Filme com id ${id} não encontrado`);
    }
    return filme;
  }

  async update(id: number, updateFilmeDto: UpdateFilmeDto) {
    await this.findOne(id);

    const data: Record<string, unknown> = { ...updateFilmeDto };
    if (updateFilmeDto.dataInicioExibicao) {
      data.dataInicioExibicao = new Date(updateFilmeDto.dataInicioExibicao);
    }
    if (updateFilmeDto.dataFinalExibicao) {
      data.dataFinalExibicao = new Date(updateFilmeDto.dataFinalExibicao);
    }

    return this.prisma.filme.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.filme.delete({ where: { id } });
  }
}
