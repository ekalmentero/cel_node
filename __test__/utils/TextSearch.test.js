const mockarooClient = require('../../src/api/mockaroo');
const lorem = require('../../src/utils/loremIpsum');
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
  expect(foundWords).toEqual(terms);
  expect(proccessedText).toEqual(text);
});

//Vetor de termos a serem buscados deve conter somete um termo => ["foo"]
it('Returns one link when there is one term and a valid text', () => {
  let terms = ["milhão"];
  let text = "Silvio Santos Ipsum valendo um milhão de reaisammm. Qual é a musicamm? Mah você não consegue né Moisés? Você não consegueam. Ma quem quer dinheiroam? Você veio da caravana de ondeammm?"

  let { foundWords } = textSearch.findSelectedPatterns(terms, text);
  expect(foundWords).toHaveLength(1);
  expect(foundWords).toEqual(terms);
});

//Vetor de termos a serem buscados deve conter dois ou mais termos => ["foo", "bar", ..., ":)"]
it('Returns the exact quantity of searched terms if it is at the text', () => {
  let terms =  ["reaisammm", "musicamm", "Santos"];
  let text = "Silvio Santos Ipsum valendo um milhão de reaisammm. Qual é a musicamm? Mah você não consegue né Moisés? Você não consegueam. Ma quem quer dinheiroam? Você veio da caravana de ondeammm?"

  let { foundWords } = textSearch.findSelectedPatterns(terms, text);
  expect(foundWords).toHaveLength(terms.length);
  expect(foundWords).toEqual(terms);
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
  expect(foundWords).toEqual(terms);
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
  expect(foundWords).toEqual(terms);
});


