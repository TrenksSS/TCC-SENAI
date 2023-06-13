const listaVoo = document.querySelector(".divCards")
const divClonePass = document.querySelector(".cardClone")
const divAppendPass = document.querySelector(".cardsPassageiro")

let voo = []
let passageiro = []

var funcinfo = JSON.parse(localStorage.getItem("@funinfo"))
const nomeFunc = document.querySelector("#nomeFunc")
const fotoFunc = document.querySelector("#imgFunc")
const cargoFunc = document.querySelector("#cargoFunc")
const nivelFunc = document.querySelector("#nivelFunc")
const statusFunc = document.querySelector("#statusFunc")




function onLoad() {
  loadVoo()
  loadPassageiro()
  fotoFunc.src = "../../../uploads/" + funcinfo.ufoto
  nomeFunc.innerHTML = funcinfo.uname
  cargoFunc.innerHTML = funcinfo.ucargo
  nivelFunc.innerHTML = funcinfo.nivel
  statusFunc.innerHTML = funcinfo.ustatus



  if (nivelFunc.innerHTML == 2 || nivelFunc.innerHTML == 3) {
    nivelFunc.style.backgroundColor = "#FFA500"
    nivelFunc.title = "médio"
  } else if (nivelFunc.innerHTML == 4 || nivelFunc.innerHTML == 5) {
    nivelFunc.style.backgroundColor = "	#228B22"
    nivelFunc.title = "Alto"
  }

}


function loadVoo() {

  const options = { method: 'GET' }

  fetch("http://localhost:2550/voos", options)
    .then(res => res.json())
    .then(res => {
      voo = res
      preencherVoo()
    })
    .catch(err => console.error(err))

}

function loadPassageiro() {
  const options = { 'method': 'GET' }
  fetch("http://localhost:2550/passageiros", options)
    .then(res => res.json())
    .then(res => {
      passageiro = res
      preecherPass()
    })
    .catch(err => console.error(err))
}

function preencherVoo() {

  const divCardPrinModel = document.createElement("div")
  divCardPrinModel.classList.add("cardPrin", "model")

  const divCardVoo = document.createElement("div")
  divCardVoo.classList.add("cardVoo")

  const spanDestino = document.createElement("span")
  spanDestino.innerText = "Destino: "

  const spanDestinoValue = document.createElement("span")
  spanDestinoValue.id = "spanDestino"
  spanDestino.appendChild(spanDestinoValue)


  const spanDataHora = document.createElement("span")
  spanDataHora.innerText = "Data: "

  const spanDataHoraValue = document.createElement("span")
  spanDataHoraValue.id = "spanDataHora"
  spanDataHora.appendChild(spanDataHoraValue)

  const spanDescricao = document.createElement("span")
  spanDescricao.innerText = "Descrição: "

  const spanDescricaoValue = document.createElement("span")
  spanDescricaoValue.id = "spanDescricao"
  spanDescricao.appendChild(spanDescricaoValue)

  divCardVoo.appendChild(spanDestino)
  divCardVoo.appendChild(spanDataHora)
  divCardVoo.appendChild(spanDescricao)

  divCardPrinModel.appendChild(divCardVoo)



  // Configura a função preencherVoo()
  voo.forEach((v) => {
    let linha = divCardPrinModel.cloneNode(true)
    linha.classList.remove("model")

    linha.querySelector("#spanDestino").innerHTML = v.destino
    linha.querySelector("#spanDataHora").innerHTML =
      v.data_saida.slice(8, 10) +
      "/" +
      v.data_saida.slice(5, 7) +
      "/" +
      v.data_saida.slice(0, 4) +
      "ㅤ" +
      v.data_saida.slice(11, 19)
    linha.querySelector("#spanDescricao").innerHTML = v.descricao
    listaVoo.appendChild(linha)



  })
}

const  btnConfirm = document.querySelector("#confirmEdit") 

