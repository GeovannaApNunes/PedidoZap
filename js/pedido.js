function carregarPedido() {

    const pedido =
        JSON.parse(localStorage.getItem("pedidoFinalizado"));

    const box =
        document.getElementById("mensagemPedido");

    if (!pedido) {
        box.innerText = "Nenhum pedido encontrado.";
        return;
    }

    let texto = `
PEDIDO PEDIDOZAP
Data: ${pedido.data}

ITENS DO PEDIDO
`;

    pedido.itens.forEach((item, i) => {
        const quantidade = item.quantidade || 1;
        const subtotal = Number(item.preco) * quantidade;
        texto += `${i + 1}. ${item.nome} x${quantidade} - R$ ${subtotal.toFixed(2)}\n`;
    });

    texto += `
---------------------------
TOTAL: R$ ${Number(pedido.total).toFixed(2)}
---------------------------

DADOS DO CLIENTE

Nome: ${pedido.cliente.nome}
CEP: ${pedido.cliente.cep}
Telefone: ${pedido.cliente.telefone}
Endereço: ${pedido.cliente.endereco}
Pagamento: ${pedido.cliente.pagamento}
`;

    if (pedido.cliente.troco) {
        texto += `Troco: R$ ${pedido.cliente.troco}\n`;
    }

    box.innerText = texto;
}


// COPIAR
function copiarPedido() {

    navigator.clipboard.writeText(
        document.getElementById("mensagemPedido").innerText
    );

    alert("Copiado!");
}


function enviarWhats() {

    const texto =
        document.getElementById("mensagemPedido").innerText;

    const numero = "";

    // abre WhatsApp
    window.open(
        `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`,
        "_blank"
    );
}

window.onload = carregarPedido;

let notaSelecionada = 0;


// ESTRELAS
const estrelas =
    document.querySelectorAll(".estrela");

const textoNota =
    document.getElementById("notaTexto");

estrelas.forEach((estrela) => {

    estrela.addEventListener("click", () => {

        notaSelecionada =
            Number(estrela.getAttribute("data-nota"));

        atualizarEstrelas();

        textoNota.innerText =
            `Nota: ${notaSelecionada} estrela(s)`;

    });

});


function atualizarEstrelas() {

    estrelas.forEach((estrela) => {

        const valor =
            Number(estrela.getAttribute("data-nota"));

        if (valor <= notaSelecionada) {
            estrela.classList.remove("bi-star");
            estrela.classList.add("bi-star-fill");
            estrela.style.color = "#ffc107";
        } else {
            estrela.classList.remove("bi-star-fill");
            estrela.classList.add("bi-star");
            estrela.style.color = "#000";
        }

    });

}


// ENVIAR FEEDBACK
function enviarFeedback() {

    const comentario =
        document.getElementById("comentario").value;

    if (notaSelecionada === 0) {
        alert("Escolha uma nota!");
        return;
    }

    const DB_KEY = "pedidozap_db";

    const feedback = {
        nota: notaSelecionada,
        comentario: comentario || "",
        data: new Date().toLocaleString("pt-BR")
    };

    let db = JSON.parse(localStorage.getItem(DB_KEY)) || {
        produtos: [],
        pedidos: [],
        feedbacks: []
    };

    db.feedbacks.push(feedback);

    localStorage.setItem(DB_KEY, JSON.stringify(db));

    alert("Feedback enviado! Obrigado ❤️");

    // limpa modal
    document.getElementById("comentario").value = "";
    notaSelecionada = 0;
    atualizarEstrelas();
    textoNota.innerText = "Nenhuma nota selecionada";
}
