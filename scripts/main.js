let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let cancel = document.getElementById("cancel-button");

form.addEventListener("submit", (e) => {
    console.log("'Add' button pressed.");
    e.preventDefault();
    formValidation();
});

let formValidation = () => {
    if (textInput.value === "") {
        console.log("Failure. Blank input");
        msg.innerHTML = "Título da atividade não pode ser nulo";
    } else {
        console.log("success");
        msg.innerHTML = "";

        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })();
        
    }
};

let data = [];

let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });

    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);

    createTasks();
}

let createTasks = () => {
    tasks.innerHTML = "";

    data.map((x, y) => {
        if (x.address == null) {
            x.address = "Sem endereço";
        }

        return (tasks.innerHTML += `
            <div id=${y}>
                <span class="fw-bold" id="task-title${y}">${x.text}</span>
                <span class="small text-secondary" id="task-date${y}">${x.date}</span>
                <i onClick="expandTask(${y})" class="fa-solid fa-circle-chevron-down expand-button" 
                id="expand-button${y}"></i>
                <i onClick="hideTask(${y})" class="fa-solid fa-circle-chevron-down hide-button" 
                id="hide-button${y}" style="transform: rotate(180deg);display: none;"></i>
                <div class="more-task" style="display: none;" id="more${y}">
                    <p id="task-description${y}" >${x.description}</p>
                    <i class="fa-solid fa-location-dot"></i> <p>${x.address}</p>

                    <span class="options">
                        <i onClick="editTask(${y})" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                        <i onClick="deleteTask(${y});createTasks()" class="fas fa-trash-alt"></i>
                    </span>
                </div>
            </div>
        `);
    });

    resetForm();
}

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};

let deleteTask = (index) => {
    let currentTask = document.getElementById(index);
    currentTask.remove();
    
    data.splice(currentTask.id, 1);
    
    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
};

let expandTask = (index) => {
    let currentTask = document.getElementById("more" + index);
    let expandButton = document.getElementById("expand-button" + index);
    let hideButton = document.getElementById("hide-button" + index);

    currentTask.style.display = "block";
    expandButton.style.display = "none";
    hideButton.style.display = "inline";
};

let hideTask = (index) => {
    let currentTask = document.getElementById("more" + index);
    let expandButton = document.getElementById("expand-button" + index);
    let hideButton = document.getElementById("hide-button" + index);

    currentTask.style.display = "none";
    expandButton.style.display = "inline";
    hideButton.style.display = "none";
};

let editTask = (index) => {
    // let selectedTask = e.parentElement.parentElement.parentElement;

    textInput.value = document.getElementById("task-title" + index).innerHTML;
    dateInput.value = document.getElementById("task-date" + index).innerHTML;
    textarea.value = document.getElementById("task-description" + index).innerHTML;

    deleteTask(index);
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
})();