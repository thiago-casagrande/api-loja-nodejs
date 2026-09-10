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

    const pagina = Number(req.query.pagina) === undefined ? 1 : Number(req.query.pagina);
    const limite = Number(req.query.limite) === undefined ? 2: Number(req.query.limite);

    const total = produtos.length;
    const totalPaginas = Math.ceil(total / limite);

    const inicio = (pagina - 1) * limite;

    const produtosPaginados = produtos.slice(inicio, inicio + limite);

    if (pagina > totalPaginas) {
        return res.status(404).json({
            mensagem: 'Página não encontrada'
        });
    }

    if (pagina < 1) {
        return res.status(400).json({
            mensagem: 'Página inválida'
        });
    }

    if (limite < 1) {
        return res.status(400).json({
            mensagem: 'Limite inválido'
        });
    }

    if (Number.isNaN(pagina)) {
        return res.status(400).json({
            mensagem: 'Página inválida'
        });
    }

    if (Number.isNaN(limite)) {

        return res.status(400).json({

            mensagem: 'Limite inválido'

        });

    }

    res.json({
        pagina: pagina,
        limite: limite,
        total: total,
        totalPaginas: totalPaginas,
        produtos: produtosPaginados
    });
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