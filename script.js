"use strict";









let add_task = document.getElementById('add_task');
let other_category_description = document.getElementById('other_textBox');
let reset_button = document.getElementById('reset_button');

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
    alert(color);

    if(document.getElementById('category').value == 'Other'){
        category = other_category_description.value;
    }else{
        category = document.getElementById('category').value;
    }



    let elem = document.createElement('li');
    elem.classList.add('task_item');
    elem.style.border = `5px solid ${color}`
    elem.innerHTML = `
    
    <div class="task_item_top_selections">
                    <img src="edit.png" class="task_item_edit" title="edit task">
                    <img src="red_x.png" class="task_item_remove" title="remove task">
                </div>

    <div class="task_item_bottom">

                    <div class="task_item_information">
                    Task: ${task}</br>
                    Importance: ${importance}</br>
                    Due By: ${date_due} - ${time_due}</br>
                    Category: ${category}</br>
                    </div>

                    <div class="task_item_check">
                        <img src="green_check.png" id="task_item_checkmark" title="complete task">
                    </div>

                </div>
    `
    document.getElementById('task_list').insertAdjacentHTML('beforeend', elem.outerHTML);
});

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