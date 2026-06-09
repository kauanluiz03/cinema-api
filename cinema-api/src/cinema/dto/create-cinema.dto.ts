import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCinemaDto {
  @ApiProperty({ example: 'Cinemark Shopping', description: 'Nome do cinema' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    example: 'Av. Principal, 1000 - Centro',
    description: 'Endereço do cinema',
  })
  @IsString()
  @IsNotEmpty()
  endereco: string;
}
