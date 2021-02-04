const { update } = require('../models/Livro');
const Livro = require('../models/Livro');

module.exports= {
    async index(req, res) {    ///listar livros
        const livros = await Livro.findAll({
            attributes: ['id','titulo','pontuacao_maxima','paginas','autor_id']
          });
          return res.json(livros);
    },
    async store(req, res) {     //cadastrar livro

        const  {titulo}  = req.body;
        
        try{

            const existelivro = await Livro.findOne({where: {titulo}});
            if(existelivro){
                return res.status(400).json({ error: "Livro já existente!" });
            }
        
            const livro = await Livro.create(req.body);
            
        
            return res.json({
                titulo: livro.titulo
            });
        }catch(err){
    
          console.log(err)
          return res.status(400).json({ error: "Registro de Livro falhou" });
        }
    },
    async update(req,res){
        const {id} = req.params;
        const {titulo} = req.body;
        const livro = await Livro.findOne({where: {id}});

        if(!livro){
            return res.status(400).json({ error: "Registro de livro inexistente" });
        }
        if(titulo !== livro.titulo){
            const l = await Livro.findOne({where: {titulo}});
            if(l){
                return res.status(400).json({ error: "Título já existente" });
            }
        }
        const livro_update = await Livro.update(req.body,{where: {id: id}});
            
        
        return res.json({
            message: "Atualizado com sucesso"
        });


    },
    async delete(req,res){
        const {id} = req.params;
        const livro = Livro.findOne({where: {id}});
        if(!livro){
            return res.status(400).json({ error: "Registro de livro inexistente" });
        }
        const del = await Livro.destroy({where:{id:id}});
        return res.json({
            message: "Excluído com sucesso"
        });
    }
};