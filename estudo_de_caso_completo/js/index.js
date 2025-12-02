document.addEventListener("DOMContentLoaded", function () {
    function atualizarContagem() {
        const itensTempo = document.querySelectorAll("[data-contador]");
        const agora = new Date();

        itensTempo.forEach(function (e) {
            const inicio = new Date(e.dataset.contador);
            const diff = inicio - agora;

            if (isNaN(inicio)) {
                e.textContent = "";
                return;
            }

            if (diff <= 0) {
                e.textContent = "Evento já começou!";
                e.classList.add("text-success");
                return;
            }

            const seg = Math.floor(diff / 1000);
            const dias = Math.floor(seg / 86400);
            const horas = Math.floor((seg % 86400) / 3600);
            const minutos = Math.floor((seg % 3600) / 60);
            const segundos = seg % 60;

            e.textContent =
                "Faltam " +
                dias + "d " +
                horas + "h " +
                minutos + "m " +
                segundos + "s";
        });
    }

    atualizarContagem();
    setInterval(atualizarContagem, 1000);
    const EVENTOS_KEY = "eventos_cadastrados";

    function obterEventosExtras() {
        try {
            const data = localStorage.getItem(EVENTOS_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Erro ao carregar eventos extras:", e);
            return [];
        }
    }

    function formatarDataBrasileira(dataISO) {
        if (!dataISO) return "";
        const [ano, mes, dia] = dataISO.split("-");
        if (!ano || !mes || !dia) return dataISO;
        return `${dia}/${mes}/${ano}`;
    }

    function criarCardEventoExtra(evento) {
        const col = document.createElement("div");
        col.className = "col-12 col-md-6 coluna-evento card border-0 p-0 bg-transparent";
        
        col.dataset.id = evento.id;
        col.dataset.titulo = evento.nome || "";
        col.dataset.descricao = evento.descricao || "";
        col.dataset.inicio = (evento.dataInicio || "") + "T00:00:00";
        col.dataset.local = "Local não informado";

        const dataInicioBr = formatarDataBrasileira(evento.dataInicio);

        col.innerHTML = `
            <div class="card-body">
                <img class="img-evento img-fluid rounded mb-3"
                     src="../img/evento1.jpg"
                     alt="Banner do evento ${evento.nome || "Novo evento"}">

                <h3 class="h4">${evento.nome || "Novo evento"}</h3>
                <p class="mb-1 text-muted small">
                    <strong>Local:</strong> Local não informado
                </p>
                <p class="mb-2">
                    ${evento.descricao || ""}
                </p>

                <p class="mb-1"><strong>Início:</strong> ${dataInicioBr}</p>
                <p class="text-muted small mb-2" data-contador="${evento.dataInicio || ""}T00:00:00"></p>

                <div class="d-flex w-100 justify-content-end mt-2">
                    <button type="button"class="btn btn-info me-2 btn-detalhes">
                        Detalhes
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-warning me-2 btn-favorito">
                        ⭐
                    </button>
                     <button type="button" class="btn btn-danger ms-2 btn-remover" data-id="${evento.id}">Excluir</button>
                    <a href="fazer_inscricao.html" class="btn btn-dark">
                        Inscrever-se
                    </a>
                </div>
            </div>
        `;

        return col;
    }

    const containerEventos = document.getElementById("lista-eventos");
    if (!containerEventos) return;
    const extras = obterEventosExtras();
    extras.forEach(function (ev) {
        const cardExtra = criarCardEventoExtra(ev);
        containerEventos.appendChild(cardExtra);
    });

    const campoPesquisa = document.getElementById("campo-pesquisa");
    let cards = Array.from(document.querySelectorAll(".coluna-evento"));

    function aplicarPesquisa() {
        if (!campoPesquisa) return;
        const termo = campoPesquisa.value.toLowerCase();

        cards.forEach(function (card) {
            const texto = card.innerText.toLowerCase();
            card.style.display = texto.includes(termo) ? "" : "none";
        });
    }

    if (campoPesquisa) {
        campoPesquisa.addEventListener("input", aplicarPesquisa);
    }

    const FAVORITOS_KEY = "eventosFavoritos";

    function carregarFavoritos() {
        try {
            return JSON.parse(localStorage.getItem(FAVORITOS_KEY)) || [];
        } catch {
            return [];
        }
    }

    function salvarFavoritos(lista) {
        localStorage.setItem(FAVORITOS_KEY, JSON.stringify(lista));
    }

    function atualizarIconesFavorito() {
        const favoritos = carregarFavoritos();
        cards.forEach(function (card) {
            const id = card.dataset.id;
            const btn = card.querySelector(".btn-favorito");
            const favorito = favoritos.includes(id);

            if (!btn) return;

            btn.textContent = favorito ? "⭐ Favorito" : "☆ Favoritar";
            btn.classList.toggle("btn-warning", favorito);
            btn.classList.toggle("btn-outline-warning", !favorito);
        });
    }

    function configurarFavoritos() {
        cards.forEach(function (card) {
            const id = card.dataset.id;
            const btn = card.querySelector(".btn-favorito");
            if (!btn) return;

            btn.addEventListener("click", function () {
                let favoritos = carregarFavoritos();
                if (favoritos.includes(id)) {
                    favoritos = favoritos.filter(function (fid) { return fid !== id; });
                } else {
                    favoritos.push(id);
                }
                salvarFavoritos(favoritos);
                atualizarIconesFavorito();
            });
        });

        atualizarIconesFavorito();
    }

    configurarFavoritos();
    const selectOrdenar = document.getElementById("ordenar-eventos");

    function ordenarCards(tipo) {
        cards = Array.from(document.querySelectorAll(".coluna-evento"));
        cards.sort(function (a, b) {
            const tituloA = (a.dataset.titulo || "").toLowerCase();
            const tituloB = (b.dataset.titulo || "").toLowerCase();
            const dataA = new Date(a.dataset.inicio);
            const dataB = new Date(b.dataset.inicio);

            if (tipo === "data-asc") {
                return dataA - dataB;
            }
            if (tipo === "data-desc") {
                return dataB - dataA;
            }
            if (tipo === "titulo-asc") {
                return tituloA.localeCompare(tituloB);
            }
            if (tipo === "titulo-desc") {
                return tituloB.localeCompare(tituloA);
            }
            return 0;
        });
        cards.forEach(function (card) {
            containerEventos.appendChild(card);
        });
    }
    if (selectOrdenar) {
        selectOrdenar.addEventListener("change", function () {
            ordenarCards(this.value);
            aplicarPesquisa();
        });
        ordenarCards(selectOrdenar.value);
    }
  
//REMOVER EVENTOS CRIADOS PELO USUÁRIO

function configurarRemocao() {
    const botoesRemover = document.querySelectorAll(".btn-remover");

    botoesRemover.forEach((btn) => {
        btn.addEventListener("click", function () {
            const id = this.getAttribute("data-id");

            if (!confirm("Tem certeza que deseja remover este evento?")) {
                return;
            }
            let eventosSalvos = JSON.parse(localStorage.getItem("eventos_cadastrados")) || [];
            eventosSalvos = eventosSalvos.filter(ev => ev.id !== id);
            localStorage.setItem("eventos_cadastrados", JSON.stringify(eventosSalvos));
            let favoritos = JSON.parse(localStorage.getItem("eventosFavoritos")) || [];
            favoritos = favoritos.filter(fid => fid !== id);
            localStorage.setItem("eventosFavoritos", JSON.stringify(favoritos));
            const card = document.querySelector(`[data-id='${id}']`);
            if (card) card.remove();
            cards = Array.from(document.querySelectorAll(".coluna-evento"));

            alert("Evento removido com sucesso!");
        });
    });
}
configurarRemocao();
});
