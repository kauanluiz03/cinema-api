import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';
import { Genero } from '../enums/genero.enum';

export class CreateFilmeDto {
  @ApiProperty({ example: 'Interestelar', description: 'Título do filme' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({
    example: 'Um grupo de exploradores viaja por um buraco de minhoca...',
    description: 'Sinopse do filme',
  })
  @IsString()
  @IsNotEmpty()
  sinopse: string;

  @ApiProperty({ example: '12 anos', description: 'Classificação indicativa' })
  @IsString()
  @IsNotEmpty()
  classificacao: string;

  @ApiProperty({ example: 169, description: 'Duração do filme em minutos' })
  @IsInt()
  @Min(1)
  duracao: number;

  @ApiProperty({
    example: 'Matthew McConaughey, Anne Hathaway',
    description: 'Elenco do filme',
  })
  @IsString()
  @IsNotEmpty()
  elenco: string;

  @ApiProperty({
    example: Genero.FICCAO_CIENTIFICA,
    enum: Genero,
    description: 'Gênero do filme',
  })
  @IsEnum(Genero)
  genero: Genero;

  @ApiProperty({
    example: '2026-01-01T00:00:00.000Z',
    description: 'Data de início da exibição (ISO 8601)',
  })
  @IsDateString()
  dataInicioExibicao: string;

  @ApiProperty({
    example: '2026-03-01T00:00:00.000Z',
    description: 'Data final da exibição (ISO 8601)',
  })
  @IsDateString()
  dataFinalExibicao: string;

  @ApiProperty({ example: 1, description: 'ID do cinema ao qual o filme pertence' })
  @IsInt()
  @IsNotEmpty()
  cinemaId: number;
}