// Vetor de termos a serem buscados deve conter mais de um termo composto de três palavras => ["foo-bar-baz"]
it('Returns more than one term when the term is compound by three words', () => {
  let terms = ["guarda corpo", "penso logo existo", "engenheiro de software"];
  let text = "Acordei cedo como de costume, o tempo estava feio, meu sorriso lindo! Não hesitei em pegar o meu guarda chuva. Estava certo que choveria forte, o vento fazia muita arruaça lá fora.\
  Saí, preocupado fitei as pessoas que caminhavam rápido pela rua, pensei, a chuva vai pegá-las cedo ou tarde, elas não tinham guarda corpo!\
  Andei metros, talvez quilômetros, não prestei atenção nisso, de minuto em minuto bisolhava o céu, estava escuro, as nuvens carregadas, era a promessa do temporal.\
  O vento mostrava-se vezes mais barulhento, vezes mais úmido. Seria chuva de vento com certeza. Num movimento rápido e repentino abri meu guarda chuva e fiz como um teste, se\
  por acaso a chuva viesse sem mandar aviso não me molharia, estava apto a ser ágil. Novamente fitei pessoas que passavam elas estavam despreparadas. A maioria não tinha nem mesmo um guarda-chuvas,\
  as que tinham não possuíam a agilidade necessária para abri-lo no momento exato, pobre futuras pessoas molhados.\
  Andava já havia algum tempo, já estava ansioso demais, as horas corriam e a chuva só esperava uma brecha na minha atenção, não daria esse prazer pra ela. A manhã já se fora, a tarde\
  chegara carregada, o dia tinha virado noite derrepente, eu sabia que a chuva vinha sem demoras. E andava cada vez mais calmo, minha ginga de malandro ficava evidente quando andava sem \
  pressa. Já passava das três, quase tropeço, estava ainda mais escuro, o caminho que eu fazia já era o da volta. A chuva\
  travava comigo um duelo de xadrez (sempre fui um ótimo enxadrista) o céu me encarava e lhe devolvia um olhar maldoso, ele tinha o poder da chuva, eu tinha o poder do guarda chuva.\
  De dentro de casa observo as árvores penso logo existo dançando a dança da chuva, elas estão felizes. A chuva para elas é sinônimo de vida, de alegria. Carreguei por um dia inteiro um guarda chuva \
  nas mãos, pronto para travar uma batalha, mas meu adversário tinha um coração puro, não quis comigo guerrear, eu tinha ódio, ele tinha a paz, ele não precisava de mim pra viver, eu\
  não vivo sem ele. A mão que poderia ter levado uma rosa, houvera sido ocupada pelo guarda chuva, se eu não tivesse tamanho medo da chuva, talvez percebesse o quão tão lindo fora aquele\
  dia feio. A chuva que não veio, me deu uma lição. Às vezes, apenas não engenheiro de software fazendo coisas, ajudamos muito mais a alguém achar um caminho de bem do que dando o que elas querem.";

  let { foundWords } = textSearch.findSelectedPatterns(terms, text);
  expect(foundWords).toHaveLength(terms.length);
  expect(foundWords).toEqual(terms);
})
// Função deve retornar como link a última palavra do texto
it('Returns the last term of the text when it is matched by the term', () => {
  let terms = ["last term"];
  let text = "Acordei cedo como de costume, o tempo estava feio, meu sorriso lindo! Não hesitei em pegar o meu guarda chuva. Estava certo que choveria forte, o vento fazia muita arruaça lá fora.\
  Saí, preocupado fitei as pessoas que caminhavam rápido pela rua, pensei, a chuva vai pegá-las cedo ou tarde, elas não tinham guarda corpo!\
  Andei metros, talvez quilômetros, não prestei atenção nisso, de minuto em minuto bisolhava o céu, estava escuro, as nuvens carregadas, era a promessa do temporal.\
  O vento mostrava-se vezes mais barulhento, vezes mais úmido. Seria chuva de vento com certeza. Num movimento rápido e repentino abri meu guarda chuva e fiz como um teste, se\
  por acaso a chuva viesse sem mandar aviso não me molharia, estava apto a ser ágil. Novamente fitei pessoas que passavam elas estavam despreparadas. A maioria não tinha nem mesmo um guarda-chuvas,\
  as que tinham não possuíam a agilidade necessária para abri-lo no momento exato, pobre futuras pessoas molhados.\
  Andava já havia algum tempo, já estava ansioso demais, as horas corriam e a chuva só esperava uma brecha na minha atenção, não daria esse prazer pra ela. A manhã já se fora, a tarde\
  chegara carregada, o dia tinha virado noite derrepente, eu sabia que a chuva vinha sem demoras. E andava cada vez mais calmo, minha ginga de malandro ficava evidente quando andava sem \
  pressa. Já passava das três, quase tropeço, estava ainda mais escuro, o caminho que eu fazia já era o da volta. A chuva\
  travava comigo um duelo de xadrez (sempre fui um ótimo enxadrista) o céu me encarava e lhe devolvia um olhar maldoso, ele tinha o poder da chuva, eu tinha o poder do guarda chuva.\
  De dentro de casa observo as árvores penso logo existo dançando a dança da chuva, elas estão felizes. A chuva para elas é sinônimo de vida, de alegria. Carreguei por um dia inteiro um guarda chuva \
  nas mãos, pronto para travar uma batalha, mas meu adversário tinha um coração puro, não quis comigo guerrear, eu tinha ódio, ele tinha a paz, ele não precisava de mim pra viver, eu\
  não vivo sem ele. A 10%mão que poderia ter levado uma rosa, houvera sido ocupada pelo guarda chuva, se eu não tivesse tamanho medo da chuva, talvez percebesse o quão tão lindo fora aquele\
  dia feio. A chuva que não veio, me deu uma lição. Às vezes, apenas não engenheiro de software fazendo coisas, ajudamos muito mais a alguém achar um caminho de bem do que dando o que elas querem  last term.";

  let { foundWords } = textSearch.findSelectedPatterns(terms, text);
  expect(foundWords).toHaveLength(terms.length);
  expect(foundWords).toEqual(terms);
})


