fetch("http://localhost:2550/passagens")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        data.forEach(todo => {
            let novoItem = document.querySelector(".passagens").cloneNode(true);

            novoItem.classList.remove("model");

            novoItem.querySelector("#datap").append(todo.modelo);
            novoItem.querySelector("#pida").append(todo.status);
            novoItem.querySelector("#pvolta").append(todo.estado);
            

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
        alert ( "compra reaisada ✅" )
    }
