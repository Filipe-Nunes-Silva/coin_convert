import express from "express";
import cors from 'cors';


const PORT = process.env.PORT || 5555;
const app = express();

app.use(cors());
app.use(express.json());

import router from './routes/index';
app.use(router);

app.listen(PORT, () => {
    console.log(`Api rodando com sucesso! na porta ${PORT}`);
});