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
    let newTask = req.body;
    console.log('adding task', newTask);
   
    let queryText = `
INSERT INTO "todo"
("task", "status")
VALUES ($1,$2);
`;

    let values = [newTask.task, false];

    pool.query(queryText, values)
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log(`Error adding task`, error);
            res.sendStatus(500);
        });
})
todoRouter.put('/:id', (req,res) =>{
    console.log(req.params.id);
    let queryText =
   ` UPDATE "todo"
    SET "status" = true
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
// DELETE

todoRouter.delete('/:id', (req, res) => {
    console.log('task deleted', req.params.id);
    let id = req.params.id;
    const queryText = `
    DELETE FROM "todo"
    WHERE "id" = $1;
    `;

    const values = [id];

    pool.query(queryText,values)
    .then(result => {
        res.sendStatus(204);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
});

module.exports = todoRouter;