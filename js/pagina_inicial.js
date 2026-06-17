const DB_KEY = "pedidozap_db";

// ================================
// PRODUTOS INICIAIS (fallback)
// ================================
const PRODUTOS_INICIAIS = [
    {
        id: 1,
        nome: "Pizza Margherita",
        descricao: "Molho de tomate, mussarela e manjericão fresco",
        preco: "39.90",
        categoria: "Pizza",
        imagem: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=70"
    },
    {
        id: 2,
        nome: "Pizza Calabresa",
        descricao: "Molho de tomate, mussarela e calabresa fatiada",
        preco: "42.90",
        categoria: "Pizza",
        imagem: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=70"
    },
    {
        id: 3,
        nome: "Pizza Frango com Catupiry",
        descricao: "Frango desfiado, catupiry cremoso e milho",
        preco: "44.90",
        categoria: "Pizza",
        imagem: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=70"
    },
    {
        id: 4,
        nome: "X-Burguer Clássico",
        descricao: "Pão brioche, blend 180g, queijo cheddar, alface e tomate",
        preco: "29.90",
        categoria: "Hambúrguer",
        imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=70"
    },
    {
        id: 5,
        nome: "Smash Burguer Duplo",
        descricao: "Dois smash patties, queijo americano, picles e molho especial",
        preco: "36.90",
        categoria: "Hambúrguer",
        imagem: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=70"
    },
    {
        id: 6,
        nome: "Coxinha de Frango",
        descricao: "Coxinha crocante recheada com frango e catupiry, porção com 6 unidades",
        preco: "22.90",
        categoria: "Salgados",
        imagem: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=400&q=70"
    },
    {
        id: 7,
        nome: "Batata Frita",
        descricao: "Porção de batata frita crocante com sal e ervas",
        preco: "18.90",
        categoria: "Porções",
        imagem: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&q=70"
    },
    {
        id: 8,
        nome: "Onion Rings",
        descricao: "Anéis de cebola empanados e fritos, porção com 8 unidades",
        preco: "19.90",
        categoria: "Porções",
        imagem: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&q=70"
    },
    {
        id: 9,
        nome: "Coca-Cola Lata",
        descricao: "Refrigerante gelado 350ml",
        preco: "6.90",
        categoria: "Bebidas",
        imagem: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=70"
    },
    {
        id: 10,
        nome: "Suco de Laranja Natural",
        descricao: "Suco de laranja espremido na hora, 400ml",
        preco: "9.90",
        categoria: "Bebidas",
        imagem: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&q=70"
    }
];

// ================================
// BANCO LOCAL
// ================================
function getDB() {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) return JSON.parse(raw);

    // Primeira vez: inicializa com produtos padrão
    const db = {
        produtos: PRODUTOS_INICIAIS,
        pedidos: [],
        feedbacks: []
    };
    localStorage.setItem(DB_KEY, JSON.stringify(db));
    return db;
}

// ================================
// CONTAINER
// ================================
const listaProdutos = document.getElementById("lista-produtos");

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

                    <h5 class="card-title">${produto.nome}</h5>

                    <p class="card-text">${produto.descricao}</p>

                    <p class="fw-bold fs-5">
                        R$ ${Number(produto.preco).toFixed(2)}
                    </p>

                    <p class="text-muted">${produto.categoria}</p>

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

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const indexExistente = carrinho.findIndex(
        (item) => item.id === produto.id
    );

    if (indexExistente >= 0) {
        carrinho[indexExistente].quantidade =
            (carrinho[indexExistente].quantidade || 1) + 1;
    } else {
        produto.quantidade = 1;
        carrinho.push(produto);
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert(`${produto.nome} adicionado ao carrinho!`);
}

// ================================
// INICIA
// ================================
renderizarProdutos();
