import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateIngressoDto {
  @ApiProperty({ example: 30.0, description: 'Valor do ingresso inteira' })
  @IsNumber()
  @Min(0)
  valorInteira: number;

  @ApiProperty({ example: 15.0, description: 'Valor do ingresso meia-entrada' })
  @IsNumber()
  @Min(0)
  valorMeia: number;

  @ApiProperty({ example: 1, description: 'ID da sessão do ingresso' })
  @IsInt()
  @IsNotEmpty()
  sessaoId: number;
}
