document.addEventListener("DOMContentLoaded", function() {
    const STORAGE_KEY = "eventos_inscricao";
    function carregarEventos() {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            try {
                return JSON.parse(data);
            } catch (e) {
                console.error("Erro ao ler eventos do localStorage:", e);
            }
        }
       return {
    1: { 
        nome: "Copa FPS Universitária", 
        descricao: "Campeonato de CS2 e Valorant entre equipes universitárias.", 
        vagas: 15, 
        valor: 0 
    },
    2: { 
        nome: "Liga Battle Royale Online", 
        descricao: "Squads de Fortnite e Warzone disputando premiação em formato online.", 
        vagas: 20, 
        valor: 50 
    },
    3: { 
        nome: "Campeonato Mobile Arena", 
        descricao: "Torneio de jogos mobile MOBA 5x5, como MLBB e Wild Rift.", 
        vagas: 12, 
        valor: 40 
    },
    4: { 
        nome: "Festival Retro Games & Speedrun", 
        descricao: "Desafios de speedrun e campeonatos de jogos retrô.", 
        vagas: 30, 
        valor: 0 
    }
};

    }
    function salvarEventos(eventos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(eventos));
    }
    const eventos = carregarEventos();
    const selectEvento = document.getElementById("select_evento");
    const containerFormulario = document.getElementById("container_formulario");
    const form = document.getElementById("formulario_inscricao");
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("alert", "mt-3", "d-none");
    containerFormulario.appendChild(infoDiv);
    selectEvento.addEventListener("change", function() {
        const eventoSelecionado = eventos[this.value];

        if (!eventoSelecionado) {
            infoDiv.classList.add("d-none");
            return;
        }
        const classeAlerta = eventoSelecionado.vagas > 0 ? "alert-success" : "alert-danger";
        infoDiv.className = `alert ${classeAlerta} mt-3`;

        infoDiv.innerHTML = `
            <strong>${eventoSelecionado.nome}</strong><br>
            ${eventoSelecionado.descricao}<br>
            Vagas disponíveis: <b>${eventoSelecionado.vagas}</b><br>
            Valor da inscrição: <b>R$ ${eventoSelecionado.valor.toFixed(2)}</b>
        `;
    });

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const eventoId = selectEvento.value;

        if (!eventoId) {
            alert("Selecione um evento antes de prosseguir!");
            return;
        }

        const evento = eventos[eventoId];

        if (!evento) {
            alert("Evento inválido. Tente novamente.");
            return;
        }

        if (evento.vagas === 0) {
            alert("Desculpe, este evento está lotado!");
            return;
        }

        // AQUI DIMINUI UMA VAGA
        evento.vagas -= 1;
        salvarEventos(eventos);
        infoDiv.className = "alert alert-info mt-3";
        infoDiv.innerHTML = `
            ✅ Inscrição realizada com sucesso!<br>
            <b>${evento.nome}</b> - Valor: R$ ${evento.valor.toFixed(2)}<br>
            Vagas restantes: <b>${evento.vagas}</b><br>
            Um e-mail de confirmação foi enviado para você.
        `;
    });
});
