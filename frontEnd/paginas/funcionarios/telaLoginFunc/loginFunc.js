const uriLogin = "http://localhost:2550/funcionarios/login"
const email = document.querySelector("#email")
const psw = document.querySelector("#psw")
const alertSpan = document.querySelector("#spanAlert")

const login = (err) => {
    // email.value = "hobertAlberto@gmail.com"
    // psw.value = "1234"
    let usuario = {
        "email": email.value,
        "senha":psw.value 
    }

    fetch(uriLogin, {
        'method':'POST',
        'headers': {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(usuario)

    }).then(response => { return response.status, response.json() })
    .then(info => {
        console.log(info)
        if(info != null ) {

            if(info.erro == "Senha inválida"){
                alertSpan.classList.remove('model')
                alertSpan.innerHTML = info.erro
                setTimeout(() => {alertSpan.classList.add('model')}, 750);
            } else if(info.erro == "Funcionário não encontrado"){
                alertSpan.classList.remove('model')
                alertSpan.innerHTML = info.erro
                setTimeout(() => {alertSpan.classList.add('model')}, 750);
            }else if(info.validation == true){
                localStorage.clear();
                localStorage.setItem('funcionario',JSON.stringify({"id": info.uid,"role":info.nivel, "nome":info.uname, "fotoPerfil":info.ufoto}));
                console.log(localStorage)
                window.location.href = "../funcionario.html"
            }
        } else {
            alert(' ❌ Erro no Login:' + info);
        }
    })
}