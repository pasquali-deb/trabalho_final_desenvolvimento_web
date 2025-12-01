document.addEventListener("DOMContentLoaded", function () {

    // CONTADOR...
    const itensTempo = document.querySelectorAll("[data-contador]");

    function atualizarContagem() {
        const agora = new Date();

        itensTempo.forEach(function (e) {
            const inicio = new Date(e.dataset.contador);
            const diff = inicio - agora;

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

            e.textContent = "Faltam " +
                dias + "d " +
                horas + "h " +
                minutos + "m " +
                segundos + "s";
        });
    }

    atualizarContagem();
    setInterval(atualizarContagem, 1000);

    const campoPesquisa = document.getElementById("campo-pesquisa");
    const eventos = document.querySelectorAll(".coluna-evento");

    // PESQUISA
    if (campoPesquisa) {
        campoPesquisa.addEventListener("input", function () {
            const termo = campoPesquisa.value.toLowerCase();

            eventos.forEach(function (card) {
                const texto = card.innerText.toLowerCase();
                card.style.display = texto.includes(termo) ? "" : "none";
            });
        });
    }

    // FAVORITOS
    const container = document.getElementById("lista-eventos");
    let cards = Array.from(document.querySelectorAll(".coluna-evento"));
    const selectOrdenar = document.getElementById("ordenar-eventos");
    const salvar = "eventosFavoritos";

    function carregarFavoritos() {
        try {
            return JSON.parse(localStorage.getItem(salvar)) || [];
        } catch {
            return [];
        }
    }

    function salvarFavoritos(lista) {
        localStorage.setItem(salvar, JSON.stringify(lista));
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

    cards.forEach(function (card) {
        const btn = card.querySelector(".btn-favorito");
        if (!btn) return;

        btn.addEventListener("click", function () {
            const id = card.dataset.id;
            let favoritos = carregarFavoritos();

            if (favoritos.includes(id)) {
                favoritos = favoritos.filter(function (x) { return x !== id; });
            } else {
                favoritos.push(id);
            }

            salvarFavoritos(favoritos);
            atualizarIconesFavorito();
        });
    });

    atualizarIconesFavorito();

    // ORDENAÇÃO
    function ordenarCards(tipo) {
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
            container.appendChild(card);
        });
    }

    if (selectOrdenar) {
        selectOrdenar.addEventListener("change", function () {
            ordenarCards(this.value);
        });

        ordenarCards(selectOrdenar.value);
    }

});