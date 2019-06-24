class TextSearch {
  findSelectedPatterns(patterns, text){
    //Primeiro vou achar os termos de maior tamanho
    let result = [];
    let match;

    this.patterns = patterns.sort( (a, b) => b.length - a.length);//Considera o termo de maior tamanho//Ordenar pela quantidade de palavras
    this.text = text;

    this.patterns.map( pattern => {
      let regex = new RegExp(pattern, 'g');
      while((match = regex.exec(this.text)) != null){
        result.push(pattern); //Adiciono a palavra localizada em um array
        this.text = this.text.replace(regex, `П[${result.length}]`)
        break
      }
    });
    return { foundWords: result, proccessedText: this.text };
  }
}

module.exports = TextSearch;

// "engeneheiro de software especialista"
// "caixa de prego" "politica internacional"
// let terms = ["lado", "política-internacional", "guarda-chuva", "militantes"]

// let text = " Por outro lado, o julgamento imparcial das eventualidades possibilita uma melhor visão global dos modos de operação convencionais. Não obstante, a consulta aos diversos militantes cumpre um papel essencial na formulação das diretrizes de desenvolvimento para o futuro. Assim mesmo, a contínua expansão de nossa atividade exige a precisão e a definição do sistema de participação geral. As experiências acumuladas demonstram que a estrutura atual da organização deve passar por modificações independentemente de todos os recursos funcionais envolvidos. Do mesmo modo, a determinação clara de objetivos garante a contribuição de um grupo importante na determinação das novas proposições. "

// let textSearch = new TextSearch(terms, text);
// let result = textSearch.findSelectedPatterns(terms, text);
// console.log(`Palavras : ${result.map( result => {return result} ) }`);
// console.log(`Texto : ${textSearch.text}`)

