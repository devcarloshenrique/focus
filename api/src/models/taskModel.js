import db from '../config/db.js';

class TaskModel {
    static async getAll() {
        const [rows] = await db.promise().query('SELECT * FROM tasks');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.promise().query('SELECT * FROM tasks WHERE id = ?', [id]);
        return rows[0];
    }

    static async getByUserId(userId) {
        const [rows] = await db.promise().query('SELECT * FROM tasks WHERE user_id = ?', [userId]);
        return rows;
    }

    static async create(task) {
        const [result] = await db.promise().query('INSERT INTO tasks SET ?', task);
        return result;
    }

    static async update(id, task) {
        const [result] = await db.promise().query('UPDATE tasks SET ? WHERE id = ?', [task, id]);
        return result;
    }

    static async delete(id) {
        const [result] = await db.promise().query('DELETE FROM tasks WHERE id = ?', [id]);
        return result;
    }
}

export default TaskModel;