const carrinho =
    JSON.parse(localStorage.getItem("carrinho")) || [];

// TROCO
const pagamentoInputs =
    document.querySelectorAll('input[name="pagamento"]');

const campoTroco =
    document.getElementById("campoTroco");

pagamentoInputs.forEach((input) => {

    input.addEventListener("change", () => {

        if (input.value === "avista" && input.checked) {
            campoTroco.style.display = "block";
        } else {
            campoTroco.style.display = "none";
        }

    });

});


// FINALIZAR
function finalizarPedido() {

    if (carrinho.length === 0) {
        alert("Carrinho vazio!");
        return;
    }

    const nome =
        document.getElementById("nome").value || "Não informado";

    const cep =
        document.getElementById("cep").value || "Não informado";

    const telefone =
        document.getElementById("telefone").value || "Não informado";

    const endereco =
        document.getElementById("endereco").value || "Não informado";

    const troco =
        document.getElementById("troco")?.value || "";

    const pagamentoSelecionado =
        document.querySelector('input[name="pagamento"]:checked');

    if (!pagamentoSelecionado) {
        alert("Escolha o pagamento");
        return;
    }

    const data =
        new Date().toLocaleString("pt-BR");

    let total = 0;

    carrinho.forEach(p => {
        total += Number(p.preco);
    });

    const pedidoFinalizado = {
        data,
        itens: carrinho,
        total,
        cliente: {
            nome,
            cep,
            telefone,
            endereco,
            pagamento: pagamentoSelecionado.value,
            troco: troco || null
        }
    };

    // 🔥 SALVA
    localStorage.setItem(
        "pedidoFinalizado",
        JSON.stringify(pedidoFinalizado)
    );

    // limpa carrinho
    localStorage.removeItem("carrinho");

    // vai pra página pedido
    window.location.href = "pedido.html";
}


// render do carrinho
function renderPedido() {

    const lista = document.getElementById("lista-pedido");
    const totalPedido = document.getElementById("total-pedido");
    const quantidadeItens = document.getElementById("quantidade-itens");

    lista.innerHTML = "";

    let total = 0;

    if (carrinho.length === 0) {
        lista.innerHTML = "<p>Nenhum item</p>";
        return;
    }

    carrinho.forEach((p) => {

        total += Number(p.preco);

        lista.innerHTML += `
            <div>
                ${p.nome} - R$ ${Number(p.preco).toFixed(2)}
            </div>
        `;
    });

    quantidadeItens.innerText = carrinho.length + " itens";
    totalPedido.innerText = "Total: R$ " + total.toFixed(2);
}

renderPedido();