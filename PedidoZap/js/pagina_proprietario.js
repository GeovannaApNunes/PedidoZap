// PRODUTOS
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// IMAGEM
let imagemBase64 = "";

// INDEX DE EDIÇÃO
let editandoIndex = null;

// CONTAINER
const cards = document.getElementById("cards-produtos");

// PREVIEW DA IMAGEM
document
  .getElementById("imagemInput")
  .addEventListener("change", function (event) {
    const arquivo = event.target.files[0];

    if (arquivo) {
      const reader = new FileReader();

      reader.onload = function (e) {
        imagemBase64 = e.target.result;

        document.getElementById("preview").src = imagemBase64;
      };

      reader.readAsDataURL(arquivo);
    }
  });

// RENDERIZA PRODUTOS
function renderizarProdutos() {
  // REMOVE APENAS OS CARDS DINÂMICOS
  document.querySelectorAll(".produto-card").forEach((card) => card.remove());

  // PERCORRE PRODUTOS
  produtos.forEach((produto, index) => {
    const col = document.createElement("div");

    col.classList.add("col", "produto-card");

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

    // ADICIONA ANTES DO CARD FIXO
    cards.insertBefore(col, cards.lastElementChild);
  });
}

// ABRIR MODAL
function abrirModal() {
  // RESET EDIÇÃO
  editandoIndex = null;

  // LIMPA CAMPOS
  document.getElementById("nome").value = "";

  document.getElementById("descricao").value = "";

  document.getElementById("preco").value = "";

  document.getElementById("categoria").value = "Pizza";

  // IMAGEM PADRÃO
  document.getElementById("preview").src = "img/Vector.png";

  imagemBase64 = "";

  // ABRE MODAL
  const modal = new bootstrap.Modal(document.getElementById("modalProduto"));

  modal.show();
}

// SALVAR PRODUTO
function salvarProduto() {
  const produto = {
    nome: document.getElementById("nome").value,

    descricao: document.getElementById("descricao").value,

    preco: document.getElementById("preco").value,

    categoria: document.getElementById("categoria").value,

    imagem: imagemBase64 || "img/Vector.png",
  };

  // SE ESTÁ EDITANDO
  if (editandoIndex !== null) {
    produtos[editandoIndex] = produto;

    editandoIndex = null;
  }

  // NOVO PRODUTO
  else {
    produtos.push(produto);
  }

  // SALVA
  localStorage.setItem("produtos", JSON.stringify(produtos));

  // ATUALIZA TELA
  renderizarProdutos();

  // FECHA MODAL
  bootstrap.Modal.getInstance(document.getElementById("modalProduto")).hide();
}

// EXCLUIR PRODUTO
function excluirProduto(index) {
  produtos.splice(index, 1);

  localStorage.setItem("produtos", JSON.stringify(produtos));

  renderizarProdutos();
}

// EDITAR PRODUTO
function editarProduto(index) {
  const produto = produtos[index];

  // GUARDA INDEX
  editandoIndex = index;

  // PREENCHE CAMPOS
  document.getElementById("nome").value = produto.nome;

  document.getElementById("descricao").value = produto.descricao;

  document.getElementById("preco").value = produto.preco;

  document.getElementById("categoria").value = produto.categoria;

  // IMAGEM
  document.getElementById("preview").src = produto.imagem;

  imagemBase64 = produto.imagem;

  // ABRE MODAL
  const modal = new bootstrap.Modal(document.getElementById("modalProduto"));

  modal.show();
}

// INICIA
renderizarProdutos();
