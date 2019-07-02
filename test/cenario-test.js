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
            chai.request(app).get("/cenario/1").end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean');
                expect(res.body.error).to.be.equal(false);
                expect(res.body.data.Episodios).to.have.lengthOf.at.equal(0);
                expect(res.body.message).to.be.equal("Cenario não existe")
                done();
            })
        });

        it('Verifica cenário com um episodio', (done) => {
            chai.request(app).get("/cenario/1").end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean');
                expect(res.body.error).to.be.equal(false);
                expect(res.body.data.Episodios).to.have.lengthOf.at.equal(1);
                done();
            })
        });

        it('Verifica cenário com 2 ou mais episodios', (done) => {
            chai.request(app).get("/cenario/1").end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean');
                expect(res.body.error).to.be.equal(false);
                expect(res.body.data.Episodios).to.have.lengthOf.at.least(2);
                done();
            })
        });

        it('Verifica cenário sem recursos', (done) => {
            chai.request(app).get("/cenario/1").end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean');
                expect(res.body.error).to.be.equal(true);
                expect(res.body.data.Recursos).to.have.lengthOf.at.equal(0);
                expect(res.body.message).to.be.equal("Cenario não existe")
                done();
            })
        });

        it('Verifica cenário com um recurso', (done) => {
            chai.request(app).get("/cenario/1").end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean');
                expect(res.body.error).to.be.equal(false);
                expect(res.body.data.Recursos).to.have.lengthOf.at.equal(1);
                done();
            })
        });

        it('Verifica cenário com 2 ou mais recursos', (done) => {
            chai.request(app).get("/cenario/1").end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean');
                expect(res.body.error).to.be.equal(false);
                expect(res.body.data.Recursos).to.have.lengthOf.at.least(2);
                done();
            })
        });

        it('Verifica cenário sem atores', (done) => {
            chai.request(app).get("/cenario/1").end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean');
                expect(res.body.error).to.be.equal(false);
                expect(res.body.data.Ators).to.have.lengthOf.at.equal(0);
                expect(res.body.message).to.be.equal("Cenario não existe")
                done();
            })
        });

        it('Verifica cenário com um recurso', (done) => {
            chai.request(app).get("/cenario/1").end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.an('boolean');
                expect(res.body.error).to.be.equal(false);
                expect(res.body.data.Ators).to.have.lengthOf.at.equal(1);
                done();
            })
        });


        it('Verifica cenário com 2 ou mais atores', (done) => {
            chai.request(app).get("/cenario/1").end((err, res) => {
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
                descricaoEpisodio: 'episodio,Opcional',
                descricaoRecurso: 'note',
                descricaoExcecao: 'exceção'
            }).end((err, res) => {
                expect(res).to.have.status(400);
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
                descricaoExcecao: 'exceção'
            }).end((err, res) => {
                expect(res).to.have.status(400);
                done();
            })
        });

        it('Insere cenario sem recurso', (done) => {
            chai.request(app).post("/cenario/").send({
                tituloCenario: 'novidade',
                descricaoContexto: "sem recurso",
                nomeAtor: 'Larissa,Ricardo',
                descricaoEpisodio: 'episodio,Opcional',
                descricaoRecurso: "",
                descricaoExcecao: 'exceção'
            }).end((err, res) => {
                expect(res).to.have.status(400);
                done();
            })
        });

        it('Insere cenario com um recurso', (done) => {
            chai.request(app).post("/cenario/").send({
                tituloCenario: 'novidade',
                descricaoContexto: 'sem recurso',
                nomeAtor: 'Larissa,Ricardo',
                descricaoEpisodio: 'episodio,Opcional',
                descricaoRecurso: 'note',
                descricaoExcecao: 'exceção'
            }).end((err, res) => {
                expect(res).to.have.status(200);
                done();
            })
        });

        it('Insere cenario com dois ou mais recursos', (done) => {
            chai.request(app).post("/cenario/").send({
                tituloCenario: 'novidade',
                descricaoContexto: "sem recurso",
                nomeAtor: 'Larissa,Ricardo',
                descricaoEpisodio: 'episodio,Opcional',
                descricaoRecurso: "note,ES",
                descricaoExcecao: 'exceção'
            }).end((err, res) => {
                expect(res).to.have.status(200);
                done();
            })
        });


        it('Insere cenario sem atores', (done) => {
            chai.request(app).post("/cenario/").send({
                tituloCenario: 'novidade',
                descricaoContexto: "sem arores",
                nomeAtor: '',
                descricaoEpisodio: 'episodio,Opcional',
                descricaoRecurso: "note,ES",
                descricaoExcecao: 'exceção'
            }).end((err, res) => {
                expect(res).to.have.status(400);
                done();
            })
        });

        it('Insere cenario com um ator', (done) => {
            chai.request(app).post("/cenario/").send({
                tituloCenario: 'novidade',
                descricaoContexto: "atores",
                nomeAtor: 'Larissa',
                descricaoEpisodio: 'episodio,Opcional',
                descricaoRecurso: "note",
                descricaoExcecao: 'exceção'
            }).end((err, res) => {
                expect(res).to.have.status(200);
                done();
            })
        });

        it('Insere cenario com dois ou mais atores', (done) => {
            chai.request(app).post("/cenario/").send({
                tituloCenario: 'novidade',
                descricaoContexto: "dois atores",
                nomeAtor: 'Larissa,Ricardo',
                descricaoEpisodio: 'episodio,Opcional',
                descricaoRecurso: "note,ES",
                descricaoExcecao: 'exceção'
            }).end((err, res) => {
                expect(res).to.have.status(200);
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
                descricaoExcecao: 'exceção'
            }).end((err, res) => {
                expect(res).to.have.status(400);
                done();
            })
        });

        it('Insere cenario com um episodio', (done) => {
            chai.request(app).post("/cenario/").send({
                tituloCenario: 'novidade',
                descricaoContexto: "atores",
                nomeAtor: 'Larissa',
                descricaoEpisodio: 'episodio,Opcional',
                descricaoRecurso: "note",
                descricaoExcecao: 'exceção'
            }).end((err, res) => {
                expect(res).to.have.status(200);
                done();
            })
        });

        it('Insere cenario com dois ou mais episodios', (done) => {
            chai.request(app).post("/cenario/").send({
                tituloCenario: 'novidade',
                descricaoContexto: "dois atores",
                nomeAtor: 'Larissa,Ricardo',
                descricaoEpisodio: 'episodio,Opcionalepisodio,Opcional',
                descricaoRecurso: "note,ES",
                descricaoExcecao: 'exceção'
            }).end((err, res) => {
                expect(res).to.have.status(200);
                done();
            })
        });


    })
    describe('Editar', () => {
        it('Editar cenário que não existe', (done) => {
            chai.request(app).put("/cenario/1").end((err, res) => {
                expect(res).to.have.status(404);
                done();
            })
        });

        it('Alterar para um titulo que já existe', (done) => {
            chai.request(app).put("/cenario/").send({
                id_cenario: 1,
                titulo: 'novidade'
            }).end((err, res) => {
                expect(res).to.have.status(400);
                done();
            })
        });

        it('Editar Cenario com campo vazio', (done) => {
            chai.request(app).put("/cenario/").send({
                id_cenario: 1,
                titulo: ''
            }).end((err, res) => {
                expect(res).to.have.status(400);
                done();
            })
        });

        it('Editar Cenario removendo todos os episodios', (done) => {
            chai.request(app).put("/cenario/1/updateSemEp").send({
                tituloCenario: 'teeee',
                descricaoContexto: 'testeee',
                nomeAtor: 'teste,teste',
                descricaoEpisodio: '',
                descricaoRecurso: 'testeste,teststests',
                descricaoExcecao: 'teste'

            }).end((err, res) => {
                expect(res).to.have.status(200);
                done();
            })
        })

        it('Editar Cenario com um episodio', (done) => {
            chai.request(app).put("/cenario/1/updateSemEp").send({
                tituloCenario: 'teeee',
                descricaoContexto: 'testeee',
                nomeAtor: 'teste,teste',
                descricaoEpisodio: 'teste',
                descricaoRecurso: 'testeste,teststests',
                descricaoExcecao: 'teste'

            }).end((err, res) => {
                expect(res).to.have.status(200);
                done();
            })
        })
        it('Editar Cenario com dois ou mais episodios', (done) => {
            chai.request(app).put("/cenario/1/updateSemEp").send({
                tituloCenario: 'teeee',
                descricaoContexto: 'testeee',
                nomeAtor: 'teste,teste',
                descricaoEpisodio: 'teste,teste,teste',
                descricaoRecurso: 'testeste,teststests',
                descricaoExcecao: 'teste'
            }).end((err, res) => {
                expect(res).to.have.status(200);
                done();
            })
        })
        it('Editar Cenario removendo todos os Recursos', (done) => {
            chai.request(app).put("/cenario/1/updateSemRec").send({
                tituloCenario: 'teeee',
                descricaoContexto: 'testeee',
                nomeAtor: 'teste,teste',
                descricaoEpisodio: 'dsadsadsa',
                descricaoRecurso: '',
                descricaoExcecao: 'teste'

            }).end((err, res) => {
                expect(res).to.have.status(200);
                done();
            })
        })

        it('Editar Cenario com um recurso', (done) => {
            chai.request(app).put("/cenario/1/updateSemRec").send({
                tituloCenario: 'teeee',
                descricaoContexto: 'testeee',
                nomeAtor: 'teste,teste',
                descricaoEpisodio: 'teste',
                descricaoRecurso: 'testest',
                descricaoExcecao: 'teste'

            }).end((err, res) => {
                expect(res).to.have.status(200);
                done();
            })
        })
        it('Editar Cenario com dois ou mais recursos', (done) => {
            chai.request(app).put("/cenario/1/updateSemRec").send({
                tituloCenario: 'teeee',
                descricaoContexto: 'testeee',
                nomeAtor: 'teste,teste',
                descricaoEpisodio: 'teste,teste,teste',
                descricaoRecurso: 'testeste,teststests',
                descricaoExcecao: 'teste'
            }).end((err, res) => {
                expect(res).to.have.status(200);
                done();
            })
        })
        it('Editar Cenario removendo todos os atores', (done) => {
            chai.request(app).put("/cenario/1/updateSemAtor").send({
                tituloCenario: 'teeee',
                descricaoContexto: 'testeee',
                nomeAtor: '',
                descricaoEpisodio: 'teste',
                descricaoRecurso: 'testeste,teststests',
                descricaoExcecao: 'teste'

            }).end((err, res) => {
                expect(res).to.have.status(200);
                done();
            })
        })

        it('Editar Cenario com um ator', (done) => {
            chai.request(app).put("/cenario/1/updateSemAtor").send({
                tituloCenario: 'teeee',
                descricaoContexto: 'testeee',
                nomeAtor: 'teste',
                descricaoEpisodio: 'teste',
                descricaoRecurso: 'testeste,teststests',
                descricaoExcecao: 'teste'

            }).end((err, res) => {
                expect(res).to.have.status(200);
                done();
            })
        })
        it('Editar Cenario com dois ou mais atores', (done) => {
            chai.request(app).put("/cenario/1/updateSemAtor").send({
                tituloCenario: 'teeee',
                descricaoContexto: 'testeee',
                nomeAtor: 'teste,teste',
                descricaoEpisodio: 'teste,teste,teste',
                descricaoRecurso: 'testeste,teststests',
                descricaoExcecao: 'teste'
            }).end((err, res) => {
                expect(res).to.have.status(200);
                done();
            })
        })
    })
    describe('Remover', () => {
        it('Remover cenário que não existe', (done) => {
            chai.request(app).delete("/cenario/0").end((err, res) => {
                expect(res).to.have.status(404);
                done();
            })
        });

    })

});