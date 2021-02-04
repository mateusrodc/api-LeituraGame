const { update } = require('../models/Leitura');
const Leitura = require('../models/Leitura');
const Livro = require('../models/Livro');
const Usuario = require('../models/Usuario');



module.exports= {
    async index(req, res) {    ///listar leituras
        
        const {usuario_id} = req.params;

        const user = await Usuario.findByPk(usuario_id,{
            
            include: {
                association: 'leituras'
            }
          });
          return res.json(user.leituras);
    },
    async store(req, res) {     //cadastrar leitura

        const  {livro_id, paginas_lidas}  = req.body;
        const {usuario_id} = req.params;
        
        try{

            const existelivro = await Leitura.findOne({where: {livro_id,usuario_id}});
            if(existelivro){
                return res.status(400).json({ error: "Leitura já existente!" });
            }
            const id = livro_id;
            const livro = await Livro.findOne({where: {id}});

            if(paginas_lidas < 0 || paginas_lidas > livro.paginas){
                return res.status(400).json({ error: "Quantidade de páginas insuficiente!" });
            }

            const pagTotal = livro.paginas;
            const pontoTotal = livro.pontuacao_maxima;

            const calcPagLidas = Math.sqrt(paginas_lidas);
            const calcPagTotal = Math.sqrt(pagTotal);

            const resultado = pontoTotal * (calcPagLidas/calcPagTotal);

            const leitura = await Leitura.create({
                "usuario_id": usuario_id,
                "livro_id": livro_id,
                "paginas_lidas": paginas_lidas,
                "pontuacao": resultado
            });
            
        
            return res.json({
                "leitura": leitura
            });
        }catch(err){
    
          console.log(err)
          return res.status(400).json({ error: "Registro de Leitura falhou" });
        }
    },
    async update(req,res){
        const id_leitura = req.params.id;
        const  {paginas_lidas}  = req.body;

        const leitura = await Leitura.findOne({where: {id: id_leitura}})
        const id = leitura.livro_id;
        const livro = await Livro.findOne({where: {id}});

        if(paginas_lidas < 0 || paginas_lidas > livro.paginas){
            return res.status(400).json({ error: "Quantidade de páginas insuficiente!" });
        }

        const pagTotal = livro.paginas;
        const pontoTotal = livro.pontuacao_maxima;

        const calcPagLidas = Math.sqrt(paginas_lidas);
        const calcPagTotal = Math.sqrt(pagTotal);

        const resultado = pontoTotal * (calcPagLidas/calcPagTotal);
        console.log(resultado);
        const leitura_atualizada = await Leitura.update({
            "usuario_id": leitura.usuario_id,
            "livro_id": leitura.livro_id,
            "paginas_lidas": paginas_lidas,
            "pontuacao": resultado
        },{where: {id: id_leitura}})
        return res.json({message:"Páginas atualizadas para essa leitura"});
    }
};