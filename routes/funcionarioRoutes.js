const express     = require('express');
const router      = express.Router();
const Funcionario = require('../models/Funcionario');

/*
 * CREATE  ────────────────────────────────────────────────────────────────
 * POST /funcionario
 */
router.post('/', async (req, res) => {
  const { nome, cargo, salario, contratado } = req.body;

  if (!nome || !cargo || salario == null || contratado == null) {
    return res
      .status(422)
      .json({ error: 'nome, cargo, salario e contratado são obrigatórios.' });
  }

  try {
    const novoFuncionario = await Funcionario.create({
      nome,
      cargo,
      salario,
      contratado,
    });
    return res.status(201).json(novoFuncionario);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
 * READ (todos) ───────────────────────────────────────────────────────────
 * GET /funcionario
 */
router.get('/', async (_req, res) => {
  try {
    const funcionarios = await Funcionario.find();
    return res.status(200).json(funcionarios);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
 * READ (por id) ──────────────────────────────────────────────────────────
 * GET /funcionario/:id
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const funcionario = await Funcionario.findById(id);
    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado.' });
    }
    return res.status(200).json(funcionario);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
 * UPDATE ─────────────────────────────────────────────────────────────────
 * PUT /funcionario/:id  (substitui o documento inteiro)
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, cargo, salario, contratado } = req.body;

  try {
    const funcionarioAtualizado = await Funcionario.findByIdAndUpdate(
      id,
      { nome, cargo, salario, contratado },
      { new: true, runValidators: true }
    );

    if (!funcionarioAtualizado) {
      return res.status(404).json({ error: 'Funcionário não encontrado.' });
    }
    return res.status(200).json(funcionarioAtualizado);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
 * DELETE ─────────────────────────────────────────────────────────────────
 * DELETE /funcionario/:id
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const funcionarioRemovido = await Funcionario.findByIdAndDelete(id);
    if (!funcionarioRemovido) {
      return res.status(404).json({ error: 'Funcionário não encontrado.' });
    }
    return res.status(200).json({ message: 'Funcionário removido com sucesso.' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
