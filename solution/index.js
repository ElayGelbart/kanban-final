'use strict'
// declartios of global varible we use at serval functions
let taskObj, queryObj;
const spaceAtEndRegex = /[\s]*$/g;
let mockList = document.createElement("li");
let rememberElement;

// add Event Listener to Tasks
const addEventListenerToButtons = () => {

    const deleteButtons = document.querySelectorAll('.deleteButton');
    deleteButtons.forEach(element => {
        element.addEventListener("click", function () {
            deleteTask(element.parentElement.parentElement.getElementsByClassName("task")[0].innerText);
        })
    });

    const checkButtons = document.querySelectorAll('.checkButton');
    checkButtons.forEach(element => {
        element.addEventListener("click", function () {
            ReplaceTaskType("done", element.parentElement.parentElement.getElementsByClassName("task")[0].innerText);
        })
    });

    const sortButtons = document.querySelectorAll('.sortButton');
    sortButtons.forEach(element => {
        element.addEventListener("click", function () {
            element.parentElement.setAttribute("draggable", "true");
        })
    });

}


const addEventListenerToTasks = () => {
    let oldinnerTaskText;

    const taskList = document.querySelectorAll('.task');
    taskList.forEach(element => {

        element.addEventListener("dragstart", function () { //mockList is for task drag be showen for user
            rememberElement = element.innerHTML;
            mockList.classList.add("mocklist");
            mockList.innerHTML = `${element.innerText}`;
            element.style.opacity = "0.3";
            mockList.style.display = "block";
        });

        element.addEventListener("dragenter", function (e) {
            if (!e.target.nextElementSibling) {
                e.target.parentElement.appendChild(mockList);
            }
            else {
                e.target.parentElement.insertBefore(mockList, e.target);
            }
        });

        element.addEventListener("dragend", function () {
            element.style.opacity = "1";
            mockList.innerHTML = rememberElement;
            mockList.className = "task";
            let elementB4orAfter = mockList.previousElementSibling || mockList.nextElementSibling;
            if (elementB4orAfter.innerText == "") {// handle user drag on img or span
                elementB4orAfter = elementB4orAfter.parentElement
            }
            deleteTask(element.innerText);
            dropTask(elementB4orAfter.innerText);
        });

        element.addEventListener("click", function selectedTask() {
            try { document.querySelector("#selectedTask").id = ""; }
            catch { element.id = "selectedTask"; }
            element.id = "selectedTask";
            window.addEventListener("keydown", function presskey(e) {
                if (e.key === "Alt") {
                    window.addEventListener("keydown", function preesnumber(e) {
                        if (e.key === "1") {
                            let innerTaskText = element.innerText;
                            ReplaceTaskType("todo", innerTaskText);
                        }
                        else if (e.key === "2") {
                            let innerTaskText = element.innerText;
                            ReplaceTaskType("in-progress", innerTaskText);
                        }
                        else if (e.key === "3") {
                            let innerTaskText = element.innerText;
                            ReplaceTaskType("done", innerTaskText);
                        }
                        // Removing Event so the task place wont change again when typing 1/2/3
                        window.removeEventListener("keydown", preesnumber);
                        window.removeEventListener("keydown", presskey);
                        element.removeEventListener("click", selectedTask);
                    });
                }
            })
        });

        element.addEventListener("dblclick", function () {
            oldinnerTaskText = element.getElementsByClassName("TaskTitle")[0].innerText;
            element.contentEditable = true;
        });

        element.addEventListener("blur", function Changeinside() {
            let newinnerTaskText = element.innerText.replace(spaceAtEndRegex, '');
            ChangeTaskText(oldinnerTaskText, newinnerTaskText);
        });
    })
}


const addTask = (taskType, idOfInput) => {
    const taskValue = document.getElementById(idOfInput).value.replace(spaceAtEndRegex, '');
    //return the function if user dont enter anything or the task already there
    if (!document.getElementById(idOfInput).value.replace(/\s/g, '')||!checkTaskName(taskValue)) { return alert('enter Valid Task') } 
    document.getElementById(idOfInput).value = ""; //reset the input
    taskObj[taskType].unshift(taskValue);
    postTasks();
}

const checkTaskName = (taskName) => {
    for (let taskarray in taskObj) {
        for (let i = 0; i < taskObj[taskarray].length; i++) {
            if (taskObj[taskarray][i] == taskName) {
                return false;
            }
        }
    }
    return true;
}


