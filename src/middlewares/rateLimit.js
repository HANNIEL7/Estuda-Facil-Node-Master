
// importação da biblioteca rate limite, limitador de requisições, ou seja, limita a quantidade de vezes que o usuário pode acessar em um determinado tempo. 

import rateLimit from "express-rate-limit"

// limite de requisições por minuto
export const loginLimit  = rateLimit({

    windowMs: 1 * 60 * 1000,// um minuto
    max : 5, // 5 requisições

    message: {

        status : 429,
        mensagem: 'Muitas tentativas de login. Por favor tente novamente em 1 minuto'
    },
    standardHeaders: true,
    legacyHeaders: false,
})