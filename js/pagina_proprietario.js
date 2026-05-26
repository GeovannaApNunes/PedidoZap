// FIREBASE
import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

    getAuth,

    signOut,

    onAuthStateChanged

}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



// CONFIG FIREBASE
const firebaseConfig = {

    apiKey: "",

    authDomain: ""

    projectId: "",

    storageBucket: "",

    messagingSenderId: "",

    appId: ""

};



// INICIA FIREBASE
const app =
    initializeApp(firebaseConfig);

const auth =
    getAuth(app);




// PROTEGE PÁGINA
onAuthStateChanged(auth, (user) => {

    if(!user){

        window.location.href =
            "login_proprietario.html";
    }

});




// LOGOUT
window.logout = async function(){

    try{

        await signOut(auth);



        window.location.href =
            "login_proprietario.html";

    }

    catch(error){

        console.log(error);

    }

};





// PRODUTOS
let produtos =
    JSON.parse(
        localStorage.getItem("produtos")
    ) || [];



// IMAGEM
let imagemBase64 = "";



// INDEX EDIÇÃO
let editandoIndex = null;



// CONTAINER
const cards =
    document.getElementById(
        "cards-produtos"
    );





// PREVIEW IMAGEM
document
.getElementById("imagemInput")
.addEventListener("change", function(event){

    const arquivo =
        event.target.files[0];



    if(arquivo){

        const reader =
            new FileReader();



        reader.onload = function(e){

            imagemBase64 =
                e.target.result;



            document.getElementById(
                "preview"
            ).src = imagemBase64;

        };



        reader.readAsDataURL(
            arquivo
        );

    }

});





// RENDERIZA
function renderizarProdutos(){

    // REMOVE ANTIGOS
    document
    .querySelectorAll(".produto-card")
    .forEach((card) => card.remove());



    // LOOP
    produtos.forEach((produto, index) => {

        const col =
            document.createElement("div");



        col.classList.add(
            "col",
            "produto-card"
        );



        col.innerHTML = `

        <div class="card bg-products h-100">

            <img src="${produto.imagem}"
                 class="card-img-top">

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

                <p>
                    ${produto.categoria}
                </p>

                <button class="btn btn-warning"
                        onclick="editarProduto(${index})">

                    Editar

                </button>

                <button class="btn btn-danger"
                        onclick="excluirProduto(${index})">

                    Excluir

                </button>

            </div>

        </div>

        `;



        // ADICIONA
        cards.insertBefore(
            col,
            cards.lastElementChild
        );

    });

}





// ABRIR MODAL
window.abrirModal = function(){

    // RESET
    editandoIndex = null;



    // LIMPA
    document.getElementById("nome").value = "";

    document.getElementById("descricao").value = "";

    document.getElementById("preco").value = "";

    document.getElementById("categoria").value =
        "Pizza";



    // IMAGEM PADRÃO
    document.getElementById("preview").src =
        "img/Vector.png";



    imagemBase64 = "";



    // ABRE MODAL
    const modal =
        new bootstrap.Modal(
            document.getElementById(
                "modalProduto"
            )
        );



    modal.show();

};






// SALVAR
window.salvarProduto = function(){

    const produto = {

        nome:
            document.getElementById(
                "nome"
            ).value,



        descricao:
            document.getElementById(
                "descricao"
            ).value,



        preco:
            document.getElementById(
                "preco"
            ).value,



        categoria:
            document.getElementById(
                "categoria"
            ).value,



        imagem:
            imagemBase64 ||
            "img/Vector.png"

    };



    // EDITANDO
    if(editandoIndex !== null){

        produtos[editandoIndex] =
            produto;



        editandoIndex = null;

    }

    // NOVO
    else{

        produtos.push(produto);

    }



    // SALVA
    localStorage.setItem(

        "produtos",

        JSON.stringify(produtos)

    );



    // RENDERIZA
    renderizarProdutos();



    // FECHA
    bootstrap.Modal
    .getInstance(
        document.getElementById(
            "modalProduto"
        )
    )
    .hide();

};






// EXCLUIR
window.excluirProduto = function(index){

    produtos.splice(index, 1);



    localStorage.setItem(

        "produtos",

        JSON.stringify(produtos)

    );



    renderizarProdutos();

};






// EDITAR
window.editarProduto = function(index){

    const produto =
        produtos[index];



    // INDEX
    editandoIndex = index;



    // CAMPOS
    document.getElementById("nome").value =
        produto.nome;

    document.getElementById("descricao").value =
        produto.descricao;

    document.getElementById("preco").value =
        produto.preco;

    document.getElementById("categoria").value =
        produto.categoria;



    // IMAGEM
    document.getElementById("preview").src =
        produto.imagem;



    imagemBase64 =
        produto.imagem;



    // MODAL
    const modal =
        new bootstrap.Modal(
            document.getElementById(
                "modalProduto"
            )
        );



    modal.show();

};






// INICIA
renderizarProdutos();
