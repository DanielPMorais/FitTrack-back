# Configuração do MongoDB - FitTrack

## 📦 Instalação do MongoDB

### Opção 1: MongoDB Local (Recomendado para desenvolvimento)

#### Ubuntu/Debian:
```bash
# Importar chave pública
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Adicionar repositório
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Atualizar e instalar
sudo apt-get update
sudo apt-get install -y mongodb-org

# Iniciar MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### macOS (com Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
```

#### Windows:
Baixe o instalador em: https://www.mongodb.com/try/download/community

### Opção 2: MongoDB Atlas (Cloud - Gratuito)

1. Acesse: https://www.mongodb.com/cloud/atlas
2. Crie uma conta gratuita
3. Crie um cluster (plano gratuito M0)
4. Obtenha a string de conexão
5. Atualize o `.env` com a string de conexão do Atlas

## ✅ Verificar Instalação

```bash
# Verificar se MongoDB está rodando
mongosh --version

# Conectar ao MongoDB
mongosh

# Dentro do MongoDB shell, testar:
show dbs
```

## 🔧 Configuração do Projeto

1. Instale as dependências:
```bash
cd FitTrack-back
npm install
```

2. Certifique-se de que o MongoDB está rodando:
```bash
# Linux/Mac
sudo systemctl status mongod  # ou
brew services list  # macOS

# Ou teste a conexão:
mongosh mongodb://localhost:27017
```

3. O arquivo `.env` já está configurado com:
```
MONGODB_URI=mongodb://localhost:27017/fittrack
```

4. Inicie o servidor:
```bash
source ~/.nvm/nvm.sh  # Se usar nvm
npm run dev
```

Você deve ver a mensagem: `✅ MongoDB connected successfully`

## 📊 Estrutura do Banco

O banco `fittrack` será criado automaticamente quando você fizer a primeira operação.

### Collections criadas:
- `users` - Usuários do sistema
- `routines` - Rotinas de treino
- `workoutdays` - Dias de treino
- `exercises` - Exercícios

## 🔍 Verificar Dados

Você pode usar o MongoDB Compass (interface gráfica) ou o mongosh:

```bash
# Conectar ao banco
mongosh mongodb://localhost:27017/fittrack

# Ver collections
show collections

# Ver documentos
db.users.find()
db.routines.find()
```

## 🚨 Troubleshooting

### Erro: "ECONNREFUSED"
- Verifique se o MongoDB está rodando: `sudo systemctl status mongod`
- Inicie o MongoDB: `sudo systemctl start mongod`

### Erro: "MongoServerError: Authentication failed"
- Se estiver usando MongoDB local sem autenticação, verifique se a URI está correta
- Se estiver usando MongoDB Atlas, verifique a string de conexão

### Porta já em uso
- Verifique se outro processo está usando a porta 27017: `lsof -i :27017`
- Pare o processo ou altere a porta no `.env`

