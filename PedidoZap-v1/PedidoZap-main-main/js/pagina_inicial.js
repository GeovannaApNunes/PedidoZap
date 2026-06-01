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

        <div class="card bg-products h-100 shadow-sm">

          <img 
            src="${produto.imagem}"
            class="card-img-top"
            alt="${produto.nome}"
            style="
              height: 250px;
              object-fit: cover;
            "
          >

          <div class="card-body d-flex flex-column">

            <h5 class="card-title">
              ${produto.nome}
            </h5>

            <p class="card-text">
              ${produto.descricao}
            </p>

            <p class="fw-bold fs-5">
              R$ ${Number(produto.preco).toFixed(2)}
            </p>

            <p class="text-muted">
              ${produto.categoria}
            </p>

            <button 
              class="btn btn-success w-100 mt-auto"
              onclick='adicionarCarrinho(${JSON.stringify(produto)})'
            >
              Adicionar ao Carrinho
            </button>

          </div>

        </div>

      </div>

    `;
  });
}

// ADICIONAR AO CARRINHO
function adicionarCarrinho(produto) {

  // PEGA CARRINHO
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // ADICIONA PRODUTO
  carrinho.push(produto);

  // SALVA
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  // ALERTA
  alert(`${produto.nome} adicionado ao carrinho!`);
}

// INICIA
renderizarProdutos();