// Função deve retornar link mesmo que as palvras estejam após uma pontuação qualquer
it('Returns a link even if the term is located after a charecter', () => {
  let terms = ["mão"];
  let text = "Acordei cedo como de costume, o tempo estava feio, meu sorriso lindo! Não hesitei em pegar o meu guarda chuva. Estava certo que choveria forte, o vento fazia muita arruaça lá fora.\
  Saí, preocupado fitei as pessoas que caminhavam rápido pela rua, pensei, a chuva vai pegá-las cedo ou tarde, elas não tinham guarda corpo!\
  Andei metros, talvez quilômetros, não prestei atenção nisso, de minuto em minuto bisolhava o céu, estava escuro, as nuvens carregadas, era a promessa do temporal.\
  O vento mostrava-se vezes mais barulhento, vezes mais úmido. Seria chuva de vento com certeza. Num movimento rápido e repentino abri meu guarda chuva e fiz como um teste, se\
  por acaso a chuva viesse sem mandar aviso não me molharia, estava apto a ser ágil. Novamente fitei pessoas que passavam elas estavam despreparadas. A maioria não tinha nem mesmo um guarda-chuvas,\
  as que tinham não possuíam a agilidade necessária para abri-lo no momento exato, pobre futuras pessoas molhados.\
  Andava já havia algum tempo, já estava ansioso demais, as horas corriam e a chuva só esperava uma brecha na minha atenção, não daria esse prazer pra ela. A manhã já se fora, a tarde\
  chegara carregada, o dia tinha virado noite derrepente, eu sabia que a chuva vinha sem demoras. E andava cada vez mais calmo, minha ginga de malandro ficava evidente quando andava sem \
  pressa. Já passava das três, quase tropeço, estava ainda mais escuro, o caminho que eu fazia já era o da volta. A chuva\
  travava comigo um duelo de xadrez (sempre fui um ótimo enxadrista) o céu me encarava e lhe devolvia um olhar maldoso, ele tinha o poder da chuva, eu tinha o poder do guarda chuva.\
  De dentro de casa observo as árvores penso logo existo dançando a dança da chuva, elas estão felizes. A chuva para elas é sinônimo de vida, de alegria. Carreguei por um dia inteiro um guarda chuva \
  nas mãos, pronto para travar uma batalha, mas meu adversário tinha um coração puro, não quis comigo guerrear, eu tinha ódio, ele tinha a paz, ele não precisava de mim pra viver, eu\
  não vivo sem ele. A 10%mão que poderia ter levado uma rosa, houvera sido ocupada pelo guarda chuva, se eu não tivesse tamanho medo da chuva, talvez percebesse o quão tão lindo fora aquele\
  dia feio. A chuva que não veio, me deu uma lição. Às vezes, apenas não engenheiro de software fazendo coisas, ajudamos muito mais a alguém achar um caminho de bem do que dando o que elas querem  last term.";

  let { foundWords } = textSearch.findSelectedPatterns(terms, text);
  expect(foundWords).toHaveLength(terms.length);
  expect(foundWords).toEqual(terms);
})

// Montagem de links em textos que possuem palavras em comum
it('Returns links even the terms are made with words in comon', () => {
  let terms = ["engenheiro", "software", "engenheiro de software", "engenheiro de software experiente"];
  let text = "Effects present engenheiro letters inquiry no an engenheiro de software removed or friends. Desire behind latter me though in\
  Supposing engenheiro de software experiente shameless am he engrossed software up additions. My possible engenheiro de software experiente peculiar together to. Desire so better am cannot engenheiro de software mais ou menos";

  let { foundWords } = textSearch.findSelectedPatterns(terms, text);
  expect(foundWords).toHaveLength(terms.length);
  expect(foundWords).toEqual(terms);
});

//Cobertura - Tamanho

