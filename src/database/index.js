const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Autor = require('../models/Autor');
const Leitura = require('../models/Leitura');
const Livro = require('../models/Livro');
const Solicitacao = require('../models/Solicitacao');
const User = require('../models/Usuario');

const connection = new Sequelize(dbConfig);

User.init(connection);
Autor.init(connection);
Livro.init(connection);
Leitura.init(connection);
Solicitacao.init(connection);


Autor.associate(connection.models);
Livro.associate(connection.models);
Leitura.associate(connection.models);
User.associate(connection.models);
Solicitacao.associate(connection.models);

module.exports = connection;