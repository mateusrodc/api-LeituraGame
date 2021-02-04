const Leitura = require("../models/Leitura");
const Usuario = require("../models/Usuario");

module.exports={
    async rank(req,res){
        const usuarios = await Usuario.findAll({
            attributes: ['id','pontos','apelido','usuario','email','senha']
        });
        
        for(i in usuarios){
            const user_id = usuarios[i]['dataValues']['id'];
            
            var cont = 0;
            const leitura = await Leitura.findAll({where: {usuario_id: user_id},raw: true,nest: true});
            leitura.map(function(x){
                
                cont = cont + Number(x.pontuacao);
            });
            await Usuario.update({
                'pontos': cont.toFixed(2),
                'apelido': usuarios[i]['dataValues']['apelido'],
                'usuario': usuarios[i]['dataValues']['usuario'],
                'senha': usuarios[i]['dataValues']['senha'],
                'email': usuarios[i]['dataValues']['email']
            },{where: {id: user_id}});
        }
        const users = await Usuario.findAll({ attributes: ['apelido','pontos'], order: [
            ['pontos','DESC']
        ]});
        
        return res.json(users);
    }
}