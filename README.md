# 🔐 API de Autenticação com Node.js, JWT e MySQL

API RESTful que permite **cadastro e login de usuários** com autenticação via **JWT**, persistência em **MySQL**, senhas com **bcrypt** e segurança com **limitação de tentativas**.

---

## 🚀 Tecnologias
- Node.js + Express
- MySQL + mysql2
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- express-rate-limit
- CORS

---

## 📁 Estrutura

```
src/
├── config/             # Conexão com o banco
├── controllers/        # Lógica das rotas
├── middlewares/        # Autenticação e rate limit
├── routes/             # Rotas Express
├── services/           # Querys ao banco
├── utils/              # Gerador de token JWT
server.js               # Inicializa o servidor
.env                    # Variáveis de ambiente
```

---

## ⚙️ Instalação

```bash
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto
npm install
```

Crie o arquivo `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=nome_do_banco
JWT_SECRET=sua_chave_secreta
```

Crie a tabela:

```sql
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  senha VARCHAR(255),
  tipo_usuario VARCHAR(50),
  idade INT,
  origem VARCHAR(100)
);
```

---

## ▶️ Iniciar servidor

```bash
npm start
# ou
node src/server.js
```

Acesse: `http://localhost:3000/api`

---

## 📌 Endpoints

### POST `/api/cadastro`
Cria um novo usuário.

```json
{
  "nome": "Maria",
  "email": "maria@email.com",
  "senha": "123456",
  "tipo_usuario": "admin",
  "idade": 28,
  "origem": "site"
}
```

### POST `/api/login`
Faz login e retorna token JWT.

```json
{
  "email": "maria@email.com",
  "senha": "123456"
}
```

**Resposta:**
```json
{
  "mensagem": "Login realizado com sucesso!",
  "token": "jwt.token.aqui",
  "usuario": {
    "id": 1,
    "nome": "Maria",
    "tipo": "admin",
    "origem": "site"
  }
}
```

---

## 🔐 Proteção de rotas

Exemplo de rota protegida:

```js
import { verificarToken } from './middlewares/authMiddleware.js';

app.get('/perfil', verificarToken, (req, res) => {
  res.json({ mensagem: 'Acesso autorizado!' });
});
```

**Cabeçalho necessário:**
```
Authorization: Bearer SEU_TOKEN
```

---

## 🔒 Segurança
- Senhas com bcrypt
- JWT com validade de 1 hora
- Limite de login (5 por minuto)
- CORS habilitado

---
— Sinta-se livre para usar e modificar.
