const mongoose = require('mongoose');

const FuncionarioSchema = new mongoose.Schema({
  nome:       { type: String,  required: true },
  cargo:      { type: String,  required: true },
  salario:    { type: Number,  required: true },
  contratado: { type: Boolean, required: true }   // true = ativo | false = desligado
});

module.exports = mongoose.model('Funcionario', FuncionarioSchema);
