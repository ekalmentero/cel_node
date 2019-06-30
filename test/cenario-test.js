const chai = require('chai');
const app = require('../app');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Cenarios', () => {
    describe('Ler', () => {
        it('Verifica cenário que não existe', (done) => {
            chai.request(app).get("/cenario/0").end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean');
                expect(res.body.error).to.be.equal(true);
                expect(res.body.message).to.be.equal("Cenario nao existe");
                done();
            })
        });

        it('Verifica cenário sem episodio', (done) => {
            chai.request(app).get("/cenario/64").end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean');
                expect(res.body.error).to.be.equal(ture);
                expect(res.body.data.Episodios).to.have.lengthOf.at.equal(0);
                expect(res.body.message).to.be.equal("Cenario não existe")
                done();
            })
        });

        it('Verifica cenário com um episodio', (done) => {
            chai.request(app).get("/cenario/64").end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean');
                expect(res.body.error).to.be.equal(false);
                expect(res.body.data.Episodios).to.have.lengthOf.at.equal(1);
                done();
            })
        });

        it('Verifica cenário com 2 ou mais episodios', (done) => {
            chai.request(app).get("/cenario/64").end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean');
                expect(res.body.error).to.be.equal(false);
                expect(res.body.data.Episodios).to.have.lengthOf.at.least(2);
                done();
            })
        });

        it('Verifica cenário sem recursos', (done) => {
            chai.request(app).get("/cenario/64").end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean');
                expect(res.body.error).to.be.equal(true);
                expect(res.body.data.Recursos).to.have.lengthOf.at.equal(0);
                expect(res.body.message).to.be.equal("Cenario não existe")
                done();
            })
        });

        it('Verifica cenário com um recurso', (done) => {
            chai.request(app).get("/cenario/64").end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean');
                expect(res.body.error).to.be.equal(false);
                expect(res.body.data.Recursos).to.have.lengthOf.at.equal(1);
                done();
            })
        });

        it('Verifica cenário com 2 ou mais recursos', (done) => {
            chai.request(app).get("/cenario/64").end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean');
                expect(res.body.error).to.be.equal(false);
                expect(res.body.data.Recursos).to.have.lengthOf.at.least(2);
                done();
            })
        });

        it('Verifica cenário sem atores', (done) => {
            chai.request(app).get("/cenario/64").end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean');
                expect(res.body.error).to.be.equal(true);
                expect(res.body.data.Ators).to.have.lengthOf.at.equal(0);
                expect(res.body.message).to.be.equal("Cenario não existe")
                done();
            })
        });

        it('Verifica cenário com um recurso', (done) => {
            chai.request(app).get("/cenario/64").end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean');
                expect(res.body.error).to.be.equal(false);
                expect(res.body.data.Ators).to.have.lengthOf.at.equal(1);
                done();
            })
        });


        it('Verifica cenário com 2 ou mais atores', (done) => {
            chai.request(app).get("/cenario/64").end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean');
                expect(res.body.error).to.be.equal(false);
                expect(res.body.data.Ators).to.have.lengthOf.at.least(2);
                done();
            })
        })
    })

    describe('Inserir', () => {
        it('Insere cenário com nome igual', (done) => {
            chai.request(app).post("/cenario/").send({
                tituloCenario: 'novidade',
                descricaoContexto: 'novo contexto',
                nomeAtor: 'Larissa,Ricardo',
                descricaoEpisodio: 'episodio1,Opcional',
                descricaoRecurso: 'note',
                descricaoExcecao: 'exceção1'
            }).end((err, res) => {
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean');
                expect(res.body.error).to.be.equal(true, "Servidor não retornou erro ao inserir cenario com nome igual");
                expect(res.body.message).to.be.equal("Cenario já existe");
                done();
            })
        });

        it('Insere Cenario com campo vazio', (done) => {
            chai.request(app).post("/cenario/").send({
                tituloCenario: 'novidade',
                descricaoContexto: null,
                nomeAtor: 'Larissa,Ricardo',
                descricaoEpisodio: 'episodio1,Opcional',
                descricaoRecurso: 'note',
                descricaoExcecao: 'exceção1'
            }).end((err, res) => {
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('object', "Servidor não retornou erro");
                expect(res.body.error.errors).to.be.an('array');
                expect(res.body.error.errors[0].message).to.be.equal("Contexto.descricao cannot be null");
                done();
            })
        });

        it('Insere cenario sem recurso', (done) => {
            chai.request(app).post("/cenario/").send({
                tituloCenario: 'novidade',
                descricaoContexto: "sem recurso",
                nomeAtor: 'Larissa,Ricardo',
                descricaoEpisodio: 'episodio1,Opcional',
                descricaoRecurso: "",
                descricaoExcecao: 'exceção1'
            }).end((err, res) => {
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean', "Servidor retornou erro ao enviar cenario sem recurso");
                expect(res.body.error).to.be.equal(false, "Servidor retornou erro ao enviar cenario sem recurso");
                expect(res.body.data).to.be.an('object');
                done();
            })
        });

        it('Insere cenario com um recurso', (done) => {
            chai.request(app).post("/cenario/").send({
                tituloCenario: 'novidade',
                descricaoContexto: "sem recurso",
                nomeAtor: 'Larissa,Ricardo',
                descricaoEpisodio: 'episodio1,Opcional',
                descricaoRecurso: "note",
                descricaoExcecao: 'exceção1'
            }).end((err, res) => {
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean', "Servidor retornou erro ao enviar cenario com 1 recurso");
                expect(res.body.error).to.be.equal(false, "Servidor retornou erro ao enviar cenario com 1 recurso");
                expect(res.body.data).to.be.an('object');
                done();
            })
        });

        it('Insere cenario com dois ou mais recursos', (done) => {
            chai.request(app).post("/cenario/").send({
                tituloCenario: 'novidade',
                descricaoContexto: "sem recurso",
                nomeAtor: 'Larissa,Ricardo',
                descricaoEpisodio: 'episodio1,Opcional',
                descricaoRecurso: "note,ES",
                descricaoExcecao: 'exceção1'
            }).end((err, res) => {
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean', "Servidor retornou erro ao enviar cenario com 2 ou mais recurso");
                expect(res.body.error).to.be.equal(false, "Servidor retornou erro ao enviar cenario com 2 ou mais recurso");
                expect(res.body.data).to.be.an('object');
                done();
            })
        });


        it('Insere cenario sem atores', (done) => {
            chai.request(app).post("/cenario/").send({
                tituloCenario: 'novidade',
                descricaoContexto: "sem arores",
                nomeAtor: '',
                descricaoEpisodio: 'episodio1,Opcional',
                descricaoRecurso: "note,ES",
                descricaoExcecao: 'exceção1'
            }).end((err, res) => {
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean', "Servidor retornou erro ao enviar cenario sem atores");
                expect(res.body.error).to.be.equal(false, "Servidor retornou erro ao enviar cenario sem atores");
                expect(res.body.data).to.be.an('object');
                done();
            })
        });

        it('Insere cenario com um ator', (done) => {
            chai.request(app).post("/cenario/").send({
                tituloCenario: 'novidade',
                descricaoContexto: "atores",
                nomeAtor: 'Larissa',
                descricaoEpisodio: 'episodio1,Opcional',
                descricaoRecurso: "note",
                descricaoExcecao: 'exceção1'
            }).end((err, res) => {
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean', "Servidor retornou erro ao enviar cenario com 1 ator");
                expect(res.body.error).to.be.equal(false, "Servidor retornou erro ao enviar cenario com 1 ator");
                expect(res.body.data).to.be.an('object');
                done();
            })
        });

        it('Insere cenario com dois ou mais atores', (done) => {
            chai.request(app).post("/cenario/").send({
                tituloCenario: 'novidade',
                descricaoContexto: "dois atores",
                nomeAtor: 'Larissa,Ricardo',
                descricaoEpisodio: 'episodio1,Opcional',
                descricaoRecurso: "note,ES",
                descricaoExcecao: 'exceção1'
            }).end((err, res) => {
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean', "Servidor retornou erro ao enviar cenario com 2 ou mais atores");
                expect(res.body.error).to.be.equal(false, "Servidor retornou erro ao enviar cenario com 2 ou mais atores");
                expect(res.body.data).to.be.an('object');
                done();
            })
        });

        it('Insere cenario sem episodios', (done) => {
            chai.request(app).post("/cenario/").send({
                tituloCenario: 'novidade',
                descricaoContexto: "sem episodios",
                nomeAtor: 'Larissa,Ricardo',
                descricaoEpisodio: '',
                descricaoRecurso: "note,ES",
                descricaoExcecao: 'exceção1'
            }).end((err, res) => {
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean', "Servidor retornou erro ao enviar cenario sem episodio");
                expect(res.body.error).to.be.equal(false, "Servidor retornou erro ao enviar cenario sem episodio");
                expect(res.body.data).to.be.an('object');
                done();
            })
        });

        it('Insere cenario com um episodio', (done) => {
            chai.request(app).post("/cenario/").send({
                tituloCenario: 'novidade',
                descricaoContexto: "atores",
                nomeAtor: 'Larissa',
                descricaoEpisodio: 'episodio1,Opcional',
                descricaoRecurso: "note",
                descricaoExcecao: 'exceção1'
            }).end((err, res) => {
                expect(res.body).to.be.a('object');
                console.log(res.body);
                expect(res.body.error).to.be.an('boolean', "Servidor retornou erro ao enviar cenario com 1 episodio");
                expect(res.body.error).to.be.equal(false, "Servidor retornou erro ao enviar cenario com 1 episodio");
                expect(res.body.data).to.be.an('object');
                done();
            })
        });

        it('Insere cenario com dois ou mais episodios', (done) => {
            chai.request(app).post("/cenario/").send({
                tituloCenario: 'novidade',
                descricaoContexto: "dois atores",
                nomeAtor: 'Larissa,Ricardo',
                descricaoEpisodio: 'episodio1,Opcional/episodio2,Opcional',
                descricaoRecurso: "note,ES",
                descricaoExcecao: 'exceção1'
            }).end((err, res) => {
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean', "Servidor retornou erro ao enviar cenario com 2 ou mais episodios");
                expect(res.body.error).to.be.equal(false, "Servidor retornou erro ao enviar cenario com 2 ou mais episodios");
                expect(res.body.data).to.be.an('object');
                done();
            })
        });


    })
});