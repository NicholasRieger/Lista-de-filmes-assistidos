const lista = document.querySelector(".lista");
const inputFilme = document.querySelector(".adicionarFilmes");
const botaoAdicionar = document.querySelector(".botaoAdicionar");
const botaoApagarTudo = document.querySelector(".apagarTudo");

// limpa e foca de novo na barra
function limparBarra() {
    inputFilme.value = "";
    inputFilme.focus();
}

// percorre os <li>, monta o array e salva no localStorage
function salvarTarefas() {
    const filmesLi = document.querySelectorAll(".lista li");
    const listaFilmes = [];

    for (let item of filmesLi) {
        let texto = item.innerText;
        texto = texto.replace("Apagar", "").trim();
        texto = texto.replace("Assistido", "").trim();
        listaFilmes.push(texto);
    }

    const filmesJson = JSON.stringify(listaFilmes);
    localStorage.setItem("filmes", filmesJson);
}

// cria o botão Apagar dentro do li
function criarBotaoApagar(item) {
    const botaoApagar = document.createElement("button");
    botaoApagar.textContent = "Apagar";
    botaoApagar.classList.add("apagar");
    item.appendChild(botaoApagar);
}

// cria o botão Assistido dentro do li
function criarBotaoAssistido(item) {
    const botaoAssistido = document.createElement("button");
    botaoAssistido.textContent = "Assistido";
    botaoAssistido.classList.add("assistido");
    item.appendChild(botaoAssistido);
}

// cria o <li> na tela (não salva e não limpa a barra)
function criarFilmeNaLista(textoFilme) {
    const novoFilme = document.createElement("li");
    novoFilme.textContent = textoFilme;

    criarBotaoApagar(novoFilme);
    criarBotaoAssistido(novoFilme);

    lista.appendChild(novoFilme);
}

// fluxo completo de adicionar (usado no clique e no Enter)
function adicionarFilme(textoFilme) {
    if (!textoFilme) return;
    criarFilmeNaLista(textoFilme);
    salvarTarefas();
    limparBarra();
}

// clique no botão Adicionar
botaoAdicionar.addEventListener("click", function () {
    adicionarFilme(inputFilme.value);
});

// apertar Enter dentro do input
inputFilme.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        adicionarFilme(inputFilme.value);
    }
});

// delegação de eventos para Apagar e Assistido
document.addEventListener("click", function (e) {
    const el = e.target;

    // apagar um filme
    if (el.classList.contains("apagar")) {
        el.parentElement.remove();
        salvarTarefas();
    }

    // marcar como assistido (toggle)
    if (el.classList.contains("assistido")) {
        el.parentElement.classList.toggle("assistido-filme");
        // não precisa salvar esse estado por enquanto
    }
});

// carregar filmes salvos ao abrir a página
function adicionaFilmesSalvos() {
    const filmes = localStorage.getItem("filmes");
    if (!filmes) return; // nada salvo ainda

    const listaFilmes = JSON.parse(filmes);

    for (let texto of listaFilmes) {
        criarFilmeNaLista(texto);
    }
}

// apagar tudo
botaoApagarTudo.addEventListener("click", function () {
    const filmes = document.querySelectorAll(".lista li");

    for (let item of filmes) {
        item.remove();
    }

    localStorage.removeItem("filmes");
});

adicionaFilmesSalvos();
limparBarra();
