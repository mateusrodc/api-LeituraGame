const { Model, DataTypes } = require('sequelize');

class Livro extends Model{
    static init (sequelize){
        super.init({
            titulo: DataTypes.STRING,
            pontuacao_maxima: DataTypes.INTEGER,
            paginas: DataTypes.INTEGER
            
        },{
            sequelize,
            tableName: 'livros'
        })
    }
    static associate(models) {
        this.belongsTo(models.Autor, { foreignKey: 'autor_id', as: 'autores' });
        this.hasMany(models.Leitura, { foreignKey: 'livro_id', as: 'leituras' });
    }
}

module.exports = Livro