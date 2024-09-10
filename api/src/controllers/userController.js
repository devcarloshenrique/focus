import bcrypt from 'bcryptjs';
import UserModel from '../models/userModel.js';
import UserValidator from '../validators/userValidator.js';

class UserController {
    static async getAll(req, res) {        
        try {
            const users = await UserModel.getAll();

            return res.status(200).json({
                statusCode: 200,
                message: "Usuários recuperados com sucesso!",
                data: { users }
            });

        } catch (err) {
            return res.status(500).json({
                statusCode: 500,
                message: "Erro ao recuperar usuários.",
                error: err.message
            });   
        }
    }

    static async create(req, res) {        
        try {
            const { name, email, password, confirmPassword } = req.body;
            const errors = {};

            const requiredFieldErrors = UserValidator.validateRequiredFields({ name, email, password, confirmPassword });
            if (requiredFieldErrors) {
                return res.status(400).json({
                    statusCode: 400,
                    message: "Campos obrigatórios não preenchidos.",
                    errors: requiredFieldErrors
                });
            }
            
            let errorMsg = UserValidator.validateEmailFormat(email);
            if (errorMsg) errors.email = errorMsg;
    
            errorMsg = await UserValidator.checkEmailExists(email);
            if (errorMsg) errors.email = errorMsg;
    
            errorMsg = UserValidator.validatePassword(password, confirmPassword);
            if (errorMsg) errors.password = errorMsg;
    
            if (Object.keys(errors).length > 0) {
                return res.status(400).json({
                    statusCode: 400,
                    message: "Erro de validação.",
                    errors
                });
            }
            
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newUser = { name, email, password: hashedPassword };

            const createUser = await UserModel.create(newUser);
            
            return res.status(201).json({
                statusCode: 201,
                message: "Usuário criado com sucesso!",
                data: { id: createUser.insertId, ...newUser }
            });
        } catch (err) {
            return res.status(500).json({
                statusCode: 500,
                message: "Erro ao criar usuário.",
                error: err.message
            });   
        }
    }
}

export default UserController;