const express = require('express');
const mongoose = require('mongoose');
const produtoRoutes = require('./routes/produtoRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const servidor = express();

// Middlewares
servidor.use(express.urlencoded({ extended: true }));
servidor.use(express.json());

// Rotas da API
servidor.use('/produto', produtoRoutes);

// Rota da documentação
servidor.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 🔧 Conexão MongoDB
const DB_USER = 'gabrielfppacheco';
const DB_PASSWORD = encodeURIComponent('Miojinho12!'); 

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.hjjlx9d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log('✅ Conectado ao MongoDB');
    servidor.listen(3000, () => {
      console.log('🚀 API rodando em http://localhost:3000');
    });
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar ao MongoDB:', err.message);
  });
