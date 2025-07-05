import express from 'express';
import { cadastrar, login } from '../controllers/authController.js'
import { loginLimit } from '../middlewares/rateLimit.js';

const router = express ()

// rota de cadastro do usuário

router.post ('/cadastro', cadastrar);

//rota de login com middleware de proteção contra força bruta, utilizando uma limitação de tentativas

router.post ('/login', loginLimit, login)

export default router;