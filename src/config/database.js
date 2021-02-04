module.exports = { 
    dialect: "postgres",
    host: "localhost",
    username: "postgres",
    password: "********************",
    database: "games",
    define: {
        timestamps: true,
        underscored: true,
    },
};

//yarn sequelize db:create     criação do banco