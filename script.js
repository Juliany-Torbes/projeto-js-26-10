/* ================================
   DADOS
   (tudo que o site mostra vem daqui)
================================ */

let times = [
    { nome: "1º A", pontos: 7, jogos: 3, vitorias: 2, empates: 1, derrotas: 0, golsPro: 8, golsContra: 4 },
    { nome: "2º A", pontos: 7, jogos: 3, vitorias: 2, empates: 1, derrotas: 0, golsPro: 7, golsContra: 4 },
    { nome: "3º A", pontos: 3, jogos: 3, vitorias: 0, empates: 3, derrotas: 0, golsPro: 4, golsContra: 4 },
    { nome: "2º B", pontos: 3, jogos: 3, vitorias: 1, empates: 0, derrotas: 2, golsPro: 4, golsContra: 5 },
    { nome: "1º B", pontos: 2, jogos: 3, vitorias: 0, empates: 2, derrotas: 1, golsPro: 3, golsContra: 5 },
    { nome: "3º B", pontos: 1, jogos: 3, vitorias: 0, empates: 1, derrotas: 2, golsPro: 2, golsContra: 6 }
];

let jogos = [
    { id: 1, data: "29/10", casa: "1º A", fora: "2º A", realizado: false },
    { id: 2, data: "29/10", casa: "2º B", fora: "1º B", realizado: false },
    { id: 3, data: "29/10", casa: "3º A", fora: "3º B", realizado: false },
    { id: 4, data: "05/11", casa: "1º A", fora: "1º B", realizado: false },
    { id: 5, data: "05/11", casa: "2º A", fora: "3º B", realizado: false },
    { id: 6, data: "05/11", casa: "2º B", fora: "3º A", realizado: false }
];

let artilheiros = [
    { nome: "Lucas",  turma: "1º A", gols: 5 },
    { nome: "Bruna",  turma: "2º A", gols: 3 },
    { nome: "Júlia",  turma: "3º A", gols: 3 },
    { nome: "Pedro",  turma: "1º A", gols: 3 },
    { nome: "Rafael", turma: "1º B", gols: 2 }
];


/* ================================
   CLASSIFICAÇÃO
================================ */

function atualizarClassificacao() {

    // [...times] cria uma cópia, assim a lista original não muda de ordem
    let ordenados = [...times].sort(function (a, b) {

        // 1º critério: pontos
        if (b.pontos !== a.pontos) {
            return b.pontos - a.pontos;
        }

        // 2º critério: saldo de gols
        let saldoA = a.golsPro - a.golsContra;
        let saldoB = b.golsPro - b.golsContra;

        if (saldoB !== saldoA) {
            return saldoB - saldoA;
        }

        // 3º critério: vitórias
        return b.vitorias - a.vitorias;
    });

    let html = "";

    for (let i = 0; i < ordenados.length; i++) {

        let time = ordenados[i];
        let saldo = time.golsPro - time.golsContra;

        // mostra "+" na frente do saldo positivo
        let textoSaldo = saldo;
        if (saldo > 0) {
            textoSaldo = "+" + saldo;
        }

        html += `
            <tr>
                <td>${i + 1}</td>
                <td>${time.nome}</td>
                <td>${time.pontos}</td>
                <td>${time.jogos}</td>
                <td>${time.vitorias}</td>
                <td>${time.empates}</td>
                <td>${time.derrotas}</td>
                <td>${textoSaldo}</td>
            </tr>
        `;
    }

    document.getElementById("tabelaClassificacao").innerHTML = html;
}


/* ================================
   JOGOS
================================ */

function atualizarJogos() {

    let html = "";

    for (let i = 0; i < jogos.length; i++) {

        let jogo = jogos[i];
        let placar = "";

        // só mostra o placar se o jogo já aconteceu
        if (jogo.realizado) {
            placar = `<strong class="resultado">${jogo.golsCasa} × ${jogo.golsFora}</strong>`;
        }

        html += `
            <div class="jogo">
                <span class="data">${jogo.data}</span>
                <span>${jogo.casa} × ${jogo.fora}</span>
                ${placar}
            </div>
        `;
    }

    document.getElementById("listaJogos").innerHTML = html;
}


/* ================================
   ARTILHEIROS
================================ */

function atualizarArtilheiros() {

    // ordena do que tem mais gols para o que tem menos
    let ordenados = [...artilheiros].sort(function (a, b) {
        return b.gols - a.gols;
    });

    let html = "";

    for (let i = 0; i < ordenados.length; i++) {

        let jogador = ordenados[i];

        html += `
            <div class="artilheiro">
                <div>
                    <strong>${jogador.nome}</strong>
                    <small>${jogador.turma}</small>
                </div>
                <strong class="gols">${jogador.gols}</strong>
            </div>
        `;
    }

    document.getElementById("listaArtilheiros").innerHTML = html;
}


/* ================================
   PRÓXIMO JOGO
================================ */

function atualizarProximoJogo() {

    // find devolve o primeiro jogo que ainda não aconteceu
    let proximo = jogos.find(function (jogo) {
        return !jogo.realizado;
    });

    // se não sobrou nenhum, o campeonato acabou
    if (!proximo) {
        document.getElementById("timeCasa").textContent = "Fim";
        document.getElementById("timeFora").textContent = "do campeonato";
        document.getElementById("dataJogo").textContent = "";
        return;
    }

    document.getElementById("timeCasa").textContent = proximo.casa;
    document.getElementById("timeFora").textContent = proximo.fora;
    document.getElementById("dataJogo").textContent = proximo.data;
}


