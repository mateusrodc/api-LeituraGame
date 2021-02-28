const request = require('supertest');
const app = require('../../src/app');

describe('Autenticacao', () => {

    
    it('usuario deve se autenticar com credenciais válidas', async() => {
        
        const response = await request(app).post('/authenticate').send({
            apelido: "bitela",
            senha: "churros123"
        })
        
        expect(response.status).toBe(200);
        
    });

    it('usuario nao deve se autenticar com credenciais inválidas', async()=> {
        const response = await request(app).post('/authenticate').send({
            apelido: "bitera",
            senha: "bitera"
        })
        expect(response.status).toBe(400);
    });

    it('usuario nao deve se autenticar com apelido inexistente', async()=> {
        const response = await request(app).post('/authenticate').send({
            apelido: "bitera",
            senha: "churros123"
        })
        expect(response.status).toBe(400);
    });
    
    it('usuario nao deve se autenticar com senha incorreta', async()=> {
        const response = await request(app).post('/authenticate').send({
            apelido: "bitela",
            senha: "churros12"
        })
        expect(response.status).toBe(400);
    });

    it('usuario nao deve se autenticar com apelido e senha em branco', async()=>{
        const response = await request(app).post('/authenticate').send({
            apelido: "",
            senha: ""
        })
        expect(response.status).toBe(400);
    });

    it('usuario nao deve se autenticar com apelido em branco', async()=>{
        const response = await request(app).post('/authenticate').send({
            apelido: "",
            senha: "churros123"
        })
        expect(response.status).toBe(400);
    });

    it('usuario nao deve se autenticar com senha em branco', async()=>{
        const response = await request(app).post('/authenticate').send({
            apelido: "bitela",
            senha: ""
        })
        expect(response.status).toBe(400);
    });

    it('usuario deve receber um token de acesso', async()=>{
        const response = await request(app).post('/authenticate').send({
            apelido: "bitela",
            senha: "churros123"
        })
        expect(response.body.token).toBeTruthy()
    });
    
    it('usuario nao deve se autenticar sem nenhum dado na requisicao', async()=> {
        const response = await request(app).post('/authenticate')
        expect(response.status).toBe(400)
    });

    it('usuario nao deve se autenticar sem informar a senha', async()=> {
        const response = await request(app).post('/authenticate').send({
            apelido: "bitela"
        })
        expect(response.status).toBe(400)
    });

});