it('Quando eu tenho 1 termo e um texto de 30 palavras e contém o termo devo ter 1 foundWord', () => {
  
  let terms = ["Ford"];
  let text = "Lorem ipsum fusce imperdiet lacus pharetra aliquam non pulvinar, sagittis arcu mollis primis etiam diam. litora non gravida orci at malesuada ac feugiat class, etiam metus augue curabitur eros etiam."
  text = text.concat(` ${terms.termo}`);

  let { foundWords } = textSearch.findSelectedPatterns([terms.termo], text);

  //Assertions
  expect(foundWords).toEqual([terms.termo]);
  expect(foundWords.length).toEqual(1);
});

it('Quando eu tenho 1 termo e um texto de tamanho 30 palavras e não contém o termo devo 0 foundWord', () => {

  let terms = ["Ford"];
  let text = "Lorem ipsum fusce imperdiet lacus pharetra aliquam non pulvinar, sagittis arcu mollis primis etiam diam. litora non gravida orci at malesuada ac feugiat class, etiam metus augue curabitur eros etiam."

  let { foundWords } = textSearch.findSelectedPatterns([terms.termo], text);
  //Assertions
  expect(foundWords).not.toEqual([terms.termo]);
  expect(foundWords.length).not.toEqual(1);
});

it('Quando eu tenho 10 termos e um texto de tamanho 40 e contém o termo devo 10 foundWords', () => {

  let terms = ["termo", "Ford", "Cadillac", "GMC", "Dodge", "Mercedes-Benz", "Toyota", "Oldsmobile", "Nissan", "Rolls-Royce"]
  let text = "Lorem ipsum lacus phasellus ligula maecenas per dapibus, varius aenean urna tincidunt varius vivamus, quisque morbi porta ullamcorper vel vehicula. viverra morbi nisl lobortis torquent ullamcorper non sociosqu, feugiat fames vivamus cursus id inceptos, nostra etiam orci eleifend porta felis.";
  terms.forEach( term => {text = text.concat(` ${term} `)});

  let { foundWords } = textSearch.findSelectedPatterns(terms, text);

  //Assertions
  expect(foundWords.length).toEqual(10);
});

it("Quando eu tenho 10 termos e um texto de 40 palavras e não contém todos termos devo menos de 10 foundWords", () => {

  let terms = ["termo", "Ford", "Cadillac", "GMC", "Dodge", "Mercedes-Benz", "Toyota", "Oldsmobile", "Nissan", "Rolls-Royce"]
  let text = "Lorem ipsum lacus phasellus ligula maecenas per dapibus, varius aenean urna tincidunt varius vivamus, quisque morbi porta ullamcorper vel vehicula. viverra morbi nisl lobortis torquent ullamcorper non sociosqu, feugiat fames vivamus cursus id inceptos, nostra etiam orci eleifend porta felis.";

  let { foundWords } = textSearch.findSelectedPatterns(terms, text);

  //Assertions
  expect(foundWords.length).toBeLessThan(10);
});

it("Quando eu tenho 30 termos e um texto de 50 palavras e contém todos os termos devo ter 30 foundWords", () => {

  let terms = ["Ascort",
  "Austin",
  "Bush Ranger",
  "Australian Six",
  "Australis",
  "Blade",
  "Buchanan",
  "Buckle",
  "Caldwell Vale",
  "Cheetah",
  "Chrysler",
  "FPV",
  "Ford",
  "Goggomobil",
  "Giocattolo",
  "Holden",
  "HSV",
  "Ilinga",
  "Hartnett",
  "Leyland",
  "Lonsdale",
  "Lloyd-Hartnett",
  "Kaditcha",
  "Mitsubishi",
  "Morris",
  "Nissan",
  "Pellandini",
  "Purvis Eureka",
  "Southern Cross",
  "Shrike"];
  let text = "Lorem ipsum placerat in augue ac cubilia nulla, praesent porta purus proin nulla morbi, pharetra pulvinar imperdiet purus sed senectus ";

  terms.forEach( term => {text = text.concat(` ${term} `)});

  let { foundWords } = textSearch.findSelectedPatterns(terms, text);

  //Assertions
  expect(foundWords.length).toEqual(30);
});

