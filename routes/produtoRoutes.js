const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       required:
 *         - nome
 *         - preco
 *       properties:
 *         nome:
 *           type: string
 *         descricao:
 *           type: string
 *         cor:
 *           type: string
 *         peso:
 *           type: number
 *         tipo:
 *           type: string
 *         preco:
 *           type: number
 *         dataCadastro:
 *           type: string
 *           format: date-time
 *       example:
 *         nome: Notebook Gamer
 *         descricao: Modelo com 16GB RAM e RTX 3060
 *         cor: Preto
 *         peso: 2.5
 *         tipo: Eletrônico
 *         preco: 5499.90
 *         dataCadastro: 2025-06-23T10:00:00.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Produto
 *   description: API para gerenciamento de produtos
 */

/**
 * @swagger
 * /produto:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       422:
 *         description: Dados obrigatórios faltando
 *       500:
 *         description: Erro interno no servidor
 */
router.post('/', async (req, res) => {
  const { nome, descricao, cor, peso, tipo, preco } = req.body;

  if (!nome || preco == null) {
    return res.status(422).json({ error: 'nome e preco são obrigatórios.' });
  }

  try {
    const novoProduto = await Produto.create({
      nome, descricao, cor, peso, tipo, preco
    });
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /produto:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produto]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/', async (_req, res) => {
  try {
    const produtos = await Produto.find();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /produto/{identificador}:
 *   get:
 *     summary: Busca um produto por ID ou nome
 *     tags: [Produto]
 *     parameters:
 *       - in: path
 *         name: identificador
 *         schema:
 *           type: string
 *         required: true
 *         description: ID ou nome do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/:identificador', async (req, res) => {
  const { identificador } = req.params;

  try {
    const produto = await Produto.findOne({
      $or: [{ _id: identificador }, { nome: identificador }]
    });

    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /produto/{id}:
 *   put:
 *     summary: Atualiza um produto por ID
 *     tags: [Produto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno no servidor
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, cor, peso, tipo, preco } = req.body;

  try {
    const produtoAtualizado = await Produto.findByIdAndUpdate(
      id,
      { nome, descricao, cor, peso, tipo, preco },
      { new: true, runValidators: true }
    );

    if (!produtoAtualizado) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    res.status(200).json(produtoAtualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /produto/{id}:
 *   delete:
 *     summary: Remove um produto por ID
 *     tags: [Produto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto removido com sucesso
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno no servidor
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const produtoRemovido = await Produto.findByIdAndDelete(id);
    if (!produtoRemovido) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    res.status(200).json({ message: 'Produto removido com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
