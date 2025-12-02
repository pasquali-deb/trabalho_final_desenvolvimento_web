document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formulario_evento");
    const btnCancelar = document.getElementById("btn_cancelar");
    const mensagem = document.getElementById("mensagem_evento");
    const EVENTOS_KEY = "eventos_cadastrados";

    function obterEventos() {
        const data = localStorage.getItem(EVENTOS_KEY);
        return data ? JSON.parse(data) : [];
    }

    function salvarEventos(eventos) {
        localStorage.setItem(EVENTOS_KEY, JSON.stringify(eventos));
    }

    function gerarId() {
        return Date.now().toString();
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const cargaHoraria = parseInt(
            document.getElementById("carga_horaria").value,
            10
        );
        const valor = parseFloat(document.getElementById("valor").value);
        const dataInicio = document.getElementById("data_inicio").value;
        const dataFim = document.getElementById("data_fim").value;
        const descricao = document.getElementById("descricao").value.trim();
        if (!nome || !descricao || !dataInicio || !dataFim) {
            mensagem.className = "alert alert-danger mt-3";
            mensagem.textContent = "Preencha todos os campos obrigatórios.";
            return;
        }

        if (isNaN(cargaHoraria) || cargaHoraria < 1) {
            mensagem.className = "alert alert-danger mt-3";
            mensagem.textContent = "Informe uma carga horária válida (mínimo 1 hora).";
            return;
        }

        if (isNaN(valor) || valor < 0) {
            mensagem.className = "alert alert-danger mt-3";
            mensagem.textContent = "Informe um valor válido (mínimo 0).";
            return;
        }

        const inicio = new Date(dataInicio);
        const fim = new Date(dataFim);

        if (inicio > fim) {
            mensagem.className = "alert alert-danger mt-3";
            mensagem.textContent = "A data de início não pode ser maior que a data de encerramento.";
            return;
        }
        const novoEvento = {
            id: gerarId(),
            nome: nome,
            cargaHoraria: cargaHoraria,
            valor: valor,
            dataInicio: dataInicio,
            dataFim: dataFim,
            descricao: descricao
        };

        const eventos = obterEventos();
        eventos.push(novoEvento);
        salvarEventos(eventos);

        form.reset();

        mensagem.className = "alert alert-success mt-3";
        mensagem.textContent = `Evento "${nome}" cadastrado com sucesso! Agora ele aparece na página inicial.`;
    });

    btnCancelar.addEventListener("click", function (event) {
        event.preventDefault();
        form.reset();
        if (mensagem) {
            mensagem.className = "alert mt-3 d-none";
            mensagem.textContent = "";
        }
    });
});