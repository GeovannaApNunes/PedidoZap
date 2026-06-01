        // LISTA
        const listaPedido =
            document.getElementById("lista-pedido");

        // TOTAL
        const totalPedido =
            document.getElementById("total-pedido");

        // QUANTIDADE
        const quantidadeItens =
            document.getElementById("quantidade-itens");

        // PEGA CARRINHO
        const carrinho =
            JSON.parse(localStorage.getItem("carrinho")) || [];

        // TOTAL
        let total = 0;

        // RENDERIZA
        function renderPedido() {

            listaPedido.innerHTML = "";

            if (carrinho.length === 0) {

                listaPedido.innerHTML = `
                
                    <div class="text-center py-4">

                        <i class="bi bi-cart-x fs-1 text-muted"></i>

                        <p class="mt-3">
                            Nenhum item no pedido
                        </p>

                    </div>
                
                `;

                return;

            }

            carrinho.forEach((produto) => {

                total += Number(produto.preco);

                listaPedido.innerHTML += `

                    <div class="
                        d-flex
                        align-items-center
                        justify-content-between
                        bg-light
                        rounded
                        p-3
                        mb-3
                    ">

                        <div class="d-flex align-items-center">

                            <img
                                src="${produto.imagem}"
                                alt="${produto.nome}"
                                style="
                                    width: 90px;
                                    height: 90px;
                                    object-fit: cover;
                                    border-radius: 10px;
                                "
                            >

                            <div class="ms-3">

                                <h6 class="fw-bold mb-1">
                                    ${produto.nome}
                                </h6>

                                <small class="text-muted">
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
                document.getElementById("nome").value;

            const cep =
                document.getElementById("cep").value;

            const telefone =
                document.getElementById("telefone").value;

            const endereco =
                document.getElementById("endereco").value;

            const pagamento =
                document.querySelector(
                    'input[name="pagamento"]:checked'
                );

            if (
                nome === "" ||
                cep === "" ||
                telefone === "" ||
                endereco === "" ||
                !pagamento
            ) {

                alert(
                    "Preencha todas as informações."
                );

                return;

            }

            alert("Pedido realizado com sucesso!");

            localStorage.removeItem("carrinho");

            window.location.href =
                "pagina_inicial.html";

        }

        // INICIA
        const botaoProsseguir =
            document.getElementById("botaoProsseguir");

        if (botaoProsseguir) {
            botaoProsseguir.addEventListener(
                "click",
                finalizarPedido
            );
        }

        renderPedido();

        const pagamentoInputs =
            document.querySelectorAll(
                'input[name="pagamento"]'
            );

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