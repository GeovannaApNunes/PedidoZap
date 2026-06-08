/*import { initializeApp } from "";
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

// 🔒 proteção login
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login_proprietario.html";
    }
});

window.logout = async function () {
    await signOut(auth);
    window.location.href = "login_proprietario.html";
};
*/

// ================================
// 🧠 MINI BANCO DE DADOS (JSON)
// ================================

const DB_KEY = "pedidozap_db";

function getDB() {
    return JSON.parse(localStorage.getItem(DB_KEY)) || {
        produtos: [],
        pedidos: [],
        feedbacks: []
    };
}

function saveDB(db) {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
}



// ================================
// PRODUTOS
// ================================

let editandoIndex = null;
let imagemBase64 = "";

const cards = document.getElementById("cards-produtos");



// PREVIEW IMAGEM
document.getElementById("imagemInput").addEventListener("change", function (event) {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        imagemBase64 = e.target.result;
        document.getElementById("preview").src = imagemBase64;
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

            <img src="${produto.imagem}" class="card-img-top">

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
        id: Date.now(),
        nome: document.getElementById("nome").value,
        descricao: document.getElementById("descricao").value,
        preco: document.getElementById("preco").value,
        categoria: document.getElementById("categoria").value,
        imagem: imagemBase64 || "img/Vector.png"
    };

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
    imagemBase64 = produto.imagem;

    new bootstrap.Modal(document.getElementById("modalProduto")).show();
};



// ================================
// INICIA
// ================================
renderizarProdutos();