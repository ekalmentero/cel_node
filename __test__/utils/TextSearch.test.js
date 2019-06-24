const Mockaroo = require('mockaroo');
const TextSearch = require('../../src/utils/TextSearch');

/* Boundary Specs */
beforeEach(() => {
  textSearch = new TextSearch();
});

//Texto A ser procurado deve estar vazio => " "
it('Vector of results must be empty when there is no text', () => {
  let terms = ["foo", "bar"];
  let text = "";
  let { foundWords, proccessedText } = textSearch.findSelectedPatterns(terms, text);
  
  //Assertions
  expect(foundWords).toHaveLength(0);
  expect(foundWords).toEqual([]);
  expect(proccessedText).toEqual("");
});


//Vetor de termos a serem buscados deve estar vazio => []
it('Vector of results must be empty when there is no terms to search and no text', () => {
  let terms = [];
  let text = "";
  let { foundWords, proccessedText } = textSearch.findSelectedPatterns(terms, text);

  //Assertions
  expect(foundWords).toHaveLength(0);
  expect(foundWords).toEqual([]);
  expect(proccessedText).toEqual("");
});

//Vetor de termos a serem buscados deve conter somete um termo => ["foo"]
it('Returns one link when there is one term and a valid text', () => {
  let terms = ["milhão"];
  let text = "Silvio Santos Ipsum valendo um milhão de reaisammm. Qual é a musicamm? Mah você não consegue né Moisés? Você não consegueam. Ma quem quer dinheiroam? Você veio da caravana de ondeammm?"

  let { foundWords } = textSearch.findSelectedPatterns(terms, text);
  expect(foundWords).toHaveLength(1);
  expect(foundWords).toEqual(["milhão"]);
});

//Vetor de termos a serem buscados deve conter dois ou mais termos => ["foo", "bar", ..., ":)"]
it('Returns the exact quantity of searched terms if it is at the text', () => {
  let terms =  ["reaisammm", "musicamm", "Santos"];
  let text = "Silvio Santos Ipsum valendo um milhão de reaisammm. Qual é a musicamm? Mah você não consegue né Moisés? Você não consegueam. Ma quem quer dinheiroam? Você veio da caravana de ondeammm?"

  let { foundWords } = textSearch.findSelectedPatterns(terms, text);
  expect(foundWords).toHaveLength(terms.length);
  expect(foundWords).toEqual(["reaisammm", "musicamm", "Santos"]);
});

// Vetor de termos a serem buscados deve conter mais de um termo composto de uma palavra => ["foo"]
it('Returns one link when there is one term made by a compound words', () => {
  let terms =  ["guarda-chuvas"];
  let text = "Acordei cedo como de costume, o tempo estava feio, meu sorriso lindo! Não hesitei em pegar o meu guarda chuva. Estava certo que choveria forte, o vento fazia muita arruaça lá fora.\
  Saí, preocupado fitei as pessoas que caminhavam rápido pela rua, pensei, a chuva vai pegá-las cedo ou tarde, elas não tinham guarda-chuvas!\
  Andei metros, talvez quilômetros, não prestei atenção nisso, de minuto em minuto bisolhava o céu, estava escuro, as nuvens carregadas, era a promessa do temporal.\
  O vento mostrava-se vezes mais barulhento, vezes mais úmido. Seria chuva de vento com certeza. Num movimento rápido e repentino abri meu guarda chuva e fiz como um teste, se\
  por acaso a chuva viesse sem mandar aviso não me molharia, estava apto a ser ágil. Novamente fitei pessoas que passavam elas estavam despreparadas. A maioria não tinha nem mesmo um guarda-chuvas,\
  as que tinham não possuíam a agilidade necessária para abri-lo no momento exato, pobre futuras pessoas molhados.\
  Andava já havia algum tempo, já estava ansioso demais, as horas corriam e a chuva só esperava uma brecha na minha atenção, não daria esse prazer pra ela. A manhã já se fora, a tarde\
  chegara carregada, o dia tinha virado noite derrepente, eu sabia que a chuva vinha sem demoras. E andava cada vez mais calmo, minha ginga de malandro ficava evidente quando andava sem \
  pressa. Já passava das três, quase tropeço, estava ainda mais escuro, o caminho que eu fazia já era o da volta. A chuva\
  travava comigo um duelo de xadrez (sempre fui um ótimo enxadrista) o céu me encarava e lhe devolvia um olhar maldoso, ele tinha o poder da chuva, eu tinha o poder do guarda chuva.\
  De dentro de casa observo as árvores dançando a dança da chuva, elas estão felizes. A chuva para elas é sinônimo de vida, de alegria. Carreguei por um dia inteiro um guarda chuva \
  nas mãos, pronto para travar uma batalha, mas meu adversário tinha um coração puro, não quis comigo guerrear, eu tinha ódio, ele tinha a paz, ele não precisava de mim pra viver, eu\
  não vivo sem ele. A mão que poderia ter levado uma rosa, houvera sido ocupada pelo guarda chuva, se eu não tivesse tamanho medo da chuva, talvez percebesse o quão tão lindo fora aquele\
  dia feio. A chuva que não veio, me deu uma lição. Às vezes, apenas não fazendo coisas, ajudamos muito mais a alguém achar um caminho de bem do que dando o que elas querem."

  let { foundWords } = textSearch.findSelectedPatterns(terms, text);
  expect(foundWords).toHaveLength(terms.length);
  expect(foundWords).toEqual(["guarda-chuvas"]);
});

