console.log('JS works');

$(document).ready(function () {
    console.log('JQ works');


});
function clickListeners() {
    $('#addTask').on('click',function() {
        console.log('in addTask on click');

        let task = $('#taskIN').val();
        let status = $('#taskStatus').val();
        let taskToSend = {
            task: task,
            status: status
        };
        console.log(taskToSend);

    })
};

function getTask() {
    console.log('in getTask');
    $.ajax({
        method: 'GET',
        url: '/todo'
    })

}


function renderTask(listOfTasks) {
    console.log('in renderTask', listOfTasks);
    $('#viewTasks').empty()
    for (let i = 0; i < listOfTasks.length; i++) {
        let task = listOfTasks[i];
        if (task.status === true) {
            $('$viewTasks').append(`
            <tr data-id=${task.id}>
            <td>${task.task}</td>
            <td class = "green">${task.status}</td>
            <td>
            <button class="deleteBtn">Remove task</button>
            </td>
            `);
        }
        else {
            $('$viewTasks').append(`
            <tr data-id=${task.id}>
            <td>${task.task}</td>
            <td class = "red">${task.status}</td>
            <td>
            <button class="deleteBtn">Remove task</button>
            <button class="taskComplete">Task Complete</button>
            </td>
            `);
        }
    }
}