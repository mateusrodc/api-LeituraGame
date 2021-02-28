const request = require('supertest');
const app = require('../../src/app');

describe('Sign In', () => {

    it('usuario deve criar uma conta', async() => {
        const response = await request(app).post('/users').send({
            id: 1,
            apelido:"bitela",
            usuario:"bitela",
            senha: "churros123",
            email: "bitela@gmail.com",
            pontos: 0
        })
        expect(response.status).toBe(200);
    });
    it('usuario nao deve criar uma conta ja existente', async() => {
        const response = await request(app).post('/users').send({
            id: 1,
            apelido:"bitela",
            usuario:"bitela",
            senha: "churros123",
            email: "bitela@gmail.com",
            pontos: 0
        })
        expect(response.status).toBe(400);
    });
    it('usuario nao deve criar uma conta com email existente', async() => {
        const response = await request(app).post('/users').send({
            id: 1,
            apelido:"simba",
            usuario:"simba",
            senha: "123456ma",
            email: "bitela@gmail.com",
            pontos: 0
        })
        expect(response.status).toBe(400);
    });
    it('usuario nao deve criar uma conta com usuario existente', async() => {
        const response = await request(app).post('/users').send({
            id: 1,
            apelido:"simba",
            usuario:"bitela",
            senha: "123456ma",
            email: "simba@gmail.com",
            pontos: 0
        })
        expect(response.status).toBe(400);
    });
    it('usuario nao deve criar uma conta com apelido ja existente', async() => {
        const response = await request(app).post('/users').send({
            id: 1,
            apelido:"bitela",
            usuario:"simba",
            senha: "123456ma",
            email: "simba@gmail.com",
            pontos: 0
        })
        expect(response.status).toBe(400);
    });
    it('usuario nao deve criar uma conta com os campos em branco', async() => {
        const response = await request(app).post('/users').send({
            id: 1,
            apelido:"",
            usuario:"",
            senha: "",
            email: "",
            pontos: 0
        })
        expect(response.status).toBe(400);
    });
    it('usuario nao deve criar uma conta com o campo email em branco', async() => {
        const response = await request(app).post('/users').send({
            id: 1,
            apelido:"novoteste",
            usuario:"novoteste",
            senha: "123456ma",
            email: "",
            pontos: 0
        })
        expect(response.status).toBe(400);
    });
    it('usuario nao deve criar uma conta com o campo senha em branco', async() => {
        const response = await request(app).post('/users').send({
            id: 1,
            apelido:"novoteste",
            usuario:"novoteste",
            senha: "",
            email: "novoteste@gmail.com",
            pontos: 0
        })
        expect(response.status).toBe(400);
    });
    it('usuario nao deve criar uma conta com o campo apelido em branco', async() => {
        const response = await request(app).post('/users').send({
            id: 1,
            apelido:"",
            usuario:"teste",
            senha: "teste123",
            email: "teste@gmail.com",
            pontos: 0
        })
        expect(response.status).toBe(400);
    });
    it('usuario nao deve criar uma conta com o campo usuario em branco', async() => {
        const response = await request(app).post('/users').send({
            id:1,
            apelido:"testinho",
            usuario:"",
            senha: "testinho123",
            email: "testinho@gmail.com",
            pontos: 0
        })
        expect(response.status).toBe(400);
    });
    it('usuario nao deve criar uma conta com apelido recebendo um valor inteiro', async() => {
        const response = await request(app).post('/users').send({
            id: 1,
            apelido: 0,
            usuario:"simba",
            senha: "simba123",
            email: "simba@gmail.com",
            pontos: 0
        })
        expect(response.status).toBe(400);
    });
    it('usuario nao deve criar uma conta com senha recebendo um valor inteiro', async() => {
        const response = await request(app).post('/users').send({
            id: 1,
            apelido:"simba",
            usuario:"simba",
            senha: 0,
            email: "simba@gmail.com",
            pontos: 0
        })
        expect(response.status).toBe(400);
    });
    it('usuario nao deve criar uma conta com pontos recebendo um valor string', async() => {
        const response = await request(app).post('/users').send({
            id: 1,
            apelido:"news",
            usuario:"news",
            senha: "newsimba",
            email: "news@gmail.com",
            pontos: "0afafae"
        })
        expect(response.status).toBe(400);
    });
    it('usuario deve criar uma conta e receber um token de acesso', async() => {
        const response = await request(app).post('/users').send({
            id: 2,
            apelido:"narigagt",
            usuario:"narigagt",
            senha: "nariga123",
            email: "narigagt@gmail.com",
            pontos: 0
        })
        expect(response.status).toBe(200);
        expect(response.body.token).toBeTruthy();
    });

    it('usuario nao deve criar uma conta sem nenhum dado na requisicao', async() => {
        const response = await request(app).post('/users');
        expect(response.status).toBe(400);
    })
})
