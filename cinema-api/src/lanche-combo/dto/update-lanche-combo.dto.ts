import { PartialType } from '@nestjs/swagger';
import { CreateLancheComboDto } from './create-lanche-combo.dto';

export class UpdateLancheComboDto extends PartialType(CreateLancheComboDto) {}
