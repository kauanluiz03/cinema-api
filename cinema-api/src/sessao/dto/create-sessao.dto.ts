import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateSessaoDto {
  @ApiProperty({
    example: '2026-02-10T20:30:00.000Z',
    description: 'Horário de exibição da sessão (ISO 8601)',
  })
  @IsDateString()
  horarioExibicao: string;

  @ApiProperty({ example: 1, description: 'ID do filme exibido' })
  @IsInt()
  @IsNotEmpty()
  filmeId: number;

  @ApiProperty({ example: 1, description: 'ID da sala onde ocorre a sessão' })
  @IsInt()
  @IsNotEmpty()
  salaId: number;

  @ApiProperty({ example: 1, description: 'ID do cinema da sessão' })
  @IsInt()
  @IsNotEmpty()
  cinemaId: number;
}
