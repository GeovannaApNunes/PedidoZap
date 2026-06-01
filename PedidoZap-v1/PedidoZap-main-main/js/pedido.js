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

const inputCep =
    document.getElementById("cep");

const campoBairro =
    document.getElementById("bairro");

const campoCidade =
    document.getElementById("cidade");

const cepStatus =
    document.getElementById("cep-status");

if (inputCep) {
    inputCep.addEventListener("input", (event) => {
        const elemento = event.target;
        let valor = elemento.value.replace(/\D/g, "");

        if (valor.length > 8) {
            valor = valor.slice(0, 8);
        }

        if (valor.length > 5) {
            valor = valor.replace(/^(\d{5})(\d+)/, "$1-$2");
        }

        elemento.value = valor;
    });
}

function limparCamposEndereco() {
    if (campoBairro) {
        campoBairro.value = "";
    }

    if (campoCidade) {
        campoCidade.value = "";
    }

    if (cepStatus) {
        cepStatus.textContent = "";
    }
}

function buscarEndereco() {
    if (!inputCep) {
        return;
    }

    const cep = inputCep.value.replace(/\D/g, "");

    if (cep.length !== 8) {
        if (cepStatus) {
            cepStatus.textContent = "Digite um CEP válido com 8 dígitos.";
        }

        limparCamposEndereco();
        return;
    }

    if (cepStatus) {
        cepStatus.textContent = "Buscando endereço...";
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((data) => {
            if (data.erro) {
                if (cepStatus) {
                    cepStatus.textContent = "CEP não encontrado.";
                }

                limparCamposEndereco();
                return;
            }

            const enderecoInput = document.getElementById("endereco");
            if (enderecoInput) {
                enderecoInput.value = data.logradouro || "";
            }

            if (campoBairro) {
                campoBairro.value = data.bairro || "";
            }

            if (campoCidade) {
                campoCidade.value = `${data.localidade || ""} / ${data.uf || ""}`;
            }

            if (cepStatus) {
                cepStatus.textContent = "Endereço encontrado. Confirme se está correto.";
            }
        })
        .catch(() => {
            if (cepStatus) {
                cepStatus.textContent = "Erro ao buscar CEP. Tente novamente.";
            }

            limparCamposEndereco();
        });
}

    const telefone = document.getElementById('telefone');

telefone.addEventListener('input', function (e) {

    // Remove tudo que não for número
    let valor = e.target.value.replace(/\D/g, '');

    // Limita a 11 números
    valor = valor.substring(0, 11);

    // Formata o telefone
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');

    // Atualiza o campo
    e.target.value = valor;
});
    

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
    const numero =
        document.getElementById("numero")?.value || "Não informado";
    const complemento =
        document.getElementById("complemento")?.value || "Não informado";

    const bairro =
        document.getElementById("bairro").value ||
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
Endereço: ${endereco}, Nº: ${numero}
Complemento: ${complemento}
Bairro: ${bairro}
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
    const whatsappNumero =
        "5534999999999";

    const url =
`https://wa.me/${whatsappNumero}?text=${encodeURIComponent(mensagem)}`;

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