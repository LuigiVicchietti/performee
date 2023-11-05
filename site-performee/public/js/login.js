const target = document.querySelectorAll("[element-anime]")
    , esquerda = document.getElementById("Esquerda")
    , direita = document.getElementById("Direita")
    , btnChange = document.querySelectorAll(".change");

const changeLogin = () => {
    esquerda.classList.toggle("showing");
    direita.classList.toggle("hide");
}

const rolagem = () => {
    const windowTop = window.pageYOffset + (window.innerHeight * 0.9);

    target.forEach(e => {
        const elementTop = e.getBoundingClientRect().top + window.pageYOffset;
        if (windowTop > elementTop) {
            e.classList.add("animate");
        } else {
            e.classList.remove("animate");
        }
    });
}


if (window.screen.width <= 700) {
    const arrowRight = document.getElementById("SetaVolta");
    arrowRight.setAttribute('src', './assets/icons/arrow_back.png');
}

if (window.screen.width <= 500) {
const submitContainer = document.querySelector(".submit-container");
            submitContainer.innerHTML = `
            <div class="esqueci-senha">
                <span>Esqueceu a senha?</span>
                <a href="#">Clique aqui</a>
            </div>
            <button class="select-disable" id="BtnClient">
                ENTRAR
            </button>
            `;
}

//Client
function entrarClient() {
    var identityVar = InputClientEmail.value;
    var senhaVar = InputClientSenha.value;

    if (identityVar == "" || senhaVar == "") {
        console.log("Tem algo em branco...")
        return false;
    }

    fetch('/usuario/autenticar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            identityServer: identityVar,
            senhaServer: senhaVar
        })
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.idAdmin;

                setTimeout(() => {
                    window.location = './area-restrita/dash-geral.html';
                }, 1000);
            });
        } else {
            console.log("Houve um erro ao tentar realizar o login!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })

}

function entrar() {
    var identityVar = InputAdmIdentity.value;
    var senhaVar = InputAdmSenha.value;

    if (identityVar == "" || senhaVar == "") {
        console.log("Tem algo em branco...")
        return false;
    }

    fetch('/administrador/autenticar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            identityServer: identityVar,
            senhaServer: senhaVar
        })
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.idAdmin;

                setTimeout(() => {
                    window.location = './area-restrita/dash-geral.html';
                }, 1000);
            });
        } else {
            console.log("Houve um erro ao tentar realizar o login!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })

}

window.addEventListener('load', rolagem);
btnChange.forEach(e => {
    e.addEventListener('click', changeLogin);
});