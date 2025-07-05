import jwt from 'jsonwebtoken'

// middleware Para proteger rotas que exigem autenticação

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ mensagem: 'Token não fornecido.' });
    }

    const token = authHeader.split(' ')[1];//Extrai o toke do cabeçalho

//após a verificação se o token está presente, fiz uma verificação pra ver se o token de acesso, é válido.

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuarioId = decoded.id;// Salva o ID do usuário na requisiçao
        next();// libera o acesso à rota
    } catch (err) {
        return res.status(403).json({ mensagem: 'Token inválido ou expirado.' });
    }
}