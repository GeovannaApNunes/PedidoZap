        // CONTAINER
        const container = document.getElementById("carrinho-container");

        // TOTAL
        const itemCount = document.getElementById("item-count");
        const totalElement = document.getElementById("total");

        // PEGA CARRINHO
        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        // RENDERIZA
        function renderCarrinho() {

            container.innerHTML = "";

            let total = 0;

            if (carrinho.length === 0) {

                container.innerHTML = `
                
                    <div class="text-center py-5">

                        <i class="bi bi-cart-x fs-1 text-muted"></i>

                        <h4 class="mt-3">
                            Seu carrinho está vazio
                        </h4>

                    </div>
                
                `;

            }

            carrinho.forEach((produto, index) => {

                total += Number(produto.preco);

                container.innerHTML += `

                    <div class="cart-item d-flex align-items-center mb-3 bg-white shadow-sm rounded p-2">

                        <img 
                            src="${produto.imagem}" 
                            alt="${produto.nome}"
                            style="
                                width: 120px;
                                height: 100px;
                                object-fit: cover;
                                border-radius: 10px;
                            "
                        >

                        <div class="flex-grow-1 px-3">

                            <div class="fw-bold">
                                ${produto.nome}
                            </div>

                            <div>
                                R$ ${Number(produto.preco).toFixed(2)}
                            </div>

                        </div>

                        <div>

                            <button 
                                class="btn btn-danger"
                                onclick="removerItem(${index})"
                            >

                                Remover

                            </button>

                        </div>

                    </div>

                `;

            });

            itemCount.innerText = `${carrinho.length} itens selecionados`;

            totalElement.innerHTML = `
            
                <strong>
                    Total: R$ ${total.toFixed(2)}
                </strong>
            
            `;

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

        // REMOVE TODOS
        function removeAll() {

            carrinho = [];

            localStorage.removeItem("carrinho");

            renderCarrinho();

        }

        // INICIA
        renderCarrinho();

