import jwt from "jsonwebtoken";


// gerar um token JWT com o ID do usuário

export const geradorToken= (userId) => {
   return jwt.sign(
  { id: userId },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

};