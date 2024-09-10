import UserModel from '../models/userModel.js';

class UserValidator {
    static validateRequiredFields(fields) {
        const errors = {};
        for (const [key, value] of Object.entries(fields)) {
            if (!value || value.trim() === '') {
                errors[key] = 'Este campo é obrigatório';
            }
        }
        return Object.keys(errors).length > 0 ? errors : null;
    }

    static validateEmailFormat(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Email inválido';
        }
        return null;
    }

    static async checkEmailExists(email) {
        const user = await UserModel.getByEmail(email);
        if (user) {
            return 'O e-mail já está registrado';
        }
        return null;
    }

    static validatePassword(password, confirmPassword) {
        if (password.length < 8) {
            return 'A senha deve ter no mínimo 8 caracteres';
        }
        if (password !== confirmPassword) {
            return 'As senhas não coincidem';
        }
        return null;
    }
}

export default UserValidator;
