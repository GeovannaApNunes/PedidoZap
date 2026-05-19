// LISTA
const listaPedido =
    document.getElementById("lista-pedido");

// TOTAL
const totalPedido =
    document.getElementById("total-pedido");

// QUANTIDADE
const quantidadeItens =
    document.getElementById("quantidade-itens");

// TROCO
const pagamentoInputs =
    document.querySelectorAll(
        'input[name="pagamento"]'
    );

const campoTroco =
    document.getElementById("campoTroco");

// CARRINHO
const carrinho =
    JSON.parse(localStorage.getItem("carrinho")) || [];

// TOTAL
let total = 0;

// MOSTRA TROCO
pagamentoInputs.forEach((input) => {

    input.addEventListener("change", () => {

        if (
            input.value === "avista" &&
            input.checked
        ) {

            campoTroco.style.display = "block";

        } else {

            campoTroco.style.display = "none";

        }

    });

});

// RENDERIZA PEDIDO
function renderPedido() {

    listaPedido.innerHTML = "";

    total = 0;

    carrinho.forEach((produto) => {

        total += Number(produto.preco);

        listaPedido.innerHTML += `

            <div class="item-pedido">

                <div class="item-info">

                    <img
                        src="${produto.imagem}"
                        alt="${produto.nome}"
                    >

                    <div>

                        <div class="item-nome">
                            ${produto.nome}
                        </div>

                        <small>
                            ${produto.categoria}
                        </small>

                    </div>

                </div>

                <strong>
                    R$ ${Number(produto.preco).toFixed(2)}
                </strong>

            </div>

        `;

    });

    quantidadeItens.innerText =
        `${carrinho.length} itens`;

    totalPedido.innerHTML =
        `Total: R$ ${total.toFixed(2)}`;

}

// FINALIZAR
function finalizarPedido() {

    const nome =
        document.getElementById("nome").value ||
        "Não informado";

    const cep =
        document.getElementById("cep").value ||
        "Não informado";

    const telefone =
        document.getElementById("telefone").value ||
        "Não informado";

    const endereco =
        document.getElementById("endereco").value ||
        "Não informado";

    const troco =
        document.getElementById("troco").value;

    const pagamentoSelecionado =
        document.querySelector(
            'input[name="pagamento"]:checked'
        );

    if (!pagamentoSelecionado) {

        alert(
            "Escolha um método de pagamento."
        );

        return;

    }

    let pagamento =
        pagamentoSelecionado.value;

    if (pagamento === "pix") {
        pagamento = "Pix";
    }

    if (pagamento === "cartao") {
        pagamento = "Cartão";
    }

    if (pagamento === "avista") {
        pagamento = "Dinheiro";
    }

    // DATA
    const data =
        new Date().toLocaleString("pt-BR");

    // ITENS
    let itensTexto = "";

    carrinho.forEach((produto, index) => {

        itensTexto +=
`${index + 1}. ${produto.nome} - R$ ${Number(produto.preco).toFixed(2)}
`;

    });

    // MENSAGEM
    let mensagem =

`PEDIDO PEDIDOZAP

Data: ${data}

ITENS DO PEDIDO
${itensTexto}

-----------------------------
TOTAL: R$ ${total.toFixed(2)}
-----------------------------

DADOS DO CLIENTE
Nome: ${nome}
CEP: ${cep}
Telefone: ${telefone}
Endereço: ${endereco}
Pagamento: ${pagamento}
`;

    if (
        pagamentoSelecionado.value === "avista" &&
        troco !== ""
    ) {

        mensagem +=
`Troco para: R$ ${troco}
`;

    }

    mensagem += `

copiar - enviar para whatsapp

deixe seu feedback!
`;

    // COPIA
    navigator.clipboard.writeText(mensagem);

    // WHATSAPP
    const numero =
        "5534999999999";

    const url =
`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    // ABRE
    window.open(url, "_blank");

    alert(
        "Pedido copiado e enviado!"
    );

    // LIMPA
    localStorage.removeItem("carrinho");

}

// INICIA
renderPedido();