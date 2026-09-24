# Cinema API — NestJS 11 + Prisma + PostgreSQL

API REST completa para gerenciamento de um sistema de Cinema, com Cinema,
Sala, Filme, Sessão, Ingresso, Combo de Lanche e Pedido.

## Stack

- **NestJS 11** (arquitetura em camadas: Controller / Service / DTO / Prisma)
- **Prisma ORM 6** (generator `prisma-client` + adaptador `@prisma/adapter-pg`)
- **PostgreSQL** (gerenciado via pgAdmin)
- **Swagger** (documentação em `/api`)
- **class-validator / class-transformer** (validação de entrada)

## 1. Pré-requisitos

- Node.js 20+ e npm
- PostgreSQL rodando localmente
- pgAdmin (opcional, para administrar o banco)

## 2. Criar o banco no pgAdmin

1. Abra o pgAdmin e conecte no servidor PostgreSQL local.
2. Clique com o botão direito em **Databases > Create > Database...**
3. Em **Database**, informe `cinema_db` e salve.
4. (Opcional) Confira o usuário/senha em `.env` — por padrão `postgres / 123456`.

Ajuste a connection string em `.env` se o seu usuário/senha forem diferentes:

```
DATABASE_URL="postgresql://postgres:123456@localhost:5432/cinema_db?schema=public"
```

## 3. Instalar e executar

```bash
npm install
npx prisma migrate dev --name init
npm run start:dev
```

- A API sobe em `http://localhost:3000`
- O Swagger fica em `http://localhost:3000/api`

> O `npm install` já roda `prisma generate` (script `postinstall`).
> O `prisma migrate dev` cria as tabelas e regenera o client.

## 4. Endpoints (CRUD para todas as entidades)

| Recurso        | Base path         |
|----------------|-------------------|
| Cinema         | `/cinemas`        |
| Sala           | `/salas`          |
| Filme          | `/filmes`         |
| Sessão         | `/sessoes`        |
| Ingresso       | `/ingressos`      |
| Combo Lanche   | `/lanche-combos`  |
| Pedido         | `/pedidos`        |

Cada recurso expõe:

- `POST   /recurso`       → criar
- `GET    /recurso`       → listar
- `GET    /recurso/:id`   → buscar por ID
- `PATCH  /recurso/:id`   → atualizar
- `DELETE /recurso/:id`   → remover

## 5. Ordem sugerida para testar no Swagger

Como há relacionamentos, crie nesta ordem: Cinema → Sala → Filme → Sessão →
Ingresso → Combo → Pedido. Exemplos de JSON estão na resposta do chat e no
arquivo de instruções.
