import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CinemaModule } from './cinema/cinema.module';
import { SalaModule } from './sala/sala.module';
import { FilmeModule } from './filme/filme.module';
import { SessaoModule } from './sessao/sessao.module';
import { IngressoModule } from './ingresso/ingresso.module';
import { LancheComboModule } from './lanche-combo/lanche-combo.module';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [
    PrismaModule,
    CinemaModule,
    SalaModule,
    FilmeModule,
    SessaoModule,
    IngressoModule,
    LancheComboModule,
    PedidoModule,
  ],
})
export class AppModule {}