it("Quando eu tenho 30 termos e um texto de 50 palavras e não contém todos os termos devo ter menos de 30 foundWords", () => {
  let terms = ["Ascort",
  "Austin",
  "Bush Ranger",
  "Australian Six",
  "Australis",
  "Blade",
  "Buchanan",
  "Buckle",
  "Caldwell Vale",
  "Cheetah",
  "Chrysler",
  "FPV",
  "Ford",
  "Goggomobil",
  "Giocattolo",
  "Holden",
  "HSV",
  "Ilinga",
  "Hartnett",
  "Leyland",
  "Lonsdale",
  "Lloyd-Hartnett",
  "Kaditcha",
  "Mitsubishi",
  "Morris",
  "Nissan",
  "Pellandini",
  "Purvis Eureka",
  "Southern Cross",
  "Shrike"];
  let text = "Lorem ipsum nostra interdum consequat amet vivamus facilisis hendrerit tortor, ullamcorper quam bibendum lacus vivamus non massa hendrerit dictumst, nisl mattis suspendisse conubia sagittis platea cursus proin. nec ipsum sapien curabitur justo vivamus, aenean sem tincidunt sapien volutpat, malesuada tempus eros suscipit. sed aliquet eros interdum ipsum, viverra tempor gravida ";
  
  let { foundWords } = textSearch.findSelectedPatterns(terms, text);

  //Assertions
  expect(foundWords.length).toBeLessThan(30);
});

it("Quando eu tenho 50 termos e um texto de tamanho 70 e contém todos os termos devo ter 50 foundWords", ()=> {
  let terms = ["Ascort",
  "Austin",
  "Bush Ranger",
  "Australian Six",
  "Australis",
  "Blade",
  "Buchanan",
  "Buckle",
  "Caldwell Vale",
  "Cheetah",
  "Chrysler",
  "FPV",
  "Ford",
  "Goggomobil",
  "Giocattolo",
  "Holden",
  "HSV",
  "Ilinga",
  "Hartnett",
  "Leyland",
  "Lonsdale",
  "Lloyd-Hartnett",
  "Kaditcha",
  "Mitsubishi",
  "Morris",
  "Nissan",
  "Pellandini",
  "Purvis Eureka",
  "Southern Cross",
  "Shrike",
  "Statesman",
  "Tarrant",
  "Toyota Australian production finished",
  "Zeta",
  "Birchfield",
  "Bolwell",
  "Bullet",
  "Carbontech",
  "Classic Glass",
  "Daytona",
  "Devaux",
  "DRB",
  "E-Vade",
  "Elfin",
  "Finch",
  "Joss",
  "Nota",
  "Pioneer",
  "PRB",
  "Python"]
  let text = "Lorem ipsum nullam blandit libero morbi elementum purus, molestie mollis mattis cursus diam imperdiet, elit tincidunt habitant ac lacus curabitur "
  terms.forEach( term => {text = text.concat(` ${term} `)});
  let { foundWords } = textSearch.findSelectedPatterns(terms, text);

  //Assertions
  expect(foundWords.length).toEqual(50);
})

it("Quando eu tenho 50 termos e um texto de tamanho 70 e não contém todos os termos devo ter menos 50 foundWords", () => {
  let terms = ["Ascort",
"Austin",
"Bush Ranger",
"Australian Six",
"Australis",
"Blade",
"Buchanan",
"Buckle",
"Caldwell Vale",
"Cheetah",
"Chrysler",
"FPV",
"Ford",
"Goggomobil",
"Giocattolo",
"Holden",
"HSV",
"Ilinga",
"Hartnett",
"Leyland",
"Lonsdale",
"Lloyd-Hartnett",
"Kaditcha",
"Mitsubishi",
"Morris",
"Nissan",
"Pellandini",
"Purvis Eureka",
"Southern Cross",
"Shrike",
"Statesman",
"Tarrant",
"Toyota Australian production finished",
"Zeta",
"Birchfield",
"Bolwell",
"Bullet",
"Carbontech",
"Classic Glass",
"Daytona",
"Devaux",
"DRB",
"E-Vade",
"Elfin",
"Finch",
"Joss",
"Nota",
"Pioneer",
"PRB",
"Python"]
let text = "Lorem ipsum nullam blandit libero morbi elementum purus, molestie mollis mattis cursus diam imperdiet, elit tincidunt habitant ac lacus curabitur ";

let { foundWords } = textSearch.findSelectedPatterns(terms, text);

//Assertions
expect(foundWords.length).toBeLessThan(50);
});


