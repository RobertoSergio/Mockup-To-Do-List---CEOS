class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    adicionarTask(task) {
        this.tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    removerTask(index) {
        if (this.tasks.length > 0) {
            this.tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
    }

    setTasks(tasks) {
        this.tasks = tasks;
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    getTasks() {
        return this.tasks;
    }
}

var taskManager = new TaskManager();

// taskManager.adicionarTask({ title: 'Acordar', completed: false });
// taskManager.removerTask();
// taskManager.adicionarTask({ title: 'Almoço', time: '12:00', descricao: 'Comprar comida' });

// Função para mostrar a lista de tarefas na página enquanto ordena a lista de tarefas pelo horário 
// e muda o índice de cada tarefa pela ordem do horário
function renderTasks() {
    let tasks = taskManager.getTasks();
    

    tasks.sort((ativ1, ativ2) => {

        const [Hora1, Minuto1] = ativ1.time.split(':').map(Number);
        const [Hora2, Minuto2] = ativ2.time.split(':').map(Number);
        

        if (Hora1 < Hora2) return -1;
        if (Hora1 > Hora2) return 1;
        

        if (Minuto1 < Minuto2) return -1;
        if (Minuto1 > Minuto2) return 1;
        
        return 0;
    });

    taskManager.setTasks(tasks);

    const taskList = document.getElementById('Lista_de_tarefas');
    taskList.innerHTML = '';
    tasks.forEach(function(task) {
        const div = document.createElement('div');
        div.classList.add('Tarefa');
        div.innerHTML = `
            <p> ${task.title}</p>
            <p> ${task.time}</p>
        `;
        if (task.completed) {
            div.style.textDecoration = 'line-through';
        }
        taskList.appendChild(div);
    });
}

// Função para pesquisar na lista
function renderFilteredTasks(filteredTasks) {
    const taskList = document.getElementById('Lista_de_tarefas');
    taskList.innerHTML = '';
    filteredTasks.forEach(function(task) {
        const div = document.createElement('div');
        div.classList.add('Tarefa');
        div.innerHTML = `
            <p> ${task.title}</p>
            <p> ${task.time}</p>
        `;
        if (task.completed) {
            div.style.textDecoration = 'line-through';
        }
        taskList.appendChild(div);
    });
}

// Ao entrar na página carrega a função rendertasks
window.addEventListener('load', renderTasks);
