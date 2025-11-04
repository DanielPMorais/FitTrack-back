# FitTrack Backend API

API backend para o aplicativo FitTrack, desenvolvida com Node.js e Express.

## 🚀 Como executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. Instale as dependências:
```bash
npm install
```

2. Crie um arquivo `.env` baseado no `.env.example`:
```bash
cp .env.example .env
```

3. Inicie o servidor:
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
│   ├── controllers/      # Controladores das rotas
│   │   ├── routineController.js
│   │   └── workoutDayController.js
│   ├── routes/          # Definição das rotas
│   │   ├── routineRoutes.js
│   │   └── workoutDayRoutes.js
│   ├── data/            # Dados mock/inicial
│   │   └── mockData.js
│   └── server.js        # Arquivo principal do servidor
├── .env.example         # Exemplo de variáveis de ambiente
├── .gitignore
├── package.json
└── README.md
```

## 🔧 Tecnologias Utilizadas

- **Express.js**: Framework web para Node.js
- **CORS**: Middleware para habilitar CORS
- **dotenv**: Gerenciamento de variáveis de ambiente

## 📝 Próximos Passos

- [ ] Integração com banco de dados (MongoDB/PostgreSQL)
- [ ] Autenticação e autorização de usuários
- [ ] Sistema de histórico de treinos
- [ ] Endpoints para gerenciar exercícios
- [ ] Sistema de progresso e estatísticas
- [ ] Upload de vídeos de exercícios

## 🤝 Contribuindo

Este é um projeto em desenvolvimento. Sinta-se à vontade para sugerir melhorias!

