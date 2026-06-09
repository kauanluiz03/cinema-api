import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessaoDto } from './dto/create-sessao.dto';
import { UpdateSessaoDto } from './dto/update-sessao.dto';

@Injectable()
export class SessaoService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSessaoDto: CreateSessaoDto) {
    return this.prisma.sessao.create({
      data: {
        ...createSessaoDto,
        horarioExibicao: new Date(createSessaoDto.horarioExibicao),
      },
    });
  }

  findAll() {
    return this.prisma.sessao.findMany({
      include: { filme: true, sala: true, cinema: true, ingressos: true },
    });
  }

  async findOne(id: number) {
    const sessao = await this.prisma.sessao.findUnique({
      where: { id },
      include: { filme: true, sala: true, cinema: true, ingressos: true },
    });
    if (!sessao) {
      throw new NotFoundException(`Sessão com id ${id} não encontrada`);
    }
    return sessao;
  }

  async update(id: number, updateSessaoDto: UpdateSessaoDto) {
    await this.findOne(id);

    const data: Record<string, unknown> = { ...updateSessaoDto };
    if (updateSessaoDto.horarioExibicao) {
      data.horarioExibicao = new Date(updateSessaoDto.horarioExibicao);
    }

    return this.prisma.sessao.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.sessao.delete({ where: { id } });
  }
}
