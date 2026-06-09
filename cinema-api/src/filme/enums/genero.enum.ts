/**
 * Enum de gênero de filme.
 * Os valores são idênticos aos definidos no schema.prisma (enum Genero),
 * permitindo a validação com @IsEnum sem depender do client gerado.
 */
export enum Genero {
  ACAO = 'ACAO',
  COMEDIA = 'COMEDIA',
  DRAMA = 'DRAMA',
  TERROR = 'TERROR',
  ROMANCE = 'ROMANCE',
  FICCAO_CIENTIFICA = 'FICCAO_CIENTIFICA',
  ANIMACAO = 'ANIMACAO',
}
