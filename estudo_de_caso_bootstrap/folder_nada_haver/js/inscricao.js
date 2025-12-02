
    document.addEventListener("DOMContentLoaded", function() {
        const eventos = {
            1: { nome: "Evento 01", descricao: "Workshop de tecnologia.", vagas: 15, valor: 50 },
            2: { nome: "Evento 02", descricao: "Seminário de inovação.", vagas: 5, valor: 80 },
            3: { nome: "Evento 03", descricao: "Encontro de pesquisa científica.", vagas: 0, valor: 100 },
            4: { nome: "Evento 04", descricao: "Congresso de educação Simplificada.", vagas: 25, valor: 60 },
            5: { nome: "Evento 05", descricao: "Palestra de Coach Quantico.", vagas: 10, valor: 40 },
        };

        const selectEvento = document.getElementById("select_evento");
        const containerFormulario = document.getElementById("container_formulario");
        const form = document.getElementById("formulario_inscricao");

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("alert", "mt-3");
        containerFormulario.appendChild(infoDiv);

        selectEvento.addEventListener("change", function() {
            const eventoSelecionado = eventos[this.value];

            if (!eventoSelecionado) return;

            let classeAlerta = eventoSelecionado.vagas > 0 ? "alert-success" : "alert-danger";
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
            if (evento.vagas === 0) {
                alert("Desculpe, este evento está lotado!");
                return;
            }

            infoDiv.className = "alert alert-info mt-3";
            infoDiv.innerHTML = `
                ✅ Inscrição realizada com sucesso!<br>
                <b>${evento.nome}</b> - Valor: R$ ${evento.valor.toFixed(2)}<br>
                Um e-mail de confirmação foi enviado para você.
            `;
        });
    });
