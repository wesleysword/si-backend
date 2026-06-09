# Soluções Imobiliárias - API (Backend)

Este repositório contém a API RESTful desenvolvida em NestJS para o sistema de gestão de leads da Soluções Imobiliárias. O backend atua como o motor principal da aplicação, responsável por gerenciar a autenticação segura de usuários (corretores/admins), a persistência dos dados dos clientes (leads) e, futuramente, orquestrar a comunicação com o microsserviço de Inteligência Artificial.

---

## Tecnologias Utilizadas

* **Framework:** [NestJS](https://nestjs.com/) (Node.js)
* **Linguagem:** TypeScript
* **Banco de Dados:** PostgreSQL
* **ORM:** Prisma (v5)
* **Segurança:** Autenticação via JWT (@nestjs/jwt) e criptografia de senhas com Bcrypt
* **Infraestrutura:** Docker e Docker Compose (para o banco de dados local)

---

## Pré-requisitos e Dependências

Para executar este projeto localmente, você precisará ter instalado em sua máquina:

* [Node.js](https://nodejs.org/en/) (Versão 18 ou superior)
* [Docker Desktop](https://www.docker.com/products/docker-desktop) (Em execução)
* [Git](https://git-scm.com/)

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione a seguinte variável para a conexão com o banco de dados. (Os dados abaixo são para o ambiente de desenvolvimento local via Docker):

```env
DATABASE_URL="postgresql://admin:admin_password@localhost:5432/si_database?schema=public"
```
## Passo a Passo para Execução Local
Siga as instruções abaixo para rodar o projeto em sua máquina:

1. Clone o repositório:
```bash
git clone https://github.com/SEU_USUARIO/si-backend.git
cd si-backend
```

2. Instale as dependências:
```bash
npm install
```

3. Suba o banco de dados com Docker:
```bash
docker-compose up -d
```

4. Execute as migrations do Prisma (Criação das tabelas):
```bash
npx prisma migrate dev --name init_database
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run start:dev
```

O servidor estará rodando em: http://localhost:3000.

## Documentação da API (Endpoints)
Autenticação e Usuários
Todas as senhas são armazenadas com hash (Bcrypt). O login retorna um access_token (JWT) válido por 1 dia.

POST /users/register - Cria um novo usuário.

Body: { "name": "Admin", "email": "admin@si.com", "password": "123" }

POST /auth/login - Autentica o usuário e gera o token JWT.

Body: { "email": "admin@si.com", "password": "123" }

Leads (Clientes) - 🔒 Rotas Protegidas
Requerem o envio do cabeçalho Authorization: Bearer <SEU_TOKEN_JWT>

POST /leads - Cadastra um novo lead (O status inicial é "Novo").

Body: { "name": "João Silva", "contact": "joao@email.com" }

GET /leads - Lista todos os leads cadastrados.

PATCH /leads/:id - Atualiza os dados ou o status de um lead (usado no Kanban).

Body: { "status": "Em Atendimento" }

DELETE /leads/:id - Remove um lead do banco de dados.