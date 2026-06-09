import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

interface IngressoValor {
  valorInteira: number;
  valorMeia: number;
}

interface ComboValor {
  subtotal: number;
}

@Injectable()
export class PedidoService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Regra de negócio:
   *   valorTotal = (soma dos ingressos) + (soma dos combos)
   *
   *   soma dos ingressos = Σ (qtInteira * valorInteira + qtMeia * valorMeia)
   *   soma dos combos    = Σ (subtotal do combo)
   */
  private calcularValorTotal(
    qtInteira: number,
    qtMeia: number,
    ingressos: IngressoValor[],
    combos: ComboValor[],
  ): number {
    const totalIngressos = ingressos.reduce(
      (acc, i) => acc + qtInteira * i.valorInteira + qtMeia * i.valorMeia,
      0,
    );
    const totalCombos = combos.reduce((acc, c) => acc + c.subtotal, 0);
    return totalIngressos + totalCombos;
  }

  async create(createPedidoDto: CreatePedidoDto) {
    const { qtInteira, qtMeia, ingressoIds, lancheIds = [] } = createPedidoDto;

    const ingressos = await this.prisma.ingresso.findMany({
      where: { id: { in: ingressoIds } },
    });
    const combos = lancheIds.length
      ? await this.prisma.lancheCombo.findMany({
          where: { id: { in: lancheIds } },
        })
      : [];

    const valorTotal = this.calcularValorTotal(
      qtInteira,
      qtMeia,
      ingressos,
      combos,
    );

    return this.prisma.pedido.create({
      data: {
        qtInteira,
        qtMeia,
        valorTotal,
        ingressos: { connect: ingressoIds.map((id) => ({ id })) },
        lanches: { connect: lancheIds.map((id) => ({ id })) },
      },
      include: { ingressos: true, lanches: true },
    });
  }

  findAll() {
    return this.prisma.pedido.findMany({
      include: { ingressos: true, lanches: true },
    });
  }

  async findOne(id: number) {
    const pedido = await this.prisma.pedido.findUnique({
      where: { id },
      include: { ingressos: true, lanches: true },
    });
    if (!pedido) {
      throw new NotFoundException(`Pedido com id ${id} não encontrado`);
    }
    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    const atual = await this.findOne(id);

    const qtInteira = updatePedidoDto.qtInteira ?? atual.qtInteira;
    const qtMeia = updatePedidoDto.qtMeia ?? atual.qtMeia;

    // Se vierem novas listas, usamos elas; senão, mantemos os vínculos atuais.
    const ingressoIds =
      updatePedidoDto.ingressoIds ?? atual.ingressos.map((i) => i.id);
    const lancheIds =
      updatePedidoDto.lancheIds ?? atual.lanches.map((l) => l.id);

    const ingressos = ingressoIds.length
      ? await this.prisma.ingresso.findMany({
          where: { id: { in: ingressoIds } },
        })
      : [];
    const combos = lancheIds.length
      ? await this.prisma.lancheCombo.findMany({
          where: { id: { in: lancheIds } },
        })
      : [];

    const valorTotal = this.calcularValorTotal(
      qtInteira,
      qtMeia,
      ingressos,
      combos,
    );

    return this.prisma.pedido.update({
      where: { id },
      data: {
        qtInteira,
        qtMeia,
        valorTotal,
        ingressos: { set: ingressoIds.map((idItem) => ({ id: idItem })) },
        lanches: { set: lancheIds.map((idItem) => ({ id: idItem })) },
      },
      include: { ingressos: true, lanches: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.pedido.delete({ where: { id } });
  }
}
