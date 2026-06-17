        // CONTAINER
        const container = document.getElementById("carrinho-container");

        // TOTAIS
        const itemCount = document.getElementById("item-count");
        const totalElement = document.getElementById("total");
        const freteElement = document.getElementById("frete");
        const totalComFreteElement = document.getElementById("total-com-frete");
        const btnRemoveAll = document.getElementById("btn-remove-all");
        const btnProsseguir = document.getElementById("btn-prosseguir");

        // PEGA CARRINHO
        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        // RENDERIZA
        function renderCarrinho() {

            container.innerHTML = "";

            let total = 0;
            let quantidadeTotal = 0;

            if (carrinho.length === 0) {

                container.innerHTML = `
                    <div class="text-center py-5 carrinho-vazio">
                        <i class="bi bi-cart-x fs-1 text-muted"></i>
                        <h4 class="mt-3">Seu carrinho está vazio</h4>
                    </div>
                `;

            }

            carrinho.forEach((produto, index) => {

                const quantidade = produto.quantidade || 1;
                produto.quantidade = quantidade;
                quantidadeTotal += quantidade;

                total += Number(produto.preco) * quantidade;

                container.innerHTML += `
                    <div class="cart-item d-flex align-items-center mb-2 rounded p-3">
                        <img 
                            src="${produto.imagem}" 
                            alt="${produto.nome}"
                            style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px;"
                        >
                        <div class="flex-grow-1 px-3">
                            <div class="fw-bold">${produto.nome}</div>
                            <div class="text-muted">R$ ${Number(produto.preco).toFixed(2)}</div>
                            <div class="quantidade-controle d-flex align-items-center gap-2 mt-2">
                                <button class="btn btn-sm btn-outline-secondary" onclick="alterarQuantidade(${index}, -1)">−</button>
                                <span class="fw-semibold">${quantidade}</span>
                                <button class="btn btn-sm btn-outline-secondary" onclick="alterarQuantidade(${index}, 1)">+</button>
                            </div>
                        </div>
                        <button 
                            class="btn btn-remover btn-sm"
                            onclick="removerItem(${index})"
                            title="Remover"
                        >
                            Remover
                        </button>
                    </div>
                `;

            });

            localStorage.setItem("carrinho", JSON.stringify(carrinho));

            // ATUALIZAR RESUMO
            itemCount.innerText = quantidadeTotal === 1 ? "1 item selecionado" : `${quantidadeTotal} itens selecionados`;
            totalElement.innerText = `R$ ${total.toFixed(2)}`;

            const frete = total > 0 ? 5.0 : 0.0;
            const totalComFrete = total + frete;

            freteElement.innerText = `R$ ${frete.toFixed(2)}`;
            totalComFreteElement.innerText = `R$ ${totalComFrete.toFixed(2)}`;

            // DESABILITAR BOTÕES
            if (btnRemoveAll) {
                btnRemoveAll.disabled = carrinho.length === 0;
            }
            if (btnProsseguir) {
                btnProsseguir.disabled = carrinho.length === 0;
                if (carrinho.length === 0) {
                    btnProsseguir.classList.add("disabled");
                } else {
                    btnProsseguir.classList.remove("disabled");
                }
            }

        }

        // REMOVE ITEM
        function removerItem(index) {

            carrinho.splice(index, 1);

            localStorage.setItem(
                "carrinho",
                JSON.stringify(carrinho)
            );

            renderCarrinho();

        }

        // ALTERA QUANTIDADE
        function alterarQuantidade(index, delta) {
            if (!carrinho[index]) return;
            
            const novaQuantidade = (carrinho[index].quantidade || 1) + delta;
            if (novaQuantidade < 1) return;
            
            carrinho[index].quantidade = novaQuantidade;
            localStorage.setItem("carrinho", JSON.stringify(carrinho));
            renderCarrinho();
        }

        // REMOVE TODOS COM CONFIRMAÇÃO
        function removeAll() {
            if (carrinho.length === 0) return;
            if (!confirm("Tem certeza que deseja remover todos os itens do carrinho?")) return;
            
            carrinho = [];
            localStorage.removeItem("carrinho");
            renderCarrinho();
        }

        // INICIA
        renderCarrinho();

