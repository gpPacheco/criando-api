const express = require('express');

const server = express();

// server.get('/curso', (req, res) => {
//     return res.send('Hello world');
// });

server.get('/curso',(req, res) => {
    return res.json({curso: 'Node JS'});
});

server.use(express.json());

server.post('/curso', (req, res) => {
    console.log (req.body);
    return res.send('OI Cliente, tudo bem?');
});

server.listen(3000, () =>{
    console.log('Servidor rodando na porta 3000');
});