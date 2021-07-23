"use strict";

let add_task = document.getElementById('add_task');
let other_category_description = document.getElementById('other_textBox');
let reset_button = document.getElementById('reset_button');

let task_count = 0;
let task_history = [];
let tasks_completed = [];

class Task{
    constructor(task, importance, date_due, time_due, category, color){
        this.task = task;
        this.importance = importance;
        this.date_due = date_due;
        this.time_due = time_due;
        this.category = category;
        this.color = color;
        this.checkImg = 'green_check.png';
    }
}


/*Check to see if Category is in "Other"*/

function checkOtherBox(){
    if(document.getElementById('category').value == 'Other'){
        other_category_description.classList.remove('hidden');
    }else if(document.getElementById('category').value != 'Other'){
        other_category_description.classList.add('hidden');
    };
}


/*Add Task to List*/

function addTaskToList(){
    let task = document.getElementById('task').value;
    let importance = document.getElementById('importance').value; 
    let date_due = document.getElementById('date_due').value; 
    let time_due = document.getElementById('time_due').value;
    let category;
    let color = document.getElementById('color').value;
    if(document.getElementById('category').value == 'Other'){
        category = other_category_description.value;
    }else{
        category = document.getElementById('category').value;
    }

    let temp_task = new Task(task,importance,date_due,time_due,category,color);
    task_history.push(temp_task);
    createListElement(temp_task);
}



function createListElement(obj){
    let elem = document.createElement('li');
    elem.classList.add('task_item');
    let banner_color= `${obj.color}`;
    //elem.style.border = `3px solid ${obj.color}`
    elem.innerHTML = `
    
    <div class="task_item_top_selections" style="background-color:${banner_color}">
            <img class="delete_task" src="red_x.png" id="delete_task_${task_count}" onclick="deleteTask(${task_count})" title="delete task">
                </div>

    <div class="task_item_bottom">

                    <div class="task_item_information">
                    Task: ${obj.task}</br>
                    Importance: ${obj.importance}</br>
                    Due By: ${obj.date_due} - ${obj.time_due}</br>
                    Category: ${obj.category}</br>
                    </div>

                    <div class="task_item_check">
                        <img class="complete_task" src=${obj.checkImg} id="task_item_${task_count}"
                        title="complete task" onclick="completeTask(${task_count})">
                    </div>

                </div>
    `    

    document.getElementById('task_list').insertAdjacentHTML('afterbegin', elem.outerHTML);
    console.log(task_history);
    addToHistoryList(obj);
    
    task_count++;
};

/*Reset Form*/
function reset(){
let task = document.getElementById('task').value = "";
    let importance = document.getElementById('importance').value = 3;
    let date_due = document.getElementById('date_due').value = new Date();
    let time_due = document.getElementById('time_due').value = new Date();
    let category = document.getElementById('category').value = "----";
    let color = document.getElementById('color').value = "00000";
};


reset_button.addEventListener('click',function(){
    reset()
});

/*Completing  Tasks */
function completeTask(int){
    task_history[int].finished = true;
    tasks_completed.push(task_history[int]);

    //removes from list
    document.getElementById(`task_item_${int}`).closest('li').remove();

    //adds to Completed List. 
    addToCompleteList(task_history[int]);

};

/*Adding to Completed List*/ 

function addToCompleteList(obj){
    let temp = document.createElement('li');
    temp.classList.add('task_item');
    temp.innerHTML = `<div class="task_item_top_selections" style="background-color:lightgreen">
                </div>

    <div class="task_item_bottom">

                    <div class="task_item_information">
                    Task: ${obj.task}</br>
                    Importance: ${obj.importance}</br>
                    Due By: ${obj.date_due} - ${obj.time_due}</br>
                    Category: ${obj.category}</br>
                    </div>
                </div>
    `;
    document.getElementById('completed_list').append(temp);

}

/*Adding to History List*/
function addToHistoryList(obj){
    let temp = document.createElement('li');
    temp.classList.add('task_item');
    temp.innerHTML = `<div class="task_item_top_selections" 
    style="background-color:gray">
                </div>

    <div class="task_item_bottom">

                    <div class="task_item_information">
                    Task: ${obj.task}</br>
                    Importance: ${obj.importance}</br>
                    Due By: ${obj.date_due} - ${obj.time_due}</br>
                    Category: ${obj.category}</br>
                    </div>
                </div>
    `;
    document.getElementById('history_list').append(temp);

}


/*Deleting Items*/

function deleteTask(int){
    let temp = document.getElementById(`task_item_${int}`).closest('li').remove();
}

/*Show Task History*/

document.getElementById('task_history').addEventListener('click',function(){
    //make sure Completed Tasks is set back to default before continnuing
    document.getElementById(`completed_tasks`).setAttribute("toggle",0);
    document.getElementById(`completed_tasks`).innerHTML=`Completed Tasks`;
    document.getElementById('completed_container').hidden = true;
    

    if(this.getAttribute("toggle") == 0){
        this.setAttribute("toggle",1);
        this.classList.toggle('active');
        document.getElementById('task_container').hidden = true;
        this.innerHTML = 'Display To-Do List';
        document.getElementById('add_task').disabled=true;
        document.getElementById('history_container').hidden=false;
    }else{
    this.classList.toggle('active');
    this.setAttribute("toggle",0);
    document.getElementById('task_container').hidden = false;
    this.innerHTML = 'Task History';
    document.getElementById('add_task').disabled=false;
    document.getElementById('history_container').hidden = true;
    }
})

/*Show Completed Tasks*/

document.getElementById('completed_tasks').addEventListener('click',function(){
    document.getElementById(`task_history`).setAttribute("toggle",0);
    document.getElementById('history_container').hidden = true;
    if(this.getAttribute("toggle") == 0){
        this.setAttribute("toggle",1);
        this.classList.toggle('active');
        document.getElementById('task_container').hidden = true;
        document.getElementById('completed_container').hidden=false;
        document.getElementById('add_task').disabled=true;
        this.innerHTML = 'Display To-Do-List';
        document.getElementById('task_history').innerHTML = 'Task History';
    }else{
    this.setAttribute("toggle",0);
    this.classList.toggle('active');
    document.getElementById('task_container').hidden = false;
    document.getElementById('add_task').disabled=false;
    this.innerHTML = 'Completed Tasks';
    document.getElementById('completed_container').hidden=true;
    }
})