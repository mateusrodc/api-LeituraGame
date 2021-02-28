const request = require('supertest');
const app = require('../../src/app');

describe('Lista de Usuarios', () => {

    it('deve retornar todos os usuarios cadastrados', async()=>{
        const response = await request(app).post('/authenticate').send({
            apelido: "bitela",
            senha: "churros123"
        });
        const token = response.body.token;
        const users = await request(app).get('/users').set('Authorization', `Bearer ${token}`)

        expect(users.status).toBe(200);
    });
    it('nao deve retornar todos os usuarios cadastrados sem o token de acesso', async() => {
        const response = await request(app).post('/authenticate').send({
            apelido: "bitela",
            senha: "churros123"
        });
        const users = await request(app).get('/users')
        expect(users.status).toBe(401);
    });
    it('nao deve retornar todos os usuarios cadastrados com token invalido', async() => {
        const response = await request(app).post('/authenticate').send({
            apelido: "bitela",
            senha: "churros123"
        });
        const token = "5aa5dw5a1dsd15as1d5aw05"
        const users = await request(app).get('/users').set('Authorization', `Bearer ${token}`)
        expect(users.status).toBe(401);
    });

})