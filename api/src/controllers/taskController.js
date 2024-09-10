import TaskModel from '../models/taskModel.js';
import UserModel from '../models/userModel.js';

class TaskController {
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const authenticatedUserId = req.user.id;

            const task = await TaskModel.getById(id);

            if (!task) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Tarefa não encontrada"
                });
            }

            // Verifica se a tarefa pertence ao usuário autenticado
            if (task.user_id !== authenticatedUserId) {
                return res.status(403).json({
                    statusCode: 403,
                    message: "Acesso negado. Você não pode acessar esta tarefa."
                });
            }

            return res.status(200).json({
                statusCode: 200,
                message: "Tarefa recuperada com sucesso!",
                data: { task }
            });

        } catch (err) {
            return res.status(500).json({
                statusCode: 500,
                message: "Erro ao encontrar tarefa.",
                error: err.message
            });
        }
    }

    static async getByUserId(req, res) {
        try {
            const { id } = req.user;

            const user = await UserModel.getById(id);

            if (!user) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Usuário não encontrado"
                });
            }

            const tasks = await TaskModel.getByUserId(user.id);

            return res.status(201).json({
                statusCode: 201,
                message: "Tarefas recuperadas com sucesso.",
                data: { tasks }
            });

        } catch (err) {
            return res.status(500).json({
                statusCode: 500,
                message: "Erro ao buscar tarefas.",
                error: err.message
            });
        }
    }

    static async create(req, res) {
        try {
            const { name, description, status, user_id } = req.body;
            const errors = {};

            // Verificar se usuário existe
            const user = await UserModel.getById(user_id);
            if (!user) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Usuário não encontrado"
                });
            }

            // Verificar campos obrigatórios
            if (!name || !description || status === undefined || status === null || !user_id) {
                errors.fields = 'Todos os campos são obrigatórios';
                return res.status(400).json({
                    statusCode: 400,
                    message: "Erro ao criar tarefa.",
                    errors
                });
            }

            // Validar status
            if (!['0', '1'].includes(status)) {
                errors.status = 'Status deve ser 0 ou 1';
                return res.status(400).json({
                    statusCode: 400,
                    message: "Erro ao criar tarefa.",
                    errors
                });
            }

            const newTask = { name, description, status, user_id };
            const createTask = await TaskModel.create(newTask);

            return res.status(201).json({
                statusCode: 201,
                message: "Tarefa criada com sucesso!",
                data: { id: createTask.insertId, ...newTask }
            });

        } catch (err) {
            return res.status(500).json({
                statusCode: 500,
                message: "Erro ao criar tarefa.",
                error: err.message
            });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const authenticatedUserId = req.user.id;

            const { name, description, status } = req.body;
            const errors = {};

            // Verificar se a tarefa existe
            const task = await TaskModel.getById(id);
            if (!task) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Tarefa não encontrada"
                });
            }

            // Verificar campos obrigatórios
            if (name === undefined || description === undefined || status === undefined) {
                errors.fields = 'Todos os campos são obrigatórios';
                return res.status(400).json({
                    statusCode: 400,
                    message: "Erro ao atualizar tarefa.",
                    errors
                });
            }

            // Validar status
            if (!['0', '1'].includes(status)) {
                errors.status = 'Status deve ser 0 ou 1';
                return res.status(400).json({
                    statusCode: 400,
                    message: "Erro ao atualizar tarefa.",
                    errors
                });
            }

            // Verifica se a tarefa pertence ao usuário autenticado
            if (task.user_id !== authenticatedUserId) {
                return res.status(403).json({
                    statusCode: 403,
                    message: "Acesso negado. Você não pode acessar esta tarefa."
                });
            }

            const updatedTask = { name, description, status };
            await TaskModel.update(id, updatedTask);

            return res.status(200).json({
                statusCode: 200,
                message: "Tarefa atualizada com sucesso!",
                data: { id, ...updatedTask }
            });

        } catch (err) {
            return res.status(500).json({
                statusCode: 500,
                message: "Erro ao atualizar tarefa.",
                error: err.message
            });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const authenticatedUserId = req.user.id;

            const task = await TaskModel.getById(id);
            if (!task) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Tarefa não encontrada"
                });
            }

            // Verifica se a tarefa pertence ao usuário autenticado
            if (task.user_id !== authenticatedUserId) {
                return res.status(403).json({
                    statusCode: 403,
                    message: "Acesso negado. Você não pode acessar esta tarefa."
                });
            }

            await TaskModel.delete(id);

            return res.status(200).json({
                statusCode: 200,
                message: "Tarefa excluída com sucesso!"
            });

        } catch (err) {
            return res.status(500).json({
                statusCode: 500,
                message: "Erro ao deletar tarefa.",
                error: err.message
            });
        }
    }
}

export default TaskController;
