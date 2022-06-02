/* Unidade 1
- Criação de variáveis com let e const
- Criação do array que irá simular um banco de dados para armazenar as tarefas
- Criação e utilização de funções.
- Criação de objetos literais estáticos para simular registros no banco de dados 
- Inclusão desses registros no array


			Unidade 2
- Manipulação através de listeners
- Manipulação de evento no botão de adicionar, concluir e excluir tarefa
- Manipulação de eventos no combo filtro de tarefas. */

const logado = JSON.parse(sessionStorage.getItem("logado"));

if (logado) {
  // Array dos meus objetos de estudos
  let taskArray = [];

  // Function formulario do meu input, if o usuario não digita nada , Alert + erro no console.log
  const inputbtn = document.getElementById("add-input-button");
  const tasks = localStorage.getItem("toDoList.tasks");
  if (tasks) {
    taskArray = JSON.parse(tasks);
    addElementToList(taskArray);
  }

  inputbtn.addEventListener("click", (evt) => {
    evt.preventDefault();

    const activity = document.getElementById("task-input").value;
    if (activity == "") {
      alert("Preencha seus Estudos");
      console.log("error 404: Campo vazio");
      return false;
    } else {
      console.log(activity);
      return true;
    }
  });

  // se o usuario não digita nada não mostrar o input vaziu na tela, e if activity + Alert + console.log('error 404:')
  const getInputs = (event) => {
    let taskName = document.getElementById("task-input").value;
    event.preventDefault();
    if (taskName >= 0) {
      return false;
    }

    taskArray.push({ taskName, status: "Pendente" });
    console.log({ taskArray });
    addElementToList(taskArray); // Chamando minha function Adicionar na Linha 64
    atualizarStorage();
  };

  // Escutando o click do meu todo-button submit
  const addInput = document.getElementById("add-input-button");
  addInput.addEventListener("click", getInputs); //Obter meu todo-input

  // function adicionar o resultado digitado do task-input na tela
  function addElementToList(array) {
    let tasksList = document.querySelector("#todo-ul");

    tasksList.innerHTML = ``;

    array.map((elemento, indice) => {
      if (elemento.status === "Finalizada") {
        tasksList.innerHTML +=
          //   Criando os elementos na tela com javascript
          `
        <div class="todo completed">
          <li class="todo-item">${elemento.taskName}</li>
          <button class="check-btn" id='${indice}'><i class="fas fa-check" aria-hidden="true"></i></button>
          <button class="trash-btn" id='${indice}'><i class="fas fa-trash" aria-hidden="true"></i></button>
        </div>
      `;
      } else {
        tasksList.innerHTML += `
        <div class="todo">
          <li class="todo-item">${elemento.taskName}</li>
          <button class="check-btn" id='${indice}'><i class="fas fa-check" aria-hidden="true"></i></button>
          <button class="trash-btn" id='${indice}'><i class="fas fa-trash" aria-hidden="true"></i></button>
        </div>
      `;
      }
    });
    document.querySelector("#task-input").value = "";
  }

  //Function deletar elemento da tela
  let deletar = document.querySelectorAll("trash.btn");
  const btnDeletar = (event) => {
    const item = event.target;
    const itemId = item.id;

    if (item.classList.value === "trash-btn") {
      taskArray.splice(itemId, 1);
      addElementToList(taskArray);
      atualizarStorage();
    }
  };
  deletar = document.addEventListener("click", btnDeletar);

  // Function checkItem - Finalizada
  function checkItem() {
    let checkBtn = document.querySelectorAll(".check-btn");

    for (let i = 0; i < checkBtn.length; i++) {
      checkBtn[i].onclick = () => {
        let whatDiv = checkBtn[i].parentElement;
        whatDiv.setAttribute("class", "todo completed");
        taskArray[i].status = "Finalizada";
      };
    }
  }
  checkBtn = document.addEventListener("click", checkItem);

  let comboFilter = document.getElementById("combo-filter");

  const filterTasks = () => {
    let option = comboFilter.options[comboFilter.selectedIndex].text;
    // Function Elementos Finalizadas && Pendente
    if (option === "Finalizadas") {
      let taskFilterFinalizadas = taskArray.filter((task) => {
        return task.status === "Finalizada";
      });
      localStorage.setItem(
        "toDoList.taskFinalizadas",
        JSON.stringify(taskFilterFinalizadas)
      );
      addElementToList(taskFilterFinalizadas);
    } else if (option === "Não Finalizadas") {
      let taskFilterPendentes = taskArray.filter((task) => {
        return task.status === "Pendente";
      });
      localStorage.setItem(
        "toDoList.taskPendentes",
        JSON.stringify(taskFilterPendentes)
      );
      addElementToList(taskFilterPendentes);
    } else {
      addElementToList(taskArray);
    }
  };
  const atualizarStorage = () => {
    localStorage.setItem("toDoList.tasks", JSON.stringify(taskArray));
  };

  const filterTodo = document.querySelector("#combo-filter");
  filterTodo.addEventListener("click", filterTasks);
} else {
  window.location = "login.html";
}

// const checkAndDeleteItem = (event) => {
//     const item = event.target
//     console.log(item)
//     console.log(taskArray)
//     const itemId = item.id
//     const todoList = item.parentElement

//     if(item.classList.value === "trash-btn") {
//         taskArray.splice(itemId, 1)
//         addElementToList(taskArray)
//         atualizarStorage()
//     }

//     buttonCheck.addEventListener('click', checkAndDeleteItem)
//     buttonCheck.addEventListener('click', checkAndDeleteItem)
// }
