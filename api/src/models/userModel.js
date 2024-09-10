import db from '../config/db.js';

class UserModel {
    static async getAll() {
        const [rows] = await db.promise().query('SELECT * FROM users');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.promise().query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async getByEmail(email) {
        const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async create(user) {
        const [result] = await db.promise().query('INSERT INTO users SET ?', user);
        return result;
    }

    static async update(id, user) {
        const [result] = await db.promise().query('UPDATE users SET ? WHERE id = ?', [user, id]);
        return result;
    }

    static async delete(id) {
        const [result] = await db.promise().query('DELETE FROM users WHERE id = ?', [id]);
        return result;
    }
}

export default UserModel;
