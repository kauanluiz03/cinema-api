import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsOptional,
  Min,
} from 'class-validator';

export class CreatePedidoDto {
  @ApiProperty({ example: 2, description: 'Quantidade de ingressos inteira' })
  @IsInt()
  @Min(0)
  qtInteira: number;

  @ApiProperty({ example: 1, description: 'Quantidade de ingressos meia' })
  @IsInt()
  @Min(0)
  qtMeia: number;

  @ApiProperty({
    example: [1, 2],
    description: 'IDs dos ingressos associados ao pedido',
    type: [Number],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  ingressoIds: number[];

  @ApiProperty({
    example: [1],
    description: 'IDs dos combos de lanche associados ao pedido',
    type: [Number],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  lancheIds?: number[];
}
