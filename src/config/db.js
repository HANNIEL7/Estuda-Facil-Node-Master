// Importa a biblioteca mysql2 e dotenv
import mysql from 'mysql2';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Cria a conexão com o banco de dados MySQL
const conn = mysql.createConnection({
  host: process.env.DB_HOST,       // Endereço do banco
  user: process.env.DB_USER,       // Usuário do banco
  password: process.env.DB_PASS,   // Senha do banco
  database: process.env.DB_NAME    // Nome do banco
});

// Conecta ao banco e mostra mensagem de erro ou sucesso
conn.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err.message);
  } else {
    console.log('✅ Conectado ao banco de dados MySQL!');
  }
});

// Exporta a conexão para uso nos services
export default conn;
