import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateLancheComboDto {
  @ApiProperty({ example: 'Combo Pipoca Grande', description: 'Nome do combo' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    example: 'Pipoca grande + refrigerante 500ml',
    description: 'Descrição do combo',
  })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ example: 25.0, description: 'Valor unitário do combo' })
  @IsNumber()
  @Min(0)
  valorUnitario: number;

  @ApiProperty({ example: 2, description: 'Quantidade de unidades' })
  @IsInt()
  @Min(1)
  qtUnidade: number;
}
