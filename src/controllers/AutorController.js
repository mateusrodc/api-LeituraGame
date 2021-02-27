const Autor = require('../models/Autor');


module.exports= {
    async index(req, res) {    ///listar autores

        const autores = await Autor.findAll({
          attributes: ['id','nome']
        });
        return res.json(autores);
    },
    async store(req, res) {     //cadastrar autor

        const  {nome}  = req.body;
        
        try{
            const existeautor = await Autor.findOne({where: {nome}});
            if(existeautor){
                return res.status(400).json({ error: "Autor já existente" });
            }
            const autor = await Autor.create(req.body);
            return res.json({
                nome: autor,
            });
        }catch(err){
          console.log(err)
          return res.status(400).json({ error: "Registro de Autor falhou" });
        }
    },
    async update(req,res){
        const {id} = req.params;
        const {nome} = req.body;
        const autor = await Autor.findOne({where: {id}});
        if (!autor){
            return res.status(400).json({ error: "Registro de Autor inexistente" });
        }
        if(nome !== autor.nome){
            const a = await Autor.findOne({where: {nome}});
            if(a){
                return res.status(400).json({ error: "Autor já existente" });
            }
        }
        await Autor.update(req.body,{where: {id: id}});
        
        return res.json({
            message: "Atualizado com sucesso"
        });
    },
    async delete(req,res){
        const {id} = req.params;
        const autor = Autor.findOne({where: {id}});
        if(!autor){
            return res.status(400).json({ error: "Registro de autor inexistente" });
        }
        await Autor.destroy({where:{id:id}});
        return res.json({
            message: "Excluído com sucesso"
        });
    }
};

