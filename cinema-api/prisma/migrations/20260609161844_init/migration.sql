-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('ACAO', 'COMEDIA', 'DRAMA', 'TERROR', 'ROMANCE', 'FICCAO_CIENTIFICA', 'ANIMACAO');

-- CreateTable
CREATE TABLE "cinemas" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cinemas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salas" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "capacidade" INTEGER NOT NULL,
    "poltronas" INTEGER[],
    "cinemaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "salas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filmes" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "sinopse" TEXT NOT NULL,
    "classificacao" TEXT NOT NULL,
    "duracao" INTEGER NOT NULL,
    "elenco" TEXT NOT NULL,
    "genero" "Genero" NOT NULL,
    "dataInicioExibicao" TIMESTAMP(3) NOT NULL,
    "dataFinalExibicao" TIMESTAMP(3) NOT NULL,
    "cinemaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "filmes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessoes" (
    "id" SERIAL NOT NULL,
    "horarioExibicao" TIMESTAMP(3) NOT NULL,
    "filmeId" INTEGER NOT NULL,
    "salaId" INTEGER NOT NULL,
    "cinemaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingressos" (
    "id" SERIAL NOT NULL,
    "valorInteira" DOUBLE PRECISION NOT NULL,
    "valorMeia" DOUBLE PRECISION NOT NULL,
    "sessaoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ingressos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lanche_combos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "valorUnitario" DOUBLE PRECISION NOT NULL,
    "qtUnidade" INTEGER NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lanche_combos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" SERIAL NOT NULL,
    "qtInteira" INTEGER NOT NULL,
    "qtMeia" INTEGER NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PedidoIngressos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PedidoIngressos_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PedidoLanches" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PedidoLanches_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PedidoIngressos_B_index" ON "_PedidoIngressos"("B");

-- CreateIndex
CREATE INDEX "_PedidoLanches_B_index" ON "_PedidoLanches"("B");

-- AddForeignKey
ALTER TABLE "salas" ADD CONSTRAINT "salas_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "cinemas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filmes" ADD CONSTRAINT "filmes_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "cinemas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessoes" ADD CONSTRAINT "sessoes_filmeId_fkey" FOREIGN KEY ("filmeId") REFERENCES "filmes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessoes" ADD CONSTRAINT "sessoes_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "salas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessoes" ADD CONSTRAINT "sessoes_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "cinemas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingressos" ADD CONSTRAINT "ingressos_sessaoId_fkey" FOREIGN KEY ("sessaoId") REFERENCES "sessoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PedidoIngressos" ADD CONSTRAINT "_PedidoIngressos_A_fkey" FOREIGN KEY ("A") REFERENCES "ingressos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PedidoIngressos" ADD CONSTRAINT "_PedidoIngressos_B_fkey" FOREIGN KEY ("B") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PedidoLanches" ADD CONSTRAINT "_PedidoLanches_A_fkey" FOREIGN KEY ("A") REFERENCES "lanche_combos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PedidoLanches" ADD CONSTRAINT "_PedidoLanches_B_fkey" FOREIGN KEY ("B") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