function preecherPass() {
  passageiro.forEach((ps) => {
    console.log(ps)
    let linha = divClonePass.cloneNode(true)
    linha.querySelector("#imgPassageiro").src = "../../../uploads/" + ps.imagem
    linha.querySelector("#nomePassageiro").innerHTML = ps.nome
    linha.querySelector("#cpfPassageiro").innerHTML = ps.cpf
    linha.querySelector("#passaportePassageiro").innerHTML = ps.passaporte
    linha.querySelector("#nacionalidadePassageiro").innerHTML = ps.nacionalidade
    linha.querySelector("#emailPassageiro").innerHTML = ps.email
    divAppendPass.appendChild(linha)

    linha.querySelector("#btneditP").addEventListener('click', () =>{
      abremodalEdit()
      btnConfirm.onclick = () => {editarPass(ps.id)}
      document.querySelector("#nomeeditP").value = ps.nome
      document.querySelector("#cpfeditP").value = ps.cpf
      document.querySelector("#naeditP").value = ps.nacionalidade
      document.querySelector("#paeditP").value = ps.passaporte
      document.querySelector("#emaileditP").value = ps.email
      document.querySelector(".imgeditP").src = "../../../uploads/" + ps.imagem

      document.querySelector("#nascimeditP").value = ps.data_nascimento.slice(0,10)


    })

  })
}


var search_btn = document.querySelector('.buscarInp')
const input_Busca = document.querySelector('.buscarInp')
const tabela_Voo = document.querySelector('.divCards')

search_btn.addEventListener('keyup', () => {

  let expressao = input_Busca.value.toLowerCase() // convertendo para lowercase


  let linhas = tabela_Voo.getElementsByClassName('cardPrin')

  console.log("oi")

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



function removeModelCad() {
  document.querySelector('.opa').classList.toggle('model')
}

function cadastroP() {

  const myForm = document.getElementById('myForm')
  myForm.addEventListener('submit', function (event) {
    event.preventDefault()
    console.log("oi")
    const formData = new FormData(myForm)

    fetch('http://localhost:2550/passageiros/crypt', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error(error)
      })
  })
}


// Seleciona os elementos do DOM
const botaoAbrir = document.getElementById('abrir-modal')
const botaoFechar = document.getElementById('fechar-modal')
const modal = document.querySelector('.modal')

botaoAbrir.addEventListener('click', () => {
  botaoAbrir.classList.add('model')
  botaoFechar.classList.remove('model')
  modal.classList.add('aberto')
})

// Adiciona um evento de clique ao botão de fechamento do modal
botaoFechar.addEventListener('click', () => {
  modal.classList.remove('aberto')
  botaoAbrir.classList.remove('model')
  botaoFechar.classList.add('model')

})


var fileUpload = document.getElementById('file-upload')
var uploadLabel = document.getElementById('upload-label')

fileUpload.addEventListener('change', function () {
  uploadLabel.innerHTML = this.files[0].name
})


function modelPassageiro() {
  document.querySelector('.divCards').classList.add('model')
  document.querySelector('.btnCadastroPass').classList.remove('model')
  document.querySelector('.cm').classList.remove('model')
  modal.classList.remove('aberto')
  botaoAbrir.classList.remove('model')
  botaoFechar.classList.add('model')

}

function modelPassagens() {
  document.querySelector('.divCards').classList.remove('model')
  document.querySelector('.cm').classList.add('model')
  document.querySelector('.btnCadastroPass').classList.add('model')
  modal.classList.remove('aberto')
  botaoAbrir.classList.remove('model')
  botaoFechar.classList.add('model')
}

function abremodalEdit(){
  console.log("oi")
   document.querySelector(".modelEdit").classList.toggle('model')
}


function editarPass(id){
     
  let body = {
    'nome':   document.querySelector("#nomeeditP").value ,
    'cpf':document.querySelector("#cpfeditP").value,
    'nacionalidade':document.querySelector('#naeditP').value,
    'passaporte':document.querySelector('#paeditP').value,
    'email':document.querySelector('#emaileditP').value

}
const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
}
options.body = JSON.stringify(body)
if (body.nome.length > 0 && body.cpf.length > 0 && body.nacionalidade.length > 0 && body.passaporte.length > 0 && body.email.length > 0) {
    fetch('http://localhost:2550/passageiros/'+id, options)
        .then(resp => resp.status)
        .then(data => {
            if (data == 200) {

                alert('Editado com SUCESSO! 😀✔')
                setTimeout(() => { window.location.reload() }, 500);
                
            } else {
                
            }
        })
} else {
    alert("Preencha todos os campos obrigatórios ❗")
}

}