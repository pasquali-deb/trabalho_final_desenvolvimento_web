document.addEventListener("DOMContentLoaded", function () {
    const tituloEl = document.getElementById("titulo-evento");
    const descEl = document.getElementById("descricao-evento");
    const localEl = document.getElementById("local-evento");
    const inicioEl = document.getElementById("data-inicio-evento");
    const fimEl = document.getElementById("data-fim-evento");
    const cargaEl = document.getElementById("carga-horaria-evento");
    const valorEl = document.getElementById("valor-evento");
    const vagasEl = document.getElementById("vagas-evento");
    const imgEl = document.getElementById("imagem-evento");
    const msgExtraEl = document.getElementById("mensagem-extra");
    const cardDetalhes = document.getElementById("card-detalhes");
    const erroEl = document.getElementById("erro-evento");

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        mostrarErro("ID do evento não informado.");
        return;
    }

    // Eventos fixos (os que estão na index.html)
 const eventosFixos = {
    "1": {
        id: "1",
        nome: "Copa FPS Universitária",
        descricao: "Campeonato presencial de FPS entre times universitários, com partidas de CS2 e Valorant, estrutura de arena e narração ao vivo.",
        local: "Passo Fundo - RS",
        dataInicio: "2025-11-18T19:00:00",
        dataFim: "2025-11-18T22:00:00",
        cargaHoraria: 3,
        valor: 0,
        vagas: 100,
          imagem: "../img/copa-fps-universitaria.jpg"
    },
    "2": {
        id: "2",
        nome: "Liga Battle Royale Online",
        descricao: "Liga online de Battle Royale com squads de Fortnite e Warzone. Rodadas classificatórias, fases finais transmitidas e premiação em dinheiro.",
        local: "Online",
        dataInicio: "2025-11-19T18:30:00",
        dataFim: "2025-11-19T23:00:00",
        cargaHoraria: 5,
        valor: 50,
        vagas: 80,
        imagem: "../img/liga-battle-royale.jpg"
    },
    "3": {
        id: "3",
        nome: "Campeonato Mobile Arena",
        descricao: "Torneio presencial de jogos mobile de arena 5x5 (MOBA), com equipes semi-profissionais, partidas melhor-de-3 e final em melhor-de-5.",
        local: "São Paulo - SP",
        dataInicio: "2025-11-20T14:00:00",
        dataFim: "2025-11-20T20:00:00",
        cargaHoraria: 6,
        valor: 120,
        vagas: 60,
        imagem: "../img/campeonato-mobile-arena.jpg"
    },
    "4": {
        id: "4",
        nome: "Festival Retro Games & Speedrun",
        descricao: "Festival dedicado a jogos retrô, com estações de consoles clássicos, desafios de speedrun, rankings ao vivo e mini-campeonatos por jogo.",
        local: "Passo Fundo - RS",
        dataInicio: "2025-11-21T10:00:00",
        dataFim: "2025-11-21T22:00:00",
        cargaHoraria: 12,
        valor: 0,
        vagas: 200,
        imagem: "../img/festival-retro-speedrun.jpg"
    }
};
    
    function mostrarErro(mensagem) {
        cardDetalhes.classList.add("d-none");
        erroEl.classList.remove("d-none");
        erroEl.textContent = mensagem || "Evento não encontrado.";
    }

    function carregarEventosCadastrados() {
        try {
            const data = localStorage.getItem("eventos_cadastrados");
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Erro ao ler eventos_cadastrados:", e);
            return [];
        }
    }

    function formatarData(dateStr) {
        if (!dateStr) return "";
        // se vier só yyyy-mm-dd, adiciona horário
        if (dateStr.length === 10) {
            dateStr += "T00:00:00";
        }
        const d = new Date(dateStr);
        if (isNaN(d)) return dateStr;
        return d.toLocaleString("pt-BR");
    }

    function formatarValor(valor) {
        if (valor == null || isNaN(valor)) return "-";
        if (Number(valor) === 0) return "Gratuito";
        return "R$ " + Number(valor).toFixed(2).replace(".", ",");
    }

    // 1) Tenta nos eventos fixos
    let evento = eventosFixos[id];

    // 2) Se não achou, tenta nos eventos cadastrados via formulário
    if (!evento) {
        const cadastrados = carregarEventosCadastrados();
        const encontrado = cadastrados.find((e) => e.id === id);
        if (encontrado) {
            evento = {
                id: encontrado.id,
                nome: encontrado.nome,
                descricao: encontrado.descricao,
                local: "Local a definir",
                dataInicio: encontrado.dataInicio,
                dataFim: encontrado.dataFim,
                cargaHoraria: encontrado.cargaHoraria,
                valor: encontrado.valor,
                vagas: null,
                imagem: "../img/evento1.jpg"
            };
            msgExtraEl.textContent = "Este evento foi cadastrado pelo usuário.";
        }
    }

    if (!evento) {
        mostrarErro("Evento não encontrado. Verifique se o link está correto.");
        return;
    }

    // Preenche a tela
    tituloEl.textContent = evento.nome;
    descEl.textContent = evento.descricao || "";
    localEl.textContent = evento.local || "-";
    inicioEl.textContent = formatarData(evento.dataInicio);
    fimEl.textContent = formatarData(evento.dataFim);
    cargaEl.textContent = evento.cargaHoraria ? evento.cargaHoraria + " horas" : "-";
    valorEl.textContent = formatarValor(evento.valor);
    vagasEl.textContent = evento.vagas != null ? evento.vagas : "Não informado";

    if (evento.imagem && imgEl) {
        imgEl.src = evento.imagem;
        imgEl.alt = "Imagem do evento " + evento.nome;
    }
});