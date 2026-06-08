const DB_KEY = "pedidozap_db";

// ================================
// BANCO LOCAL (JSON ÚNICO)
// ================================
function getDB() {
    return JSON.parse(localStorage.getItem(DB_KEY)) || {
        produtos: [],
        pedidos: [],
        feedbacks: []
    };
}

// ================================
// CONTAINER
// ================================
const listaProdutos =
    document.getElementById("lista-produtos");

// ================================
// RENDER PRODUTOS
// ================================
function renderizarProdutos() {

    const db = getDB();
    const produtos = db.produtos;

    listaProdutos.innerHTML = "";

    if (!produtos.length) {

        listaProdutos.innerHTML = `
            <div class="text-center w-100 py-5">
                <i class="bi bi-box-seam fs-1 text-muted"></i>
                <p class="mt-3">Nenhum produto cadastrado ainda</p>
            </div>
        `;
        return;
    }

    produtos.forEach((produto) => {

        listaProdutos.innerHTML += `
        
        <div class="col">

            <div class="card bg-products h-100 shadow-sm">

                <img 
                    src="${produto.imagem}"
                    class="card-img-top"
                    alt="${produto.nome}"
                    style="height: 250px; object-fit: cover;"
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


// ================================
// CARRINHO
// ================================
function adicionarCarrinho(produto) {

    let carrinho =
        JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho.push(produto);

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

    alert(`${produto.nome} adicionado ao carrinho!`);
}



// ================================
// INICIA
// ================================
renderizarProdutos();