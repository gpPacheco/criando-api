const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Produtos - Loja Franca',
      version: '1.0.0',
      description: 'CRUD completo de produtos diversos utilizando MongoDB',
    },
    servers: [
      {
        url: 'https://criando-api-czsh.onrender.com',
        description: 'Servidor hospedado no Render'
      },
      {
        url: 'http://localhost:3000',
        description: 'Servidor local para desenvolvimento'
      }
    ]
  },
  apis: ['./routes/*.js'], // arquivos que contêm os comentários Swagger
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
