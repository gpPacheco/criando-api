const express    = require('express');
const mongoose   = require('mongoose');
const servidor   = express();
const funcionarioRoutes = require('./routes/funcionarioRoutes');

// Middleware padrão
servidor.use(express.urlencoded({ extended: true }));
servidor.use(express.json());

// Rotas
servidor.use('/funcionario', funcionarioRoutes);

// Conexão MongoDB
const DB_USER = 'gabrielfppacheco';
const DB_PASSWORD = encodeURIComponent('Miojinho12!');
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.hjjlx9d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => console.log('✅  Conectado ao MongoDB'))
  .catch(err => console.error('Erro MongoDB:', err));

// Sobe a API
servidor.listen(3000, () => console.log('🚀  API rodando em http://localhost:3000'));






























// const cursos = ['Node JS', 'JavaScript', 'PHP', 'React Show', 'VueJS'];

// // Middleware Global: Executa em todas as requisições
// server.use((req, res, next) => {
//     console.log(`URL CHAMADA: ${req.url}`);
//     return next(); // Continua para a próxima função/rota
// });

// // Middleware Local: Verifica se o nome do curso foi enviado no body do POST
// function checkCurso(req, res, next) {
//     if (!req.body.novo_curso) {
//         return res.status(400).json({ error: "Nome do curso é obrigatório nesse formato {'novo_curso': 'Lua'}" });
//     }
//     return next();
// }

// // Middleware Local: Verifica se o ID (index) do curso existe
// function checkIDCurso(req, res, next) {
//     const curso = cursos[req.params.index];
//     if (!curso) {
//         return res.status(400).json({ error: "O curso não existe no ID solicitado" });
//     }
//     return next();
// }

// server.get("/curso", (req, res) => {
//     return res.json(cursos);
// });

// // Aplica o middleware checkIDCurso
// server.get("/curso/:index", checkIDCurso, (req, res) => {
//     const { index } = req.params;
//     return res.json(cursos[index]);
// });

// // Aplica o middleware checkCurso
// server.post('/curso', checkCurso, (req, res) => {
//     const { novo_curso } = req.body;
//     cursos.push(novo_curso);
//     return res.json(cursos);
// });

// // Aplica os middlewares checkIDCurso e um para o body (exercício sugerido)
// server.put('/curso/:index', checkIDCurso, (req, res) => {
//     const { index } = req.params;
//     const { curso } = req.body;
//     cursos[index] = curso;
//     return res.json(cursos);
// });

// // Aplica o middleware checkIDCurso
// server.delete('/curso/:index', checkIDCurso, (req, res) => {
//     const { index } = req.params;
//     cursos.splice(index, 1);
//     return res.json({ message: "Curso deletado com sucesso" });
// });