// postTasks function takes the taskObj adn "print" it to the DOM
const postTasks = () => {
    let query = document.getElementById("search").value;
    let selectedTaskObj = taskObj
    if (searchByQuery(query)) { // if something isnt there this will be false
        selectedTaskObj = searchByQuery(query);
    }
    let generalString = ``, ongoingString = ``, finishedString = ``;
    for (let key of selectedTaskObj.todo) {
        generalString += `<li class="task"><img class="checkButton" src="./Images/check.png"><span class="TaskTitle">${key}</span><img class="sortButton" src="./Images/sort.png"><img class="deleteButton" src="./Images/XRED.ico"></li>`
    }
    for (let key of selectedTaskObj["in-progress"]) {
        ongoingString += `<li class="task"><img class="checkButton" src="./Images/check.png"><span class="TaskTitle">${key}</span><img class="sortButton" src="./Images/sort.png"><img class="deleteButton" src="./Images/XRED.ico"></button></li>`
    }
    for (let key of selectedTaskObj.done) {
        finishedString += `<li class="task"><span class="TaskTitle">${key}</span><img class="sortButton" src="./Images/sort.png"><img class="deleteButton" src="./Images/XRED.ico"></button></li>`
    }
    document.getElementById("general-task-table").innerHTML = generalString;
    document.getElementById("ongoing-task-table").innerHTML = ongoingString;
    document.getElementById("finished-task-table").innerHTML = finishedString;
    addEventListenerToButtons();
    addEventListenerToTasks();
    localStorage.setItem("tasks", JSON.stringify(taskObj));
}

const searchByQuery = (query) => {
    if (!query) { return false }
    const queryRegex = new RegExp(`${query}`, 'i');
    queryObj = {
        todo: [],
        "in-progress": [],
        done: []
    };
    for (let tasktype in taskObj) {
        for (let i = 0; i < taskObj[tasktype].length; i++) {
            if (queryRegex.test(taskObj[tasktype][i])) {
                queryObj[tasktype].push(taskObj[tasktype][i]);
            }
        }
    };
    return queryObj;
}

const ReplaceTaskType = (WantedTypeOfTask, innerTaskText) => {
    for (let taskarray in taskObj) {
        for (let i = 0; i < taskObj[taskarray].length; i++) {
            if (taskObj[taskarray][i] == innerTaskText) {
                taskObj[WantedTypeOfTask].unshift(innerTaskText)
                taskObj[taskarray].splice(i, 1);
            }
        }
    }
    postTasks();
}

const dropTask = (innerTaskText) => {
    for (let taskarray in taskObj) {
        for (let i = 0; i < taskObj[taskarray].length; i++) {
            if (taskObj[taskarray][i] == innerTaskText) {
                if (i == 0) {
                    if (mockList.previousElementSibling) {
                        taskObj[taskarray].splice(1, 0, mockList.innerText);
                        break;
                    }
                    else {
                        taskObj[taskarray].splice(0, 0, mockList.innerText);
                        break;
                    }
                }
                else {
                    taskObj[taskarray].splice(i + 1, 0, mockList.innerText);
                    break;
                }
            }
        }
    }
    postTasks();
}

const deleteTask = (innerTextOfTitle) => {
    for (let taskarray in taskObj) {
        for (let i = 0; i < taskObj[taskarray].length; i++) {
            if (taskObj[taskarray][i] == innerTextOfTitle) {
                taskObj[taskarray].splice(i, 1);
                return;
            }
        }
    }
    postTasks();
}

const ChangeTaskText = (oldTaskText, newTaskText) => {
    for (let taskarray in taskObj) {
        for (let i = 0; i < taskObj[taskarray].length; i++) {
            if (taskObj[taskarray][i] == oldTaskText) {
                taskObj[taskarray].splice(i, 1);
                taskObj[taskarray].unshift(newTaskText);
            }
        }
    }
    postTasks();
}


const getDataFromAPI = async () => {
    document.getElementById("loaderDiv").innerHTML = `<img src="./Images/loading.svg" alt="loader" class="loader" id="loader">`; // Loader Set
    const response = await fetch("https://json-bins.herokuapp.com/bin/614ad65e4021ac0e6c080c06");
    if (!response.ok) {
        alert(`Error ${response.status} happen when trying to send data to server`);
    }
    const responseObj = await response.json();
    taskObj = responseObj.tasks;
    document.getElementById("loaderDiv").innerHTML = ``; // Loader reset
    postTasks();
}

