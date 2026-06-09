import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  Min,
} from 'class-validator';

export class CreateSalaDto {
  @ApiProperty({ example: 1, description: 'Número da sala' })
  @IsInt()
  @Min(1)
  numero: number;

  @ApiProperty({ example: 120, description: 'Capacidade total de poltronas' })
  @IsInt()
  @Min(1)
  capacidade: number;

  @ApiProperty({
    example: [1, 2, 3, 4, 5],
    description: 'Identificadores das poltronas da sala',
    type: [Number],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  poltronas: number[];

  @ApiProperty({ example: 1, description: 'ID do cinema ao qual a sala pertence' })
  @IsInt()
  @IsNotEmpty()
  cinemaId: number;
}
