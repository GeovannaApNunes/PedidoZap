import { initializeApp } from "";
import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "";

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login_proprietario.html";
    }
});

window.logout = async function () {
    await signOut(auth);
    window.location.href = "login_proprietario.html";
};

// ================================
// BANCO DE DADOS
// ================================

const DB_KEY = "pedidozap_db";

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

function getDB() {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) return JSON.parse(raw);

    // Primeira vez: carrega produtos iniciais
    const db = {
        produtos: PRODUTOS_INICIAIS,
        pedidos: [],
        feedbacks: []
    };
    localStorage.setItem(DB_KEY, JSON.stringify(db));
    return db;
}

function saveDB(db) {
    try {
        localStorage.setItem(DB_KEY, JSON.stringify(db));
    } catch (e) {
        alert("Armazenamento local cheio. Remova alguns produtos ou imagens para continuar.");
    }
}

// ================================
// PRODUTOS
// ================================

let editandoIndex = null;
let imagemBase64 = "";

const cards = document.getElementById("cards-produtos");

// PREVIEW IMAGEM — comprime via canvas antes de salvar
document.getElementById("imagemInput").addEventListener("change", function (event) {

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        const img = new Image();

        img.onload = function () {

            const MAX = 400;
            let w = img.width;
            let h = img.height;

            if (w > h && w > MAX) {
                h = Math.round(h * MAX / w);
                w = MAX;
            } else if (h > MAX) {
                w = Math.round(w * MAX / h);
                h = MAX;
            }

            const canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            canvas.getContext("2d").drawImage(img, 0, 0, w, h);

            imagemBase64 = canvas.toDataURL("image/jpeg", 0.7);
            document.getElementById("preview").src = imagemBase64;
        };

        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
});

// ================================
// RENDER PRODUTOS
// ================================
function renderizarProdutos() {

    const db = getDB();

    document.querySelectorAll(".produto-card")
        .forEach(el => el.remove());

    db.produtos.forEach((produto, index) => {

        const col = document.createElement("div");
        col.classList.add("col", "produto-card");

        col.innerHTML = `
        <div class="card bg-products h-100">

            <img src="${produto.imagem}" class="card-img-top" style="height:200px;object-fit:cover;">

            <div class="card-body">

                <h5>${produto.nome}</h5>
                <p>${produto.descricao}</p>
                <p class="fw-bold">R$ ${produto.preco}</p>
                <p>${produto.categoria}</p>

                <button class="btn btn-warning" onclick="editarProduto(${index})">
                    Editar
                </button>

                <button class="btn btn-danger" onclick="excluirProduto(${index})">
                    Excluir
                </button>

            </div>
        </div>
        `;

        cards.insertBefore(col, cards.lastElementChild);
    });
}

// ================================
// ABRIR MODAL
// ================================
window.abrirModal = function () {

    editandoIndex = null;

    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("categoria").value = "Pizza";

    document.getElementById("preview").src = "img/Vector.png";
    imagemBase64 = "";

    new bootstrap.Modal(document.getElementById("modalProduto")).show();
};

// ================================
// SALVAR PRODUTO
// ================================
window.salvarProduto = function () {

    const db = getDB();

    const produto = {
        id: editandoIndex !== null ? db.produtos[editandoIndex].id : Date.now(),
        nome: document.getElementById("nome").value.trim(),
        descricao: document.getElementById("descricao").value.trim(),
        preco: document.getElementById("preco").value,
        categoria: document.getElementById("categoria").value,
        imagem: imagemBase64 || (editandoIndex !== null ? db.produtos[editandoIndex].imagem : "img/Vector.png")
    };

    if (!produto.nome || !produto.preco || isNaN(Number(produto.preco)) || Number(produto.preco) <= 0) {
        alert("Preencha o nome e um preço válido para o produto.");
        return;
    }

    if (editandoIndex !== null) {
        db.produtos[editandoIndex] = produto;
        editandoIndex = null;
    } else {
        db.produtos.push(produto);
    }

    saveDB(db);
    renderizarProdutos();

    bootstrap.Modal.getInstance(
        document.getElementById("modalProduto")
    ).hide();
};

// ================================
// EXCLUIR
// ================================
window.excluirProduto = function (index) {

    const db = getDB();
    db.produtos.splice(index, 1);
    saveDB(db);
    renderizarProdutos();
};

// ================================
// EDITAR
// ================================
window.editarProduto = function (index) {

    const db = getDB();
    const produto = db.produtos[index];

    editandoIndex = index;

    document.getElementById("nome").value = produto.nome;
    document.getElementById("descricao").value = produto.descricao;
    document.getElementById("preco").value = produto.preco;
    document.getElementById("categoria").value = produto.categoria;

    document.getElementById("preview").src = produto.imagem;
    imagemBase64 = produto.imagem.startsWith("data:") ? produto.imagem : "";

    new bootstrap.Modal(document.getElementById("modalProduto")).show();
};

// ================================
// INICIA
// ================================
renderizarProdutos();
