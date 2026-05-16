// PEGA PRODUTOS SALVOS
const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// CONTAINER
const listaProdutos = document.getElementById("lista-produtos");

// RENDERIZA PRODUTOS
function renderizarProdutos() {
  listaProdutos.innerHTML = "";

  produtos.forEach((produto) => {
    listaProdutos.innerHTML += `

        <div class="col">

            <div class="card bg-products h-100">

                <img src="${produto.imagem}"
                     class="card-img-top"
                     style="
                     height: 250px;
                     object-fit: cover;
                     ">

                <div class="card-body">

                    <h5 class="card-title">
                        ${produto.nome}
                    </h5>

                    <p class="card-text">
                        ${produto.descricao}
                    </p>

                    <p class="fw-bold">
                        R$ ${produto.preco}
                    </p>

                    <p class="text-muted">
                        ${produto.categoria}
                    </p>

                    <button class="btn btn-success w-100">

                        Adicionar ao Carrinho

                    </button>

                </div>

            </div>

        </div>

        `;
  });
}

// INICIA
renderizarProdutos();
