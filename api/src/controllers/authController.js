import bcrypt from 'bcryptjs';
import UserModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET;

class authController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserModel.getByEmail(email);

            if (!user) {
                return res.status(401).json({
                    statusCode: 401,
                    message: "Erro ao realizar login.",
                    errors: {
                        email: "E-mail não cadastrado"
                    }
                });
            }

            const validatePassword = bcrypt.compareSync(password, user.password);

            if (!validatePassword) {
                return res.status(401).json({
                    statusCode: 401,
                    message: "Erro ao realizar login.",
                    errors: {
                        password: "Senha incorreta"
                    }
                });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
                expiresIn: '2h'
            });

            return res.status(200).json({
                statusCode: 200,
                message: "Login realizado com sucesso!",
                data: { token }
            });

        } catch (err) {
            console.error('Erro no login:', err);
            return res.status(500).json({
                statusCode: 500,
                message: "Erro ao realizar login.",
                error: err.message
            });
        }
    }

    static verifyToken(req, res, next) {
        const tokenHeader = req.headers["authorization"];
        const token = tokenHeader && tokenHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                statusCode: 401,
                message: "Não autorizado. Token não encontrado.",
            });
        }

        try {
            const decoded = jwt.verify(token, SECRET);
            req.user = decoded;

            next();

        } catch (err) {
            console.error('Erro na verificação do token:', err);
            return res.status(401).json({
                statusCode: 401,
                message: "Erro ao verificar token.",
                error: 'Token inválido ou expirado'
            });
        }
    }
}

export default authController;
