"use strict";

let add_task = document.getElementById('add_task');
let other_category_description = document.getElementById('other_textBox');
let reset_button = document.getElementById('reset_button');
let completed_task_buttons = document.getElementsByClassName('task_item_check');

let finished_tasks = [];
let task_history = [];

class Task{
    constructor(task, importance, date_due, time_due, category, color){
        this.task = task;
        this.importance = importance;
        this.date_due = date_due;
        this.time_due = time_due;
        this.category = category;
        this.color = color;
    }
}


/*Check to see if Category is in "Other"*/
setInterval(function(){
    if(document.getElementById('category').value == 'Other'){
        other_category_description.classList.remove('hidden');
    }else if(document.getElementById('category').value != 'Other'){
        other_category_description.classList.add('hidden');
    };
}, 50);

add_task.addEventListener('click',function(){
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


    let elem = document.createElement('li');
    elem.classList.add('task_item');
    elem.style.border = `5px solid ${temp_task.color}`
    elem.innerHTML = `
    
    <div class="task_item_top_selections">
                    <img src="edit.png" class="task_item_edit" title="edit task">
                    <img src="red_x.png" class="task_item_remove" title="remove task">
                </div>

    <div class="task_item_bottom">

                    <div class="task_item_information">
                    Task: ${temp_task.task}</br>
                    Importance: ${temp_task.importance}</br>
                    Due By: ${temp_task.date_due} - ${temp_task.time_due}</br>
                    Category: ${temp_task.category}</br>
                    </div>

                    <div class="task_item_check">
                        <img src="green_check.png" id="task_item_checkmark" title="complete task">
                    </div>

                </div>
    `
    document.getElementById('task_list').insertAdjacentHTML('beforeend', elem.outerHTML);
});

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

setInterval(()=>{
    for(let buttons of completed_task_buttons){
    buttons.addEventListener('click',function(){
        let task_innerHTML = buttons.closest('li').innerHTML;
        //buttons.addToFinishedTask(task_innerHTML);
        buttons.closest('li').remove();
    });
}
},500);




/*Check Finished Tasks*/

let display_finished_tasks = document.getElementById('finished_tasks_button');

display_finished_tasks.addEventListener('click',function(){
    document.getElementById('finished_tasks_modal').classList.remove('hidden');
})

/*Add to Finished Tasks*/

function addToFinishedTask(obj){
    for(let item of task_history){
        let elem = document.createElement('li');
        elem.innerHTML = `Task:${item.task}`;
        document.getElementById('finished_tasks_list').insertAdjacentHTML('beforeend',elem.outerHTML);
    }
}

/*Check History*/

let check_history = document.getElementById('history_button');

check_history.addEventListener('click',function(){
    for(let i of task_history){
        let elem = document.createElement('li');
        elem.innerHTML = (`${i.task}
        Importance:${i.importance}\n
        Due: ${i.date_due} - ${i.time_due}\n
        Category: ${i.category}\n
        Color: ${i.color}
        `);
        document.getElementById('history_tasks_list').insertAdjacentHTML('beforeend',elem.outerHTML);
    }
})