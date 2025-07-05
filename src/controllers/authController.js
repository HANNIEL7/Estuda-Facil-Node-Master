import bcrypt from 'bcryptjs';
import { findUserByEmail, createUser } from '../services/UserService.js';
import { geradorToken } from '../utils/geradorToken.js';


export const cadastrar = async(req, res)=>{

    const {nome, email, senha, tipo_usuario, idade, origem} = req.body;

    if (!nome|| !email|| !senha||tipo_usuario ){
        return res.status(400).json({ mensagem: "Preencha todos os campos obrigatórios" })
    }

    try {
        const existente = await findUserByEmail(email)
        if (existente){
            return res.status(400).json({ mensagem: "Email já cadastrado." })
        }

        const senhaHash = await bcrypt.hash(senha, 10)


        await createUser ({nome, email, senhaHash, tipo_usuario, idade, origem})
        
        
        res.status(201).json({ mensagem : "Usuário cadastrado com sucesso ! " })
        
    } catch (error) {
        
        res.status(500).json ({mensagem: "Erro ao cadastrar", erro: error})
    }
    }

    export const login = async(req, res) =>{

        const {email, senha} = req.body

        if (!email || !senha ){
         return  res.status(400).json({ mensagem:"Email e senha são obrigatórios. " })
        }

    try {
        const  usuario = await findUserByEmail(email)
    
        if (!usuario){
            return res.status(401).json({ mensagem: "Email não encontrado."  })
        }

        const senhaCorreta = await bcrypt.compare (senha, usuario.senha);

        if (!senhaCorreta){
            return res.status(401).json({ mensagem: "Senha incorreta." })
        }

        const token = geradorToken(usuario.id)


        res.json ({
            mensagem: "Lógin realizado com sucesso !",
            token, 
            usuario: {
                id : usuario.id,
                nome : usuario.nome,
                tipo : usuario.tipo,
                origem: usuario.origem,
            },
        })
    } catch (error) {
            res.status(500).json({mensagem : "Erro interno no login", erro : error})
        }
    }