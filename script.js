"use strict";

let add_task = document.getElementById('add_task');

add_task.addEventListener('click',function(){
    let task2 = document.getElementById('task').value;
    let importance = document.getElementById('importance').value; 
    let date_due = document.getElementById('date_due').value; 
    let time_due = document.getElementById('time_due').value;
    let category = document.getElementById('category').value;

    let elem = document.createElement('li');
    elem.classList.add('task_item');
    elem.innerHTML = `
    
    <div class="task_item_top_selections">
                    <img src="edit.png" class="task_item_edit" title="edit task">
                    <img src="red_x.png" class="task_item_remove" title="remove task">
                </div>

    <div class="task_item_bottom">

                    <div class="task_item_information">
                    Task: Take out Garbage</br>
                    Importance: 3</br>
                    Due By: 4/20/69</br>
                    Category: Personal</br>
                    </div>

                    <div class="task_item_check">
                        <img src="green_check.png" id="task_item_checkmark" title="complete task">
                    </div>

                </div>
    `




    document.getElementById('task_list').insertAdjacentHTML('beforeend', elem.outerHTML);

});