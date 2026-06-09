import { PartialType } from '@nestjs/swagger';
import { CreateSessaoDto } from './create-sessao.dto';

export class UpdateSessaoDto extends PartialType(CreateSessaoDto) {}
