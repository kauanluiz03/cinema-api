import { Module } from '@nestjs/common';
import { SessaoService } from './sessao.service';
import { SessaoController } from './sessao.controller';

@Module({
  controllers: [SessaoController],
  providers: [SessaoService],
})
export class SessaoModule {}
