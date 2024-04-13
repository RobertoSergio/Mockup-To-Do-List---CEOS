// Definição da classe Users
class Users {
    constructor() {
        this.usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    }

    adicionarUsuario(nome) {
        this.usuarios.push(nome);
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }

    getUsuarios() {
        return this.usuarios;
    }
}

// Instância da classe Users
const users = new Users();

document.getElementById('Botão_add_User').addEventListener('click', function() {
    const nome = document.getElementById('digitar_usuario').value;
    users.adicionarUsuario(nome);
    document.getElementById('digitar_usuario').value = ''; // Limpar o campo de texto
});

// Evento de clique do botão "Listar Usuários"
document.getElementById('Lista_Users').addEventListener('click', function() {
    const usuarios = users.getUsuarios();
    const userList = document.getElementById('User_lista');
    userList.innerHTML = '';
    usuarios.forEach(function(usuario) {
        const li = document.createElement('li');
        li.textContent = usuario;
        userList.appendChild(li);
    });
});
document.getElementById('Lista_Users').addEventListener('click', function() {
    const userList = document.getElementById('User_lista');
    userList.classList.toggle('hidden');
});

// Ao carregar a página, exibir os usuários salvos
window.addEventListener('load', function() {
    const usuarios = users.getUsuarios();
    const userList = document.getElementById('User_lista');
    usuarios.forEach(function(usuario) {
        const li = document.createElement('li');
        li.textContent = usuario;
        userList.appendChild(li);
    });
});

