function botaoBLIP(){
    new BlipChat()
        .withAppKey('ZnVuY29lc2Vqb2dvczo5ZjgyNDA2OS1lZDNkLTQwZmMtYTZkNi0yMzkxNjY0ZjQzYTE=')
        .withButton({"color":"#0096fa","icon":""})
        .withCustomCommonUrl('https://shahdad-dana-m34ud.chat.blip.ai/')
        .build()
}

function criarCard(titulo, descricao, imagem, href) {
    const cardHtml = `
    <div class="col-md-4 col-sm-4">
        <div class="feature-center animate-box" data-animate-effect="fadeIn">
            <span class="icon">
                <img class="iconeRedondo" src="${imagem}">
            </span>
            <h3>${titulo}</h3>
            <p>${descricao}</p>
            <p><a href="${href}" class="btn btn-primary btn-outline">Acessar</a></p>
        </div>
    </div>
    ` 
    return cardHtml;
}

function adicionarCards(elementoMae) {
    const linhaCards = document.getElementById(elementoMae)
    
    // Nuvem
    linhaCards.innerHTML += criarCard(
        "Nuvem de Palavras",
        "Cria uma nuvem de palavras a partir de um texto",
        "images/nuvem.png",
        "nuvem/nuvem.html")

    // Trivia
    linhaCards.innerHTML += criarCard(
        "Gerador de Trivia",
        "Gera perguntas aleatórias sobre trivialidades",
        "images/geradorTrivia.jpeg",
        "trivia/geradorDeTrivia.html")

    // QR
    linhaCards.innerHTML += criarCard(
        "Leitor de Código QR",
        "Apresenta o valor do código QR, inclusive se for um WIFI",
        "images/codigoQR.jpeg",
        "leitorQr/leitorQr.html")

    // Ponteiros
    linhaCards.innerHTML += criarCard(
        "Jogo dos Ponteiros",
        "Jogo desenvolvido para experimentação de conceitos em IA",
        "images/ponteiroIcone.png",
        "jogoPonteiros/jogoDosPonteiros.html")

    // Contador
    linhaCards.innerHTML += criarCard(
        "Contador Estatístico",
        "Ferramenta para auxiliar pesquisas de estatística",
        "images/contador.jpeg",
        "contadorDePesquisa/index.html")

    /*
    // Envoltória
    linhaCards.innerHTML += criarCard(
        "Envoltória Convexa",
        "Alguns métodos para se calcular uma envoltória convexa",
        "images/envoltoria.png",
        "envoltoriaConvexa.html")

    // Classificador
    linhaCards.innerHTML += criarCard(
        "Classificador de Comentários",
        "Categoriza comentários de redes sociais, avalia nível de toxicidade",
        "images/classificador.jpeg",
        "classificador/classificadorArquivos.html")

    // Jogos
    linhaCards.innerHTML += criarCard(
        "Jogos",
        "Jogos simples para implementar algoritmos complexos",
        "images/joystick.jpeg",
        "#")

    // Projetos
    linhaCards.innerHTML += criarCard(
        "Projetos",
        "Coletânea de mini projetos feitos para experimentação e provas de conceito",
        "images/prancheta.png",
        "#")
    */
}

