import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLancheComboDto } from './dto/create-lanche-combo.dto';
import { UpdateLancheComboDto } from './dto/update-lanche-combo.dto';

@Injectable()
export class LancheComboService {
  constructor(private readonly prisma: PrismaService) {}

  create(createLancheComboDto: CreateLancheComboDto) {
    const subtotal =
      createLancheComboDto.valorUnitario * createLancheComboDto.qtUnidade;

    return this.prisma.lancheCombo.create({
      data: { ...createLancheComboDto, subtotal },
    });
  }

  findAll() {
    return this.prisma.lancheCombo.findMany({ include: { pedidos: true } });
  }

  async findOne(id: number) {
    const combo = await this.prisma.lancheCombo.findUnique({
      where: { id },
      include: { pedidos: true },
    });
    if (!combo) {
      throw new NotFoundException(`Combo com id ${id} não encontrado`);
    }
    return combo;
  }

  async update(id: number, updateLancheComboDto: UpdateLancheComboDto) {
    const atual = await this.findOne(id);

    // Recalcula o subtotal com os valores novos (ou mantém os atuais).
    const valorUnitario =
      updateLancheComboDto.valorUnitario ?? atual.valorUnitario;
    const qtUnidade = updateLancheComboDto.qtUnidade ?? atual.qtUnidade;
    const subtotal = valorUnitario * qtUnidade;

    return this.prisma.lancheCombo.update({
      where: { id },
      data: { ...updateLancheComboDto, subtotal },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.lancheCombo.delete({ where: { id } });
  }
}
