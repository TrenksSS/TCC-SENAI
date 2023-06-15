

function am() {
    let card = document.querySelector("#ham")
    if (card.style.display = "none") {
        card.style = "display:flex"
    }
    else {
        card.style = "display:none"
    }
}

function cr() {
    let card = document.querySelector("#cardr")
    card.style = "display:none"
}

function ca() {
    let card = document.querySelector("#cardr")
    card.style = "display:flex"

}
const datap = document.querySelector("#datap")
const part = document.querySelector("#partida")
const dest = document.querySelector("#destino")

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

}

function comp() {
    alert("compra realisada ✅")
}

const list = document.querySelector('#passagens')
function loadPassagens() {

    fetch("http://localhost:2550/passagens")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            data.forEach(todo => {
                console.log(todo)
                let novoItem = document.querySelector(".dest").cloneNode(true);

                novoItem.classList.remove("model");

                novoItem.querySelector(".datap").innerHTML = todo.tipo;
                novoItem.querySelector(".pida").innerHTML = todo.valor;
                novoItem.querySelector(".pvolta").innerHTML = todo.id_voo;
                console.log(novoItem.querySelector(".datap").innerHTML)

                list.appendChild(novoItem);
            });
        });
}

function voltarTela() {
    window.location.href = '../funcionarios/funcionario.html';

}

function load() {
    verify()
    teste()
    loadPassagens()
}

function teste() {
    document.querySelector('.datap').innerHTML = "opa"
}

function verify() {
    var funcinfo = JSON.parse(localStorage.getItem("@funinfo"))
    if (funcinfo == null) {
        document.querySelector('.volt').style.display = 'none'
    } else {
        document.querySelector('.volt').style.display = 'flex'
    }
}