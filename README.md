# FitTrack Backend API

API backend para o aplicativo FitTrack, desenvolvida com Node.js e Express.

## 🚀 Como executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn
- MongoDB (versão 6.0 ou superior) - [Guia de instalação](./MONGODB_SETUP.md)

### Instalação

1. Configure o MongoDB:
   - Instale o MongoDB seguindo o [guia de instalação](./MONGODB_SETUP.md)
   - Certifique-se de que o MongoDB está rodando

2. Crie um arquivo `.env` baseado no `.env.example`:
```bash
# O arquivo .env já está criado, mas você pode verificar:
cat .env
```

   O arquivo `.env` deve conter:
   ```
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/fittrack
   ```

3. Instale as dependências:
```bash
npm install
```

4. Popule o banco de dados com dados iniciais:
```bash
# Se você usa nvm, carregue-o primeiro:
source ~/.nvm/nvm.sh

# Executar o seed
npm run seed
```

   Isso criará:
   - Usuário admin: `admin@example.com` / `Admin@123`
   - 2 rotinas de treino com todos os dados do mock

5. Inicie o servidor:
```bash
# Se você usa nvm, carregue-o primeiro:
source ~/.nvm/nvm.sh

# Modo desenvolvimento (com watch mode)
npm run dev

# Modo produção
npm start

# Ou use o script de início:
./start.sh
```

**Nota:** Se você usa nvm (Node Version Manager), certifique-se de carregá-lo antes de iniciar o servidor. O script `start.sh` faz isso automaticamente.

O servidor estará rodando em `http://localhost:3000` por padrão.

## 📡 Endpoints da API

### Rotinas de Treino

#### GET /api/routines
Retorna todas as rotinas de treino disponíveis.

**Resposta:**
```json
[
  {
    "id": "routine-1",
    "title": "HIPERTROFIA MASCULINO INICIANTE",
    "dateRange": "21/01/2025 - 21/03/2025",
    "icon": "💪",
    "days": [...]
  }
]
```

#### GET /api/routines/:routineId
Retorna uma rotina específica por ID.

**Parâmetros:**
- `routineId` (string): ID da rotina

**Resposta:**
```json
{
  "id": "routine-1",
  "title": "HIPERTROFIA MASCULINO INICIANTE",
  "dateRange": "21/01/2025 - 21/03/2025",
  "icon": "💪",
  "days": [...]
}
```

### Dias de Treino

#### GET /api/workout-days/:workoutId
Retorna um dia de treino específico com todos os exercícios.

**Parâmetros:**
- `workoutId` (string): ID do dia de treino

**Resposta:**
```json
{
  "id": "day-1-1",
  "title": "Treino A",
  "description": "Peito, Ombro e Tríceps",
  "lastCompleted": "20/01/2025",
  "exercises": [
    {
      "id": "ex-1-1-1",
      "title": "Supino Maquina (Pegada Neutra)",
      "series": "3x12-15",
      "load": "35kg",
      "interval": "60s",
      "videoUrl": "url_video_placeholder"
    }
  ]
}
```

#### PATCH /api/workout-days/:workoutId/complete
Marca um treino como completado, atualizando a data `lastCompleted`.

**Parâmetros:**
- `workoutId` (string): ID do dia de treino

**Resposta:**
```json
{
  "message": "Workout day marked as completed",
  "workoutDay": {...}
}
```

### Autenticação

#### POST /api/auth/register
Registra um novo usuário.

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "SenhaSegura123!"
}
```

**Resposta:**
```json
{
  "message": "Usuário criado com sucesso",
  "user": {
    "id": "...",
    "name": "João Silva",
    "email": "joao@example.com"
  },
  "token": "jwt_token_here"
}
```

#### POST /api/auth/login
Autentica um usuário.

**Body:**
```json
{
  "email": "joao@example.com",
  "password": "SenhaSegura123!"
}
```

**Resposta:**
```json
{
  "message": "Login realizado com sucesso",
  "user": {
    "id": "...",
    "name": "João Silva",
    "email": "joao@example.com"
  },
  "token": "jwt_token_here"
}
```

#### PATCH /api/auth/profile
Atualiza nome e/ou email do usuário autenticado. **Requer autenticação.**

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "name": "João Silva Atualizado",
  "email": "novo@example.com"
}
```

**Resposta:**
```json
{
  "message": "Perfil atualizado com sucesso",
  "user": {
    "id": "...",
    "name": "João Silva Atualizado",
    "email": "novo@example.com"
  }
}
```

#### PATCH /api/auth/password
Atualiza a senha do usuário autenticado. **Requer autenticação.**

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "currentPassword": "SenhaAtual123!",
  "newPassword": "NovaSenha456@"
}
```

**Resposta:**
```json
{
  "message": "Senha atualizada com sucesso"
}
```

### Health Check

#### GET /health
Verifica se a API está funcionando.

**Resposta:**
```json
{
  "status": "ok",
  "message": "FitTrack API is running"
}
```

## 📁 Estrutura do Projeto

```
FitTrack-back/
├── src/
│   ├── config/          # Configurações
│   │   └── database.js  # Configuração do MongoDB
│   ├── controllers/     # Controladores das rotas
│   │   ├── authController.js
│   │   ├── routineController.js
│   │   └── workoutDayController.js
│   ├── middleware/      # Middlewares
│   │   └── authMiddleware.js  # Middleware de autenticação
│   ├── models/          # Models do Mongoose
│   │   ├── User.js
│   │   ├── Routine.js
│   │   ├── WorkoutDay.js
│   │   ├── Exercise.js
│   │   └── index.js
│   ├── routes/          # Definição das rotas
│   │   ├── authRoutes.js
│   │   ├── routineRoutes.js
│   │   └── workoutDayRoutes.js
│   ├── scripts/         # Scripts utilitários
│   │   └── seed.js      # Seed do banco de dados
│   ├── data/            # Dados mock/inicial
│   │   └── mockData.js
│   └── server.js        # Arquivo principal do servidor
├── .env                 # Variáveis de ambiente
├── .gitignore
├── package.json
├── README.md
└── MONGODB_SETUP.md     # Guia de instalação do MongoDB
```

## 🔧 Tecnologias Utilizadas

- **Express.js**: Framework web para Node.js
- **MongoDB**: Banco de dados NoSQL
- **Mongoose**: ODM (Object Document Mapper) para MongoDB
- **bcryptjs**: Biblioteca para hash de senhas
- **CORS**: Middleware para habilitar CORS
- **dotenv**: Gerenciamento de variáveis de ambiente

## 📝 Próximos Passos

- [x] Integração com banco de dados (MongoDB)
- [ ] Autenticação e autorização de usuários
- [ ] Sistema de histórico de treinos
- [ ] Endpoints para gerenciar exercícios
- [ ] Sistema de progresso e estatísticas
- [ ] Upload de vídeos de exercícios

## 🤝 Contribuindo

Este é um projeto em desenvolvimento. Sinta-se à vontade para sugerir melhorias!

