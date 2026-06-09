import { PartialType } from '@nestjs/swagger';
import { CreateIngressoDto } from './create-ingresso.dto';

export class UpdateIngressoDto extends PartialType(CreateIngressoDto) {}
