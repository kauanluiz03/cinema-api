import { Module } from '@nestjs/common';
import { IngressoService } from './ingresso.service';
import { IngressoController } from './ingresso.controller';

@Module({
  controllers: [IngressoController],
  providers: [IngressoService],
})
export class IngressoModule {}
