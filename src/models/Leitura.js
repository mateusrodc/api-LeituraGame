const { Model, DataTypes } = require('sequelize');

class Leitura extends Model{
    static init (sequelize){
        super.init({
            pontuacao: DataTypes.INTEGER,
            paginas_lidas: DataTypes.INTEGER
            
        },{
            sequelize,
            tableName: 'leituras'
        })
    }
    static associate(models) {
        this.belongsTo(models.Livro, { foreignKey: 'livro_id', as: 'livros' });
        this.belongsTo(models.Usuario, {foreignKey: 'usuario_id', as: 'usuarios'});
    }
}

module.exports = Leitura