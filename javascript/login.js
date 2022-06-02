const usuarioEsperado = 'admin';
const senhaEsperada = 'e10adc3949ba59abbe56e057f20f883e';

const form = document.querySelector('form');

form.addEventListener('submit', function(event){
    event.preventDefault();

    const usuario = form.querySelector('#input_usuario').value
    const senha = form.querySelector('#input_senha').value

    if (usuarioValido(usuario, senha)) {
        // adicionar uma variavel na sessão que indique que o cara esta logado
        sessionStorage.setItem('logado', JSON.stringify(true));
        console.log(usuario, senha)
        // redirecionar para a pagina index
        window.location = 'index.html';
    }else{
        sessionStorage.setItem('logado', JSON.stringify(false));
        alert('Usuário ou senha inválidos!');
    }
});

const minhaMD5 = (senha) =>{
    if(senha == '123456'){
        return "e10adc3949ba59abbe56e057f20f883e"
    }else{
        return senha
    }
}

const usuarioValido = (usuario, senha) => {
    return usuario == "admin" && minhaMD5(senha) == senhaEsperada
}