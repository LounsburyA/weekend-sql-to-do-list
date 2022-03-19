console.log('JS works');

$(document).ready(function () {
    console.log('JQ works');
    
    
});
function clickListeners(){
    $('#addTask').on ('click'function () {
        console.log('in addTask on click');
        
        let task = $('#taskIN').val();
        let status = $('#taskStatus').val();
        
        let taskToSend = {
            task: task,
            status: status
        }
    })
}