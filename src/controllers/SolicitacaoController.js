const { update } = require('../models/Livro');
const Livro = require('../models/Livro');
const Solicitacao = require('../models/Solicitacao');
const Usuario = require('../models/Usuario');


module.exports= {
    async show(req,res){
        const {id} = req.params;
        const user = Usuario.findOne({where: {id}});
        if (!user){
            return res.status(400).json({ error: "Usuário não existente" });
        }
        const usuario = await Usuario.findByPk(id,{
            
            include: {
                association: 'solicitacoes'
            }
          });
          return res.json(usuario.solicitacoes);
    },
    async index(req, res) {    ///listar autores

        const solicitacoes = await Solicitacao.findAll({
          attributes: ['id','titulo','autor','status','usuario_id']
        });
        return res.json(solicitacoes);
    },
    async store(req, res) {     //cadastrar autor

        const  {titulo,autor, usuario_id,status}  = req.body;
        
        try{

            const existelivro = await Livro.findOne({where: {titulo}});
            const existeUsuario = await Usuario.findOne({where: {id: usuario_id}});

            if(existelivro){
                return res.status(400).json({ error: "Livro já existente" });
            }
            if(!existeUsuario){
                return res.status(400).json({ error: "Usuário não existente" });
            }
        
            const solicitacao = await Solicitacao.create(req.body);
            
        
            return res.json({
                solicitacao: solicitacao,
            });
        }catch(err){
    
          console.log(err)
          return res.status(400).json({ error: "Registro de Solicitacao falhou" });
        }
    },
    async update(req,res){
        const {id} = req.params;
        const {status} = req.body;

        const solicitacao = await Solicitacao.findOne({where: {id}});
        
        if(!solicitacao){
            return res.status(400).json({ error: "Registro não existente" });
        }
        await Solicitacao.update({
            "titulo": solicitacao.titulo,
            "autor": solicitacao.autor,
            "usuario_id": solicitacao.usuario_id,
            "status": status
        },{where: {id: id}})
        return res.json({message:"Solicitação atualizada"});
    }
};