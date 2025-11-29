# FutMatch Backend - NestJS

API RESTful para o sistema FutMatch construída com NestJS.

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+ 
- PostgreSQL 12+
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

### Configuração do Banco de Dados

1. Crie um banco de dados PostgreSQL
2. Configure a string de conexão no arquivo `.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=futmatch_db
```

### Executar

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

A API estará disponível em `http://localhost:3000`
Documentação Swagger: `http://localhost:3000/api`

## 📚 Estrutura do Projeto

```
src/
├── auth/              # Autenticação e autorização
├── users/             # Módulo de usuários
├── teams/             # Módulo de times
├── courts/            # Módulo de quadras
├── reservations/      # Módulo de reservas
├── notifications/     # Módulo de notificações
├── google-places/     # Integração Google Places API
├── email/             # Serviço de email
└── common/            # Utilitários compartilhados
```

## 🔐 Autenticação

A API usa JWT (JSON Web Tokens) para autenticação. 

### Endpoints de Autenticação

- `POST /auth/register` - Registrar novo usuário
- `POST /auth/login` - Login
- `GET /auth/profile` - Obter perfil do usuário autenticado (requer token)

### Uso do Token

Inclua o token no header das requisições:
```
Authorization: Bearer <seu_token>
```

## 📖 Documentação da API

A documentação completa da API está disponível via Swagger em `/api` quando o servidor estiver rodando.

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## 📝 Scripts Disponíveis

- `npm run build` - Compilar o projeto
- `npm run format` - Formatar código
- `npm run start` - Iniciar aplicação
- `npm run start:dev` - Iniciar em modo desenvolvimento
- `npm run start:debug` - Iniciar em modo debug
- `npm run start:prod` - Iniciar em modo produção
- `npm run lint` - Executar linter

## 🔧 Tecnologias

- **NestJS** - Framework Node.js
- **TypeORM** - ORM para TypeScript
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Swagger** - Documentação da API
- **class-validator** - Validação de DTOs
- **bcrypt** - Hash de senhas

## 📄 Licença

MIT

