const express = require('express');
const todoRouter = express.Router();
const pool = require('../modules/pool.js');


todoRouter.get('/', (req, res) => {
    console.log('In router GET');
    let queryText = `
    SELECT * FROM "todo"
    ORDER BY "task"
    `;
pool.query(queryText).then(todo =>{
    res.send(todo.rows);

}).catch(error =>{
    console.log('error getting todo', error);
    res.sendStatus(500);
})
})


module.exports = todoRouter;