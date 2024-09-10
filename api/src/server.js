import app from './app.js';

const PORT = process.env.NODE_LOCAL_PORT
const HOST = process.env.NODE_LOCAL_HOST

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});