// Vetor de termos a serem buscados deve conter mais de um termo composto de duas palavras => ["foo-bar", "foo-bar"]
it('Returns two links when there is 2 terms made by compound words', () => {
  let terms = ["guarda-chuvas", "abri-lo"];
  let text = "Acordei cedo como de costume, o tempo estava feio, meu sorriso lindo! Não hesitei em pegar o meu guarda chuva. Estava certo que choveria forte, o vento fazia muita arruaça lá fora.\
  Saí, preocupado fitei as pessoas que caminhavam rápido pela rua, pensei, a chuva vai pegá-las cedo ou tarde, elas não tinham guarda-chuvas!\
  Andei metros, talvez quilômetros, não prestei atenção nisso, de minuto em minuto bisolhava o céu, estava escuro, as nuvens carregadas, era a promessa do temporal.\
  O vento mostrava-se vezes mais barulhento, vezes mais úmido. Seria chuva de vento com certeza. Num movimento rápido e repentino abri meu guarda chuva e fiz como um teste, se\
  por acaso a chuva viesse sem mandar aviso não me molharia, estava apto a ser ágil. Novamente fitei pessoas que passavam elas estavam despreparadas. A maioria não tinha nem mesmo um guarda-chuvas,\
  as que tinham não possuíam a agilidade necessária para abri-lo no momento exato, pobre futuras pessoas molhados.\
  Andava já havia algum tempo, já estava ansioso demais, as horas corriam e a chuva só esperava uma brecha na minha atenção, não daria esse prazer pra ela. A manhã já se fora, a tarde\
  chegara carregada, o dia tinha virado noite derrepente, eu sabia que a chuva vinha sem demoras. E andava cada vez mais calmo, minha ginga de malandro ficava evidente quando andava sem \
  pressa. Já passava das três, quase tropeço, estava ainda mais escuro, o caminho que eu fazia já era o da volta. A chuva\
  travava comigo um duelo de xadrez (sempre fui um ótimo enxadrista) o céu me encarava e lhe devolvia um olhar maldoso, ele tinha o poder da chuva, eu tinha o poder do guarda chuva.\
  De dentro de casa observo as árvores dançando a dança da chuva, elas estão felizes. A chuva para elas é sinônimo de vida, de alegria. Carreguei por um dia inteiro um guarda chuva \
  nas mãos, pronto para travar uma batalha, mas meu adversário tinha um coração puro, não quis comigo guerrear, eu tinha ódio, ele tinha a paz, ele não precisava de mim pra viver, eu\
  não vivo sem ele. A mão que poderia ter levado uma rosa, houvera sido ocupada pelo guarda chuva, se eu não tivesse tamanho medo da chuva, talvez percebesse o quão tão lindo fora aquele\
  dia feio. A chuva que não veio, me deu uma lição. Às vezes, apenas não fazendo coisas, ajudamos muito mais a alguém achar um caminho de bem do que dando o que elas querem.";

  let { foundWords } = textSearch.findSelectedPatterns(terms, text);
  expect(foundWords).toHaveLength(terms.length);
  expect(foundWords).toEqual(["guarda-chuvas", "abri-lo"]);
});


// Vetor de termos a serem buscados deve conter mais de um termo composto de três palavras => ["foo-bar-baz"]
it('Returns ')
// Função deve retornar como link a última palavra do text

// Função deve retornar link mesmo que as palvras estejam após uma pontuação qualquer

// Montagem de links em textos que possuem palavras em comum

