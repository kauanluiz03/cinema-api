import { PartialType } from '@nestjs/swagger';
import { CreateFilmeDto } from './create-filme.dto';

export class UpdateFilmeDto extends PartialType(CreateFilmeDto) {}
