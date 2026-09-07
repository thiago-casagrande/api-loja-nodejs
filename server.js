const express = require('express');

const app = express();

app.use(express.json());

let produtos = [
    { id: 1, nome: 'Teclado', preco: 120 },
    { id: 2, nome: 'Mouse', preco: 50 },
    { id: 3, nome: 'Monitor', preco: 800 }
];

app.get('/', (req, res) => {
    console.log('A rota / foi acessada!');
    res.send('FUNCIONOU!');
});

app.get('/produtos', (req, res) => {
    res.json(produtos);
});

app.get('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);

    const produto = produtos.find(produto => produto.id === id);

    if (!produto) {
        return res.status(404).json({
            mensagem: 'produto não encontrado'
        });
    }

    res.json(produto);
});

app.post('/produtos', (req, res) => {

    const novoProduto = {
        id: 4,
        nome: req.body.nome,
        preco: req.body.preco
    };
    produtos.push(novoProduto);

    res.json(novoProduto);
});

app.put('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const produto = produtos.find(produto => produto.id === id);
    if (!produto) {
        return res.status(404).json({
            mensagem: 'produto não encontrado'
        })
    }
    produto.nome = req.body.nome;
    produto.preco = req.body.preco;

    res.json(produto);
});

app.delete('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const produto = produtos.find(produto => produto.id === id);
    if (!produto) {
        return res.status(404).json({
            mensagem: 'produto não encontrado'
        })
    }
    produtos = produtos.filter(produto => produto.id !== id);

    res.json({ mensagem: 'produto removido com sucesso' })
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});