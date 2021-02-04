const express = require('express');
const authMiddleware = require('./middlewares/auth');

const UserController = require('./controllers/UserController');
const AutorController = require('./controllers/AutorController');
const LivroController = require('./controllers/LivroController');
const LeituraController = require('./controllers/LeituraController');
const SolicitacaoController = require('./controllers/SolicitacaoController');
const RankingController = require('./controllers/RankingController');
const routes = express.Router();


routes.post('/authenticate',UserController.authenticate);
routes.post('/users', UserController.store);

routes.get('/users',authMiddleware, UserController.index);
routes.put('/user/:id',authMiddleware,UserController.update);

routes.get('/api/ranking',authMiddleware,RankingController.rank);

routes.get('/api/autores',authMiddleware,AutorController.index);
routes.post('/api/autor',authMiddleware,AutorController.store);
routes.put('/api/autor/:id',authMiddleware,AutorController.update);
routes.delete('/api/autor/:id',authMiddleware,AutorController.delete);

routes.get('/api/livros',authMiddleware,LivroController.index);
routes.post('/api/livro',authMiddleware,LivroController.store);
routes.put('/api/livro/:id',authMiddleware,LivroController.update);
routes.delete('/api/livro/:id',authMiddleware,LivroController.delete);

routes.post('/api/leitura/:usuario_id',authMiddleware,LeituraController.store);
routes.get('/api/leituras/:usuario_id',authMiddleware, LeituraController.index);
routes.put('/api/leitura/:id',authMiddleware,LeituraController.update);

routes.get('/api/solicitacoes',authMiddleware,SolicitacaoController.index);
routes.post('/api/solicitacao',authMiddleware,SolicitacaoController.store);
routes.get('/api/solicitacoes/:id',authMiddleware,SolicitacaoController.show);
routes.put('/api/solicitacao/:id',authMiddleware,SolicitacaoController.update);




module.exports = routes;