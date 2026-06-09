import { Module } from '@nestjs/common';
import { LancheComboService } from './lanche-combo.service';
import { LancheComboController } from './lanche-combo.controller';

@Module({
  controllers: [LancheComboController],
  providers: [LancheComboService],
})
export class LancheComboModule {}
