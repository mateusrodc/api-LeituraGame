const User = require('../models/Usuario');
const tokenjwt = require('../config/token');
const Usuario = require('../models/Usuario');

module.exports = {
  
  async index(req, res) {    ///listar usuários

    const users = await User.findAll({
      attributes: ['id','apelido']
    });
    return res.status(200).json(users);
  },
  async store(req, res) {     //cadastrar usuário

    const { apelido, usuario, email, senha, pontos } = req.body;

    try{

      if(apelido === "" || usuario === "" || email === "" || senha === "" || pontos === ""){
        return res.status(400).json({ error: "Campos em branco!" });
      }

      const existeEmail = await User.findOne({where: {email}});
      const existeApelido = await User.findOne({where: {apelido}});
      const existeUsuario = await User.findOne({where: {usuario}});

      if(existeEmail || existeApelido || existeUsuario){

        return res.status(400).json({ error: "Usuário já existente!" });
      }

      const user = await User.create(req.body);

      return res.json({

         apelido: user.apelido,
         token: tokenjwt.generateToken(user) 
      });
    }catch(err){

      console.log(err)
      return res.status(400).json({ error: "Registro de Usuário falhou" });
    }
  },
  async authenticate(req,res){   //autenticação e validações

    try{

      const { apelido, senha } = req.body;
      if(apelido === "" || senha === ""){
          return res.status(400).json({ error: "Preencha os campos" });
      }
      const user = await User.findOne({where: {apelido}});

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
  
      if (user.senha !== senha) {
        return res.status(400).json({ error: "Invalid password" });
      }
  
      return res.status(200).json({
        apelido: user.apelido,
        token: tokenjwt.generateToken(user)
      });

    }catch(err){

        console.log(err);
        return res.status(400).json({ error: "User authentication failed" });
    }  
  },
  async update(req,res){
    const {id} = req.params;
    const {apelido, usuario,email} = req.body;
    const user = await Usuario.findOne({where: {id}});
    if(!user){
      return res.status(400).json({ error: "Usuário não encontrado" });
    }
    if(apelido !== user.apelido){
      const u = await Usuario.findOne({where: {apelido}});
      if(u){
        return res.status(400).json({ error: "Apelido já existente" });
      }
    }
    if(usuario !== user.usario){
      const u2 = await Usuario.findOne({where: {usuario}});
      if(u2){
        return res.status(400).json({ error: "Usuário já existente" });
      }
    }
    if(email !== user.email){
      const u3 = await Usuario.findOne({where: {email}});
      if(u3){
        return res.status(400).json({ error: "E-mail já existente" });
      }
    }
    await Usuario.update(req.body,{where: {id: id}});
        
    return res.status(200).json({
        message: "Atualizado com sucesso"
    });
  }
};