const { Model, DataTypes } = require('sequelize');

class Autor extends Model{
    static init (sequelize){
        super.init({
            nome: DataTypes.STRING
            
        },{
            sequelize,
            tableName: 'autores'
        })
    }
    static associate(models) {
        this.hasMany(models.Livro, { foreignKey: 'autor_id', as: 'livros' });
    }
}

module.exports = Autor