/* ================================
   NÚMEROS
================================ */

function atualizarNumeros() {

    let totalJogos = 0;
    let totalGols = 0;

    for (let i = 0; i < times.length; i++) {
        totalJogos += times[i].jogos;
        totalGols += times[i].golsPro;
    }

    // cada jogo aparece duas vezes (uma para cada time), então dividimos por 2
    totalJogos = totalJogos / 2;

    let media = 0;
    if (totalJogos > 0) {
        media = totalGols / totalJogos;
    }

    document.getElementById("numeroJogos").textContent = totalJogos;
    document.getElementById("numeroGols").textContent = totalGols;
    document.getElementById("mediaGols").textContent = media.toFixed(1).replace(".", ",");
}


/* ================================
   FORMULÁRIO
================================ */

function atualizarSelect() {

    let select = document.getElementById("selecaoJogo");
    let botao = document.getElementById("botaoRegistrar");
    let html = "";

    for (let i = 0; i < jogos.length; i++) {

        let jogo = jogos[i];

        // só aparecem jogos que ainda não foram registrados
        if (!jogo.realizado) {
            html += `<option value="${jogo.id}">${jogo.data} — ${jogo.casa} × ${jogo.fora}</option>`;
        }
    }

    if (html === "") {
        html = `<option value="">Nenhum jogo pendente</option>`;
        botao.disabled = true;
    } else {
        botao.disabled = false;
    }

    select.innerHTML = html;

    atualizarLabels();
}

function atualizarLabels() {

    let id = Number(document.getElementById("selecaoJogo").value);

    let jogo = jogos.find(function (j) {
        return j.id === id;
    });

    // sem jogo selecionado, volta aos textos padrão
    if (!jogo) {
        document.getElementById("labelCasa").textContent = "Gols da casa";
        document.getElementById("labelFora").textContent = "Gols do visitante";
        return;
    }

    document.getElementById("labelCasa").textContent = "Gols do " + jogo.casa;
    document.getElementById("labelFora").textContent = "Gols do " + jogo.fora;
}

function mostrarMensagem(texto, erro) {

    let elemento = document.getElementById("mensagem");

    elemento.textContent = texto;

    // vermelho para erro, verde para sucesso
    if (erro) {
        elemento.style.color = "#c62828";
    } else {
        elemento.style.color = "#2f8f46";
    }

    // some depois de 4 segundos
    setTimeout(function () {
        elemento.textContent = "";
    }, 4000);
}

function registrarResultado() {

    let id = Number(document.getElementById("selecaoJogo").value);
    let textoCasa = document.getElementById("golsCasa").value;
    let textoFora = document.getElementById("golsFora").value;

    // 1) procura o jogo escolhido
    let jogo = jogos.find(function (j) {
        return j.id === id;
    });

    if (!jogo) {
        mostrarMensagem("Selecione um jogo.", true);
        return;
    }

    // 2) confere se o placar é válido (campo vazio, negativo ou decimal não vale)
    let golsCasa = Number(textoCasa);
    let golsFora = Number(textoFora);

    if (textoCasa === "" || textoFora === "" ||
        !Number.isInteger(golsCasa) || !Number.isInteger(golsFora) ||
        golsCasa < 0 || golsFora < 0) {

        mostrarMensagem("Digite gols válidos (números inteiros, 0 ou mais).", true);
        return;
    }

    // 3) procura os dois times na tabela
    let casa = times.find(function (t) {
        return t.nome === jogo.casa;
    });

    let fora = times.find(function (t) {
        return t.nome === jogo.fora;
    });

    // 4) guarda o resultado no jogo
    jogo.realizado = true;
    jogo.golsCasa = golsCasa;
    jogo.golsFora = golsFora;

    // 5) atualiza jogos e gols dos times
    casa.jogos++;
    fora.jogos++;

    casa.golsPro += golsCasa;
    casa.golsContra += golsFora;

    fora.golsPro += golsFora;
    fora.golsContra += golsCasa;

    // 6) atualiza vitória, empate, derrota e pontos
    if (golsCasa > golsFora) {
        casa.vitorias++;
        casa.pontos += 3;
        fora.derrotas++;
    } else if (golsFora > golsCasa) {
        fora.vitorias++;
        fora.pontos += 3;
        casa.derrotas++;
    } else {
        casa.empates++;
        fora.empates++;
        casa.pontos++;
        fora.pontos++;
    }

    // 7) avisa o usuário e limpa os campos
    mostrarMensagem(
        "Resultado registrado: " + jogo.casa + " " + golsCasa + " × " + golsFora + " " + jogo.fora,
        false
    );

    document.getElementById("golsCasa").value = 0;
    document.getElementById("golsFora").value = 0;

    // 8) redesenha a tela com os dados novos
    atualizarTudo();
}


/* ================================
   NAVEGAÇÃO
================================ */

function irPara(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}


/* ================================
   ATUALIZAR TUDO
================================ */

function atualizarTudo() {
    atualizarClassificacao();
    atualizarJogos();
    atualizarArtilheiros();
    atualizarProximoJogo();
    atualizarSelect();
    atualizarNumeros();
}


/* ================================
   INÍCIO
================================ */

// quando o usuário troca o jogo no select, os textos dos campos mudam
document.getElementById("selecaoJogo").addEventListener("change", atualizarLabels);

// desenha tudo pela primeira vez
atualizarTudo();