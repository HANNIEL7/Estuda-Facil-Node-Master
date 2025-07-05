import conn from '../config/db.js';

// Busca um usuário no banco de dados pelo e-mail
export const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    conn.query(
      'SELECT * FROM usuarios WHERE email = ?',
      [email],
      (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); // Retorna o primeiro usuário encontrado
      }
    );
  });
};

// Cria um novo usuário no banco
export const createUser = ({ nome, email, senhaHash, tipo_usuario, idade, origem }) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO usuarios (nome, email, senha, tipo_usuario, idade, origem) VALUES (?, ?, ?, ?, ?, ?)';
    conn.query(sql, [nome, email, senhaHash, tipo_usuario, idade || null, origem || null], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
