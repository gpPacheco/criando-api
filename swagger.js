// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Funcionários',
      version: '1.0.0',
      description: 'Documentação da API REST de Funcionários com Node.js + Express',
    },
    servers: [
      {
        url: 'https://criando-api-czsh.onrender.com', 
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
