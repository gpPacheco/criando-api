const express = require('express');
const router = express.Router();
const Funcionario = require('../models/Funcionario');

/**
 * @swagger
 * components:
 *   schemas:
 *     Funcionario:
 *       type: object
 *       required:
 *         - nome
 *         - cargo
 *         - salario
 *         - contratado
 *       properties:
 *         nome:
 *           type: string
 *         cargo:
 *           type: string
 *         salario:
 *           type: number
 *         contratado:
 *           type: boolean
 *       example:
 *         nome: João da Silva
 *         cargo: Desenvolvedor
 *         salario: 5000
 *         contratado: true
 */

/**
 * @swagger
 * tags:
 *   name: Funcionário
 *   description: API de gerenciamento de funcionários
 */

/**
 * @swagger
 * /funcionario:
 *   post:
 *     summary: Cria um novo funcionário
 *     tags: [Funcionário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Funcionario'
 *     responses:
 *       201:
 *         description: Funcionário criado com sucesso
 *       422:
 *         description: Dados obrigatórios faltando
 *       500:
 *         description: Erro interno no servidor
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

/**
 * @swagger
 * /funcionario:
 *   get:
 *     summary: Lista todos os funcionários
 *     tags: [Funcionário]
 *     responses:
 *       200:
 *         description: Lista de funcionários
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/', async (_req, res) => {
  try {
    const funcionarios = await Funcionario.find();
    return res.status(200).json(funcionarios);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /funcionario/{id}:
 *   get:
 *     summary: Retorna um funcionário por ID
 *     tags: [Funcionário]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do funcionário
 *     responses:
 *       200:
 *         description: Funcionário encontrado
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro interno no servidor
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

/**
 * @swagger
 * /funcionario/{id}:
 *   put:
 *     summary: Atualiza um funcionário por ID
 *     tags: [Funcionário]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do funcionário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Funcionario'
 *     responses:
 *       200:
 *         description: Funcionário atualizado com sucesso
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro interno no servidor
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

/**
 * @swagger
 * /funcionario/{id}:
 *   delete:
 *     summary: Remove um funcionário por ID
 *     tags: [Funcionário]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do funcionário
 *     responses:
 *       200:
 *         description: Funcionário removido com sucesso
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro interno no servidor
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
