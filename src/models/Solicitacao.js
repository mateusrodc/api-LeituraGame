const { Model, DataTypes } = require('sequelize');

class Solicitacao extends Model{
    static init (sequelize){
        super.init({
            titulo: DataTypes.STRING,
            autor: DataTypes.STRING,
            status: DataTypes.STRING,

        },{
            sequelize,
            tableName: 'solicitacoes'
        })
    }
    static associate(models) {
        this.belongsTo(models.Usuario, {foreignKey: 'usuario_id', as: 'usuarios'});
    }
}

module.exports = Solicitacao