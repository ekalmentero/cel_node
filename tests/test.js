// Import the dependencies for testing
var chai = require('chai');
chai.use (require ('chai-json-schema')) ;
//var simbolo_controller = require ('../controllers/simbolos')
var models  = require('../models/index');
var simbolo_controller  = require('../controllers/simbolos');
var express = require('express');
var router  = express.Router();
//import chai from 'chai';
var chaiHttp = require('chai-http');
var app = require('../app');
// Configure chai
chai.use(chaiHttp);
chai.should();
var expect = chai.expect;
var fs = require("fs");
var jsonData = '';
fs.readFile("./mock.json" , "utf8", function(err, data){
  if(err){
    return console.log("Erro ao ler arquivo", err);
  }
  
   jsonData = JSON.parse(data); // faz o parse para json
   return jsonData;
})

let campos_json = fs.readFileSync("./mock.json" , "utf8")
//console.log(jsonData);
let campos_vazios = {
    'id':'1',
    'nome':'',
    'nocao':'',
    'impacto':'',
    'classificacao':'',
}
let simbolo_semsinonimos = {
    'id':'653',
    'nome':'hahahuhu',
    'nocao':'simbolote',
    'impacto':'simbolote',
    'classificacao':'simbolote'
}
let simbolo_umsinonimo = {
    'id':'10',
    'nome':'simbolote',
    'nocao':'simbolote',
    'impacto':'simbolote',
    'classificacao':'simbolote',
    'nomeSinonimo':'simbolote'
}
let simbolo_tressinonimos= {
    'id':'1817',
    'nome':'nomesimb',
    'nocao':'sibtetres',
    'impacto':'simbtetres',
    'classificacao':'simbotetres',
    'nomeSinonimo':'nomesimbu,nomesimbd,nomesimbt',
}
let texto_maior={
    'id':'1',
    'nome':'wertyfgtghhyggggggggggggghhhhhhhhhh',
    'nocao':'jfhfnjvgggggggggggggggggggggg',
    'impacto':'lkhfhhggggggggggggggggggggggggggg',
    'classificacao':'dvvvvvvvvvvvvvvvvvvvvvvvvvvgetdg' 
}
let texto_menor={
    'id':'1',
    'nome':'k',
    'nocao':'n',
    'impacto':'mn',
    'classificacao':'mm'
}
let carcteres_invalidos={
    'id':'1',
    'nome':'er4r4',
    'nocao':'frt67h',
    'impacto':'tfghhj@',
    'classificacao':'dftggdft5'
}
let nome_duplicado = {
    'id':'1',
    'nome':'simbolo',
    'nocao':'hhghhy',
    'impacto':'nnjnjnj',
    'classificacao':'mnmvcf'
}
let simbolo_inexistente = {
    'id':'10000000000',
    'nome':'jjjj',
    'nocao':'ggggg',
    'impacto':'tttttt',
    'classificacao':'nnnnnn'
}
describe("Inserir", () => {
    describe("novo simbolo", () => {
    it("Cadastrar novo simbolo (json)", () => {
        chai.request(app)
        .post(`/simbolos/create`)
        .send(campos_json)
        .then( function (res) {
            //console.log("json ao cadastrar:",campos_json);
             res.should.have.status(200);
        })
        .catch(function (err) {
            throw err;
        });
    });
    });
    it("Cadastrar novo simbolo (campos vazios)", () => {
        describe("novo simbolo", () => {
        chai.request(app)
        .post(`/simbolos/create`)
        .send(campos_vazios)
        .then( function (res) {
             res.should.have.status(500);
        })
        .catch(function (err) {
            throw err;
        });
    });
    });
    describe("novo simbolo", () => {
    it("Cadastrar novo simbolo (sem sinônimos)", () => {
        chai.request(app)
        .post(`/simbolos/create`)
        .send(simbolo_semsinonimos)
        .then( function (res) {
             res.should.have.status(200);
        })
        .catch(function (err) {
            throw err;
        });
    });
    });
    describe("novo simbolo", () => {
    it("Cadastrar novo simbolo (um sinônimo)", () => {
        chai.request(app)
        .post(`/simbolos/create`)
        .send(simbolo_umsinonimo)
        .then( function (res) {
             res.should.have.status(200);
        })
        .catch(function (err) {
            throw err;
        });
    });
    });
    describe("novo simbolo", () => {
    it("Cadastrar novo simbolo (três sinônimo)", () => {
        chai.request(app)
        .post(`/simbolos/create`)
        .send(simbolo_tressinonimos)
        .then( function (res) {
             res.should.have.status(200);
        })
        .catch(function (err) {
            throw err;
        });
    });
    });
    describe("novo simbolo", () => {
    it("Cadastrar novo simbolo (texto menor que o limite)", () => {
        chai.request(app)
        .post(`/simbolos/create`)
        .send(texto_menor)
        .then( function (res) {
             res.should.have.status(500);
        }).catch(function (err) {
            throw err;
        });
    });
    });
    describe("novo simbolo", () => {
    it("Cadastrar novo simbolo (texto maior que o limite)", () => {
        chai.request(app)
        .post(`/simbolos/create`)
        .send({texto_maior})
        .then( function (res) {
             res.should.have.status(500);
        })
        .catch(function (err) {
            throw err;
        });
    });
    });
    describe("novo simbolo", () => {
    it("Cadastrar novo simbolo (caracteres inválidos)", () => {
        chai.request(app)
        .post(`/simbolos/create`)
        .send(carcteres_invalidos)
        .then( function (res) {
             res.should.have.status(500);
        })
        .catch(function (err) {
            throw err;
        });
    });
    });
    describe("novo simbolo", () => {    
    it("Cadastrar novo simbolo (nomes duplicados)",  () => {
        chai.request(app)
        .post(`/simbolos/create`)
        .send(nome_duplicado)
        .then( function (res) {
             res.should.have.status(500);
        })
        .catch(function (err) {
            //console.log("Mensagem ao duplicados:", err.message.slice(17, 60));
            throw err;
        });
    });   
    });    
});
describe("Ler", () => {
    describe("Ler simbolo", () => {    
    it("Busca por registro inexistente ", () => {
        chai.request(app)
        .get(`/simbolos/`+simbolo_inexistente.id+`/get`)
        .then( function (res) {
             res.should.have.status(200);
        })
        .catch(function (err) {
            //console.log("Mensagem ao ler:", err.message.slice(17, 60));
            throw err;
        });
    });        
    });
    describe("Ler simbolo", () => {    
    it("Busca por registro sem sinônimos ", () => {
        chai.request(app)
        .get(`/simbolos/`+simbolo_semsinonimos.id+`/get`)
        .then( function (res) {
             res.should.have.status(200);
        })
        .catch(function (err) {
            //console.log("Mensagem ao ler:", err.message.slice(17, 60));
            throw err;
        });
    });        
    });
    describe("Ler simbolo", () => {    
    it("Busca por registro com um sinônimo ", () => {
        chai.request(app)
        .get(`/simbolos/`+simbolo_umsinonimo.id+`/get`)
        .then( function (res) {
             res.should.have.status(200);
        })
        .catch(function (err) {
            //console.log("Mensagem ao ler:", err.message.slice(17, 60));
            throw err;
        });
    }); 
    });
    describe("Ler simbolo", () => {    
    it("Busca por registro com três sinônimos ", () => {
        chai.request(app)
        .get(`/simbolos/`+simbolo_tressinonimos.id+`/get`)
        .then( function (res) {
             res.should.have.status(200);
        })
        .catch(function (err) {
            //console.log("Mensagem ao ler:", err.message.slice(17, 60));
            throw err;
        });    
    });    
    });
    describe("Ler simbolo", () => {    
    it("Ler simbolo (json)", () => {
        chai.request(app)
        .get(`/simbolos/`+campos_json.id+`/get`)
        .send(campos_json)
        .then( function (res) {
            //console.log("json ao cadastrar:",campos_json);
             res.should.have.status(200);
        })
        .catch(function (err) {
            throw err;
        });
    });
    });
});
describe("Editar", () => {
    describe("Editar simbolo", () => {    
    it("Alterar simbolo (campos vazios)", () => {
        chai.request(app)
        .put(`/simbolos/`+campos_vazios.id+`/update`)
        .send(campos_vazios)
        .then( function (res) {
             res.should.have.status(500);
         })
         .catch(function (err) {
            //console.log("Mensagem ao editar:", err.message.slice(17, 60));
            throw err;
         });
    });
    });
    describe("Editar simbolo", () => {    
    it("Alterar simbolo, removendo todos os sinônimos", () => {
        chai.request(app)
        .delete(`/simbolos/`+simbolo_tressinonimos.id+`/delete_todos_sinonimos`)
        .then( function (res) {
             res.should.have.status(200);
        })
        .catch(function (err) {
           // console.log("Mensagem ao remover:", err.message.slice(17, 60));
            throw err;
        });
    });
    });
    describe("Editar simbolo", () => {    
    it("Alterar simbolo (texto menor que o limite)", () => {
        chai.request(app)
        .put(`/simbolos/`+texto_menor.id+`/update`)
        .send(texto_menor)
        .then( function (res) {
             res.should.have.status(500);
         })
         .catch(function (err) {
            //console.log("Mensagem ao editar:", err.message.slice(17, 60));
            throw err;
         });
    });
    });
    describe("Editar simbolo", () => {    
    it("Alterar simbolo (texto maior que o limite)", () => {
        chai.request(app)
        .put(`/simbolos/`+texto_maior.id+`/update`)
        .send(texto_maior)
        .then( function (res) {
             res.should.have.status(500);
         })
         .catch(function (err) {
            //console.log("Mensagem ao editar:", err.message.slice(17, 60));
            throw err;
         });
    });
    });
    describe("Editar simbolo", () => {    
    it("Alterar simbolo (caracteres inválidos)", () => {
        chai.request(app)
        .put(`/simbolos/`+carcteres_invalidos.id+`/update`)
        .send(carcteres_invalidos)
        .then( function (res) {
             res.should.have.status(500);
         })
         .catch(function (err) {
            //console.log("Mensagem ao editar:", err.message.slice(17, 60));
            throw err;
         });
    });
    });
    describe("Editar simbolo", () => {    
    it("Alterar simbolo (nomes duplicados)", () => {
        chai.request(app)
        .put(`/simbolos/`+nome_duplicado.id+`/update`)
        .send(nome_duplicado)
        .then( function (res) {
             res.should.have.status(500);
         })
         .catch(function (err) {
            //console.log("Mensagem ao editar:", err.message.slice(17, 60));
            throw err;
         });
    });
    });
    describe("Editar simbolo", () => {    
    it("Alterar simbolo que não existe", () => {
        chai.request(app)
        .put(`/simbolos/`+simbolo_inexistente.id+`/update`)
        .send(simbolo_inexistente)
        .then( function (res) {
             res.should.have.status(200);
         })
         .catch(function (err) {
            //console.log("Mensagem ao editar:", err.message.slice(17, 60));
            throw err;
         });
    });
    });
    describe("Editar simbolo", () => {    
    it("Alterar simbolo (json)", () => {
        chai.request(app)
        .put(`/simbolos/`+campos_json.id+`/update`)
        .send(campos_json)
        .then( function (res) {
            //console.log("json ao cadastrar:",campos_json);
             res.should.have.status(200);
        })
        .catch(function (err) {
            throw err;
        });
    });
    });
    
})
describe("Remover", () => {
    describe("Remover simbolo", () => {    
    it("Remover simbolo que não existe", () => {
        chai.request(app)
        .delete(`/simbolos/`+simbolo_inexistente.id+`/delete`)
        .then( function (res) {
             res.should.have.status(200);
        })
        .catch(function (err) {
            //console.log("Mensagem ao remover:", err.message.slice(17, 60));
            throw err;
        });
    });
    });
    describe("Remover simbolo", () => {    
    it("Remover simbolo com um sinônimo", () => {
        chai.request(app)
        .delete(`/simbolos/`+simbolo_umsinonimo.id+`/delete`)
        .then( function (res) {
             res.should.have.status(200);
        })
        .catch(function (err) {
            //console.log("Mensagem ao remover:", err.message.slice(17, 60));
            throw err;
        });
    });
    });
    /*describe("Remover simbolo", () => {    
    it("Remover simbolo com três sinônimos", () => {
        chai.request(app)
        .delete(`/simbolos/`+simbolo_tressinonimos.id+`/delete`)
        .then( function (res) {
             res.should.have.status(200);
        })
        .catch(function (err) {
            //console.log("Mensagem ao remover:", err.message.slice(17, 60));
            throw err;
        });
    });
    });*/
    describe("Remover simbolo", () => {    
    it("Remover simbolo sem sinônimos", () => {
        chai.request(app)
        .delete(`/simbolos/`+simbolo_semsinonimos.id+`/delete`)
        .then( function (res) {
             res.should.have.status(200);
        })
        .catch(function (err) {
            //console.log("Mensagem ao remover:", err.message.slice(17, 60));
            throw err;
        });
    });
    });
    describe("Remover simbolo", () => {    
    it("Remover simbolo (json)", () => {
        chai.request(app)
        .delete(`/simbolos/`+campos_json.id+`/delete`)
        .send(campos_json)
        .then( function (res) {
            //console.log("json ao cadastrar:",campos_json);
             res.should.have.status(200);
        })
        .catch(function (err) {
            throw err;
        });
    });
    });
});