const { Model, DataTypes } = require('sequelize');

class Usuario extends Model{
    static init (sequelize){
        super.init({
            apelido: DataTypes.STRING,
            usuario: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            pontos: DataTypes.INTEGER

        },{
            sequelize
        })
    }
    static associate(models) {
        this.hasMany(models.Leitura, { foreignKey: 'usuario_id', as: 'leituras' });
        this.hasMany(models.Solicitacao, { foreignKey: 'usuario_id', as: 'solicitacoes' });
    }
}

module.exports = Usuario