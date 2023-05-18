const listaVoo = document.querySelector(".divCards");

let voo = [];
let veiculo = [];

var funcinfo = JSON.parse(localStorage.getItem("funcionario"))
const nomeFunc = document.querySelector("#nomeFunc")
const fotoFunc = document.querySelector("#imgFunc")



function onLoad() {
    loadVoo()
    fotoFunc.src = "../../../uploads/" + funcinfo.fotoPerfil
    nomeFunc.innerHTML = funcinfo.nome

}


function loadVoo() {

    const options = { method: 'GET' }

    fetch("http://localhost:2550/voos", options)
        .then(res => res.json())
        .then(res => {
            voo = res;
            preencherVoo()
        }
        )
        .catch(err => console.error(err))

        fetch("http://localhost:2550/veiculos", options)
        .then(res => res.json())
        .then(res => {
            veiculo = res;
        }
        )
        .catch(err => console.error(err))
}

function preencherVoo() {
// Cria o elemento HTML div

// Cria o elemento HTML div
const divCardPrinModel = document.createElement("div");
divCardPrinModel.classList.add("cardPrin", "model");

const divCardVoo = document.createElement("div");
divCardVoo.classList.add("cardVoo");

const spanDestino = document.createElement("span");
spanDestino.innerText = "Destino: ";

const spanDestinoValue = document.createElement("span");
spanDestinoValue.id = "spanDestino";
spanDestino.appendChild(spanDestinoValue);


const spanDataHora = document.createElement("span");
spanDataHora.innerText = "Data: ";

const spanDataHoraValue = document.createElement("span");
spanDataHoraValue.id = "spanDataHora";
spanDataHora.appendChild(spanDataHoraValue);

const spanDescricao = document.createElement("span");
spanDescricao.innerText = "Descrição: ";

const spanDescricaoValue = document.createElement("span");
spanDescricaoValue.id = "spanDescricao";
spanDescricao.appendChild(spanDescricaoValue);

divCardVoo.appendChild(spanDestino);
divCardVoo.appendChild(spanDataHora);
divCardVoo.appendChild(spanDescricao);

divCardPrinModel.appendChild(divCardVoo);



// Configura a função preencherVoo()
  voo.forEach((v) => {
    let linha = divCardPrinModel.cloneNode(true);
    linha.classList.remove("model");

    linha.querySelector("#spanDestino").innerHTML = v.destino;
    linha.querySelector("#spanDataHora").innerHTML =
      v.data_saida.slice(8, 10) +
      "/" +
      v.data_saida.slice(5, 7) +
      "/" +
      v.data_saida.slice(0, 4) +
      "ㅤ" +
      v.data_saida.slice(11, 19);
    linha.querySelector("#spanDescricao").innerHTML = v.descricao;
    listaVoo.appendChild(linha);
  });
}




var search_btn = document.querySelector('.buscarInp')
const input_Busca = document.querySelector('.buscarInp')
const tabela_Voo = document.querySelector('.divCards')

search_btn.addEventListener('keyup', () => {

    let expressao = input_Busca.value.toLowerCase() // convertendo para lowercase


    let linhas = tabela_Voo.getElementsByClassName('cardPrin')


    for (let posicao in linhas) {
        if (true === isNaN(posicao)) {
            continue
        }

        let conteudoDaLinha = linhas[posicao].innerHTML.toLowerCase() // convertendo para lowercase



        if (true === conteudoDaLinha.includes(expressao)) {
            linhas[posicao].style.display = 'flex'
        } else {
            let conteudoDaLinhaUpper = linhas[posicao].innerHTML.toUpperCase() // convertendo para uppercase
            if (conteudoDaLinhaUpper.includes(expressao.toUpperCase())) { // comparando com expressao em uppercase
                linhas[posicao].style.display = 'flex'
            } else {
                linhas[posicao].style.display = 'none'
            }
        }

    }

})



function removeModelCad(){
    document.querySelector('.opa').classList.toggle('model')
}

function cadastroP(){

    const myForm = document.getElementById('myForm')
    myForm.addEventListener('submit', function (event) {
      event.preventDefault();
      console.log("oi")
      const formData = new FormData(myForm);
    
      fetch('http://localhost:2550/passageiros/crypt', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    });
}


// Seleciona os elementos do DOM
const botaoAbrir = document.getElementById('abrir-modal');
const botaoFechar = document.getElementById('fechar-modal');
const modal = document.querySelector('.modal');

botaoAbrir.addEventListener('click', () => {
  botaoAbrir.classList.add('model')
  botaoFechar.classList.remove('model')
  modal.classList.add('aberto');
});

// Adiciona um evento de clique ao botão de fechamento do modal
botaoFechar.addEventListener('click', () => {
  modal.classList.remove('aberto');
  botaoAbrir.classList.remove('model')
  botaoFechar.classList.add('model')
  
});

    
var fileUpload = document.getElementById('file-upload');
var uploadLabel = document.getElementById('upload-label');

fileUpload.addEventListener('change', function() {
  uploadLabel.innerHTML = this.files[0].name;
});