const postDataToAPI = async () => {
    document.getElementById("loaderDiv").innerHTML = `<img src="./Images/loading.svg" alt="loader" class="loader" id="loader">`;
    const tasksobjtoAPI = { tasks: taskObj }; // the only way the server get the data
    const response = await fetch("https://json-bins.herokuapp.com/bin/614ad65e4021ac0e6c080c06", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(tasksobjtoAPI),
    });
    document.getElementById("loaderDiv").innerHTML = ``;
    if (!response.ok) {
        alert(`Error ${response.status} happen when trying to send data to server`);
    }
}

// animation and timer for info
const showInfo = () => {
    const infoArray = document.querySelectorAll(".infoForUser");
    infoArray.forEach(element => {
        element.style.visibility = "visible";
        element.style.opacity = "1";
    });
    setTimeout(function () {
        infoArray.forEach(element => {
            element.style.visibility = "hidden";
            element.style.opacity = "0";
        })
    }, 5000);
}

const keyEnterSendTaskgeneral = () => {
    window.addEventListener("keydown", function pressEnter(e) {
        if (e.key === "Enter") {
            addTask('todo', 'add-to-do-task')
        }
        document.getElementById("add-to-do-task").addEventListener("blur", function () {
            window.removeEventListener("keydown", pressEnter);
        });
    }
    )
}

const keyEnterSendTaskongoing = () => {
    window.addEventListener("keydown", function pressEnter(e) {
        if (e.key === "Enter") {
            addTask('in-progress', 'add-in-progress-task')
        }
        document.getElementById("add-in-progress-task").addEventListener("blur", function () {
            window.removeEventListener("keydown", pressEnter);
        });
    }
    )
}

const keyEnterSendTaskdone = () => {
    window.addEventListener("keydown", function pressEnter(e) {
        if (e.key === "Enter") {
            addTask('done', 'add-done-task')
        }
        document.getElementById("add-done-task").addEventListener("blur", function () {
            window.removeEventListener("keydown", pressEnter);
        });
    }
    )
}

// Event listeners so all the pernament Elements
document.getElementById("search").addEventListener("keyup", postTasks);
document.getElementById("load-btn").addEventListener("click", getDataFromAPI);
document.getElementById("save-btn").addEventListener("click", postDataToAPI);
document.getElementById("APIDoanloadIMG").addEventListener("click", getDataFromAPI);
document.getElementById("APIUploadIMG").addEventListener("click", postDataToAPI);
document.getElementById("infoAboutPage").addEventListener("click", showInfo);
document.getElementById("add-to-do-task").addEventListener("click", keyEnterSendTaskgeneral);
document.getElementById("add-in-progress-task").addEventListener("click", keyEnterSendTaskongoing);
document.getElementById("add-done-task").addEventListener("click", keyEnterSendTaskdone);
// Dark/Light Theme Change
document.getElementById("ThemeChanger").addEventListener("click", function () {
    let theme = localStorage.getItem('data-theme');
    if (theme == "light") {
        document.documentElement.setAttribute("data-theme", "dark");
        document.getElementById("ThemeChanger").setAttribute("src", "./Images/Sun.svg");
        localStorage.setItem("data-theme", "dark");
    }
    else {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("ThemeChanger").setAttribute("src", "./Images/Moon.svg");
        localStorage.setItem("data-theme", "light");
    }
});

// Local Storange Handler

//if user has localStorage File it postTasks to it, if he hasn't i create for him 
if (localStorage.getItem("tasks")) {
    taskObj = JSON.parse(localStorage.getItem("tasks"));
    postTasks();
}
else {
    taskObj = {
        "todo": [],
        "in-progress": [],
        "done": []
    }
    postTasks();
    localStorage.setItem("tasks", JSON.stringify(taskObj));
}


// remember youre last Theme
if (localStorage.getItem("data-theme") == "light") {
    document.getElementById("ThemeChanger").setAttribute("src", "./Images/Moon.svg");
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("data-theme", "light");
}
else {
    document.documentElement.setAttribute("data-theme", "dark");
    document.getElementById("ThemeChanger").setAttribute("src", "./Images/Sun.svg");
    localStorage.setItem("data-theme", "dark");
}
