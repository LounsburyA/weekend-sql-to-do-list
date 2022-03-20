console.log('JS works');

$(document).ready(function () {
    console.log('JQ works');
    clickListeners();
getTask();
});


function clickListeners() {
    $('#addTask').on('click', function () {
        console.log('in addTask on click');

        let task = $('#taskIn').val();
        
        let taskToSend = {
            task: task,
            status: false
        };
        console.log(taskToSend);
        saveTask(taskToSend);
    });
    $('#viewTasks').on('click', '.taskComplete', updateStatus);

    $('#viewTasks').on('click', '.deleteBtn', deleteTask);
};

// here is the GET

function getTask() {
    console.log('in getTask');
    $.ajax({
        method: 'GET',
        url: '/todo'
    }).then(function (response) {
        renderTask(response);
    }).catch(function (err) {
        console.log(err);
    })
}

// here is the render
function renderTask(listOfTasks) {
    console.log('in renderTask', listOfTasks);
    $('#viewTasks').empty()
    for (let i = 0; i < listOfTasks.length; i++) {
        let task = listOfTasks[i];
        if (task.status === true) {
            $('#viewTasks').append(`
            <tr data-id=${task.id}>
                <td>${task.task}</td>
                <td class = "green">${task.status}</td>
                <td>
                <button class="deleteBtn">Remove task</button>
                </td>
            </tr>
            `);
        }
        if (task.status === false) {
            $('#viewTasks').append(`
            <tr data-id=${task.id}>
                <td>${task.task}</td>
                <td class = "taco">${task.status}</td>
                <td>
                <button class="deleteBtn">Remove task</button>
                <button class="taskComplete">Task Complete</button>
                </td>
            </tr>
            `);
        }
    }
}

// here is the POST
function saveTask(newTask) {
    console.log('in saveTask', newTask);
    $.ajax({
        url: '/todo',
        method: 'POST',
        data: newTask,
    }).then(function (response) {
        console.log(response);
        getTask(response);
    }).catch(function (error) {
        console.log('error in client.js post', error);
    })
}
// here is the PUT
function updateStatus() {
    console.log('update status clicked');
    let taskId = $(this).closest('tr').data('id');
    console.log('status updated', taskId);
    $.ajax({
        url: `/todo/${taskId}`,
        method: 'PUT'
       
    }).then(function (response) {
        console.log('status changed');
        getTask();
    }).catch(function (err) {
        console.log(err);

    })
}

function deleteTask(removeTask) {
    console.log('in deleteTask', removeTask);
    let id = $(this).closest('tr').data('id');
    console.log(id);
    $.ajax({
        url: `/todo/${id}`,
        method: 'DELETE',
    }).then(function (response) {
        console.log('task has been deleted', id);
        getTask();
    }).catch(function (err) {
        console.log(err);

    })

}