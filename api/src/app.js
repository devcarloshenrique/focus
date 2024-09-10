import express from 'express'
import cors from 'cors'
import "dotenv/config"

import UserRoutes from './routes/userRoutes.js';
import TaskRoutes from './routes/taskRoutes.js'
import authController from './controllers/authController.js';

const app = express()
app.use(express.json())
app.use(cors());

app.post('/login', authController.login);
app.use('/task', TaskRoutes);
app.use('/users', UserRoutes)


app.get('/', (req, res) => {
    return res.status(200).send('Helow World');
});

export default app;