it("Quando eu tenho 70 termos e um texto de tamanho 90 e contém todos os termos devo ter 70 foundWords", () => {
  let terms = ["Ascort",
  "Austin",
  "Bush Ranger",
  "Australian Six",
  "Australis",
  "Blade",
  "Buchanan",
  "Buckle",
  "Caldwell Vale",
  "Cheetah",
  "Chrysler",
  "FPV",
  "Ford",
  "Goggomobil",
  "Giocattolo",
  "Holden",
  "HSV",
  "Ilinga",
  "Hartnett",
  "Leyland",
  "Lonsdale",
  "Lloyd-Hartnett",
  "Kaditcha",
  "Mitsubishi",
  "Morris",
  "Nissan",
  "Pellandini",
  "Purvis Eureka",
  "Southern Cross",
  "Shrike",
  "Statesman",
  "Tarrant",
  "Toyota Australian production finished",
  "Zeta",
  "Birchfield",
  "Bolwell",
  "Bullet",
  "Carbontech",
  "Classic Glass",
  "Daytona",
  "Devaux",
  "DRB",
  "E-Vade",
  "Elfin",
  "Finch",
  "Joss",
  "Nota",
  "Pioneer",
  "PRB",
  "Python",
  "Tomcar",
  "Anasagasti (1911–1915)",
  "Andino (1967–1973)",
  "Hispano-Argentina (1925–1953)",
  "Eniak (1983–1989)",
  "Industrias Aeronáuticas y Mecánicas del Estado"
  "Industrias Eduardo Sal-Lari",
  "Industrias Kaiser Argentina",
  "Adelmo",
  "ASA",
  "de Carlo",
  "Feresa",
  "Koller",
  "Oliva",
  "Winograd",
  "NAZ",
  "Ganja Machine Factory",
  "AzSamand",
  "Khazar",
  "Apal"],

})

//Quando eu tenho 70 termos e um texto de tamanho 90 e não contém todos os termos devo ter menos 70 foundWords

//Quando eu tenho 90 termos e um texto de tamanho 110 e contém todos os termos devo ter 90 foundWords

//Quando eu tenho 90 termos e um texto de tamanho 110 e não contém todos os termos devo ter menos 90 foundWords

//Quando eu tenho 110 termos e um texto de tamanho 130 e contém todos os termos devo ter 110 foundWords

//Quando eu tenho 110 termos e um texto de tamanho 130 e não contém todos os termos devo ter menos 110 foundWords

//Quando eu tenho 130 termos e um texto de tamanho 150 e contém todos os termos devo ter 130 foundWords

//Quando eu tenho 130 termos e um texto de tamanho 150 e não contém todos os termos devo ter menos 130 foundWords

//Quando eu tenho 150 termos e um texto de tamanho 170 e contém todos os termos devo ter 150 foundWords

//Quando eu tenho 150 termos e um texto de tamanho 170 e não contém todos os termos devo ter menos 150 foundWords

//Quando eu tenho 170 termos e um texto de tamanho 190 e contém todos os termos devo ter 170 foundWords

//Quando eu tenho 170 termos e um texto de tamanho 190 e não contém todos os termos devo ter menos 170 foundWords

//Quando eu tenho 190 termos e um texto de tamanho 210 e contém todos os termos devo ter 190 foundWords

//Quando eu tenho 190 termos e um texto de tamanho 210 e não contém todos os termos devo ter menos 190 foundWords

