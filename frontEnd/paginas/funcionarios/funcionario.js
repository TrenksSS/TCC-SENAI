const listaVoo = document.querySelector(".divCards");

let voo = [];
let veiculo = [];


function onLoad() {
    loadVoo()
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

function cadastro(){


        
        let body = {
            "nome": document.querySelector("#nomePass").value,
            "cpf": document.querySelector("#cpfCad").value,
            "passaporte": document.querySelector("#passaporteCad").value,
            "data_nascimento": document.querySelector("#nascimento").value,
            "nacionalidade": document.querySelector("#nacionalidadeCad").value,
            "email": document.querySelector("#emailCad").value,
            "senha": document.querySelector("#senhaCad").value
        }
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        options.body = JSON.stringify(body)
        console.log(body)
        if (body.nome.length > 0 && body.cpf.length > 0 && body.passaporte.length > 0 && body.data_nascimento.length > 0 &&
            body.nacionalidade.length > 0 && body.email.length > 0 && body.senha.length > 0 ) {
            fetch("http://localhost:2550/passageiros/crypt", options)
                .then(resp => resp.status)
                .then(data => {
                    if (data == 200) {
                        alert("Cadastrado com SUCESSO! 😀✔ ")
                        window.location.reload()
                    } else {
                        alert("Erro ao enviar Pedido 🙁❌")
                    }
                })
                .catch(err => alert("❌ Erro ao enviar dados. Erro:" + err));
        } else {
            alert("Preencha todos os campos ❗")
        }
    }
