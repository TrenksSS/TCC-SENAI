fetch("http://localhost:2550/passagens")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        data.forEach(todo => {
            let novoItem = document.querySelector(".vt").cloneNode(true);

            novoItem.classList.remove("model");

            novoItem.querySelector("#modvt").append(todo.modelo);
            novoItem.querySelector("#sta").append(todo.status);
            novoItem.querySelector("#est").append(todo.estado);
            

            list.appendChild(novoItem);
        });
    });

    function am() {
        let card = document.querySelector("#ham")
        if(card.style.display = "none") {
    card.style = "display:flex"
        }
    else{
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

    