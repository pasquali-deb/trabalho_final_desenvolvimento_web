/* DOMContentLoaded
 Utilizado para executar a função após ter terminado de carregar todo HTML
 Garantindo que os elementos já existam no DOM para que o JS consiga acessa-los
*/ 
document.addEventListener("DOMContentLoaded", function() {
    // Eventos é um objeto, (imagine como se fosse um banco de dados em memoria)
    const eventos = {
        // Cada chave tem um objeto com nome: descricao: vagas: valor:
        1: { nome: "Evento 01", descricao: "Workshop de tecnologia.", vagas: 15, valor: 50 },
        2: { nome: "Evento 02", descricao: "Seminário de inovação.", vagas: 5, valor: 80 },
        3: { nome: "Evento 03", descricao: "Encontro de pesquisa científica.", vagas: 0, valor: 100 },
        4: { nome: "Evento 04", descricao: "Congresso de educação Simplificada.", vagas: 25, valor: 60 },
        5: { nome: "Evento 05", descricao: "Palestra de Coach Quantico.", vagas: 10, valor: 40 },
    };

    // selectEvento nome da variavel no JS. (nome deixa bem claro que é um select do evento)
    // getElementById -> pega o id="select_evento" na view (html) - Mesmo serve para as outras variaveis.
    const selectEvento = document.getElementById("select_evento");
    const containerFormulario = document.getElementById("container_formulario");
    const form = document.getElementById("formulario_inscricao");

    // createElement -> Cria uma div dinamicamente via JS.
    const infoDiv = document.createElement("div");
    // Adiciona uma classe ( nessa caso CSS ) Alerta e um margin top 
    infoDiv.classList.add("alert", "mt-3");
    // Adiciona a div dentro do container do formulario (appendChild) Insere um elementro dentro de outro elemento.
    containerFormulario.appendChild(infoDiv);

    // Fica (ouvindo o evento selectEvento) executando toda vez que usuario muda a opção (change)
    selectEvento.addEventListener("change", function() {
        // Pega a opcao (valor) que foi selecionado, correspondente no "banco" de eventos
        const eventoSelecionado = eventos[this.value];

        // Apenas uma verificacao pra sair da funcao caso nao encontre um evento
        if (!eventoSelecionado) return;

        // Criado uma variavel com um if ternario.
            /*
                Se vagas > 0  "alert-success" (tem vaga, mensagem verde/positiva).
                Se vagas === 0  "alert-danger" (lotado, mensagem vermelha/negativa).
                ? -> é o nosso IF
                : -> é o nosso ELSE
            */
        let classeAlerta = eventoSelecionado.vagas > 0 ? "alert-success" : "alert-danger";

        // Aqui ele monta nossa clase conforme o alerta anterior.
        infoDiv.className = `alert ${classeAlerta} mt-3`;

        // InnerHTML montar o html para a view. toFixed -> quantas casas decimais. 
        infoDiv.innerHTML = `
            <strong>${eventoSelecionado.nome}</strong><br>
            ${eventoSelecionado.descricao}<br>
            Vagas disponíveis: <b>${eventoSelecionado.vagas}</b><br>
            Valor da inscrição: <b>R$ ${eventoSelecionado.valor.toFixed(2)}</b>
        `;
    });

    // Adiciona um "ouvinte" para o envio do formulario (submit)
    form.addEventListener("submit", function(e) {
        // Evita que a pagina seja carregada ou enviar os dados para o servidor.
        e.preventDefault();
        const eventoId = selectEvento.value;

        // Apenas verifica se evento tem um valor (ID).
        if (!eventoId) {
            alert("Selecione um evento antes de prosseguir!");
            return;
        }

        // Pega os dados do evento escolhido
        const evento = eventos[eventoId];
        // Compara o evento pra ver se tem ainda vagas
        if (evento.vagas === 0) {
            alert("Desculpe, este evento está lotado!");
            return;
        }

        // Muda as classes para mostrar as informações sobre o evento
        infoDiv.className = "alert alert-info mt-3";
        infoDiv.innerHTML = `
            ✅ Inscrição realizada com sucesso!<br>
            <b>${evento.nome}</b> - Valor: R$ ${evento.valor.toFixed(2)}<br>
            Um e-mail de confirmação foi enviado para você.
        `;
    });
});

/*

RESUMO

    Página carrega: código é executado.

    Usuário escolhe um evento no <select>:

    Script busca o evento no objeto eventos.

    Mostra nome, descrição, vagas e valor.

    Se não houver vagas, o alerta fica “vermelho”.

    Usuário preenche o formulário e clica em “Enviar”:

    O envio padrão é bloqueado (preventDefault).

    Se nenhum evento foi escolhido -> alerta pedindo para selecionar.

    Se o evento está lotado -> alerta avisando que não dá pra inscrever.

    Se está tudo ok -> mensagem de sucesso na infoDiv.

*/
