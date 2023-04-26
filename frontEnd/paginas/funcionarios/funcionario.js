const divModelo = document.querySelector(".cardPrin");
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

    veiculo.forEach(vv => {
        console.log(vv.cod_Idf)
let linha = divModelo.cloneNode(true)
    linha.classList.remove("model")

    linha.querySelector('#spanCodVeiculo').innerHTML = vv.cod_Idf

    listaVoo.appendChild(linha);

})
    voo.forEach(v => {
        let linha = divModelo.cloneNode(true)
        linha.classList.remove("model")

         linha.querySelector('#spanDestino').innerHTML = v.destino
         linha.querySelector('#spanValor').innerHTML = "R$" + v.valor
         linha.querySelector('#spanDataHora').innerHTML = v.data_saida.slice(8,10) + "/" + v.data_saida.slice(5,7) + "/" + v.data_saida.slice(0,4)
         + "ㅤ" + v.data_saida.slice(11,19)
         linha.querySelector('#spanDescricao').innerHTML = v.descricao

        listaVoo.appendChild(linha);

    })
}


var search_btn = document.querySelector('.buscarInp')
const input_Busca = document.querySelector('.buscarInp')
const tabela_Voo = document.querySelector('.divCards')

search_btn.addEventListener('keyup', () => {

    let expressao = input_Busca.value.toLowerCase() // convertendo para lowercase
    console.log(expressao)


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
    document.querySelector('.opa').classList.remove('model')
}