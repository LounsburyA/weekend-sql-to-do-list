const express = require('express');
const todoRouter = express.Router();
const pool = require('../modules/pool.js');


todoRouter.get('/', (req, res) => {
    console.log('In router GET');
    let queryText = `
    SELECT * FROM "todo"
    ORDER BY "task"
    `;
    pool.query(queryText).then(todo => {
        res.send(todo.rows);

    }).catch(error => {
        console.log('error getting todo', error);
        res.sendStatus(500);
    })
});

todoRouter.post('/', (req, res) => {
    let newTask = req.body
    console.log('adding task', newTask);
    if (newTask.status.toLowerCase() === 'yes') {
        newTask.status = true;
    } else if (newTask.status.toLowerCase() === 'no') {
        newTask.status = false;
    } else { alert('enter yes or no') }
    let queryText = `
INSERT INTO "todo"
("task", "status")
VALUES ($1,$2);
`;

    let values = [newTask.task, newTask.status]

    pool.query(queryText, values)
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log(`Error adding new koala`, error);
            res.sendStatus(500);
        });
})
todoRouter.put('/:id', (req,res) =>{
    console.log(req.params.id);
    let queryText 
   ` UPDATE "todo"
    SET "status" = TRUE
    WHERE "id" = $1;
    `;
    const values = [req.params.id];
    pool.query(queryText,values)
    .then(result =>{
        res.sendStatus(200);
    }).catch(err =>{
        console.log(err);
        res.sendStatus(500);
    })
});



module.exports = todoRouter;