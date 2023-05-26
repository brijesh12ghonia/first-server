const express = require('express');

const app = express();
app.use(express.json());

const port = 8081;

const toDoList = ["Read Books", "Play Cricket"];

app.get("/todos", (req, res) => {
    res.status(200).send(toDoList);
});

app.post("/todos", (req, res) => {
    let newToDoList = req.body.item;
    toDoList.push(newToDoList);
    res.status(201).send({
        message: `Successfully added '${newToDoList}' to the list`
    });
});

app.delete("/todos", (req, res) => {
    const deleteItem = req.body.item;
    toDoList.find((element, index) => {
        if (element === deleteItem) {
            toDoList.splice(index, 1);
        }
    });
    res.status(202).send({
        message: `Deleted item '${req.body.item}'`
    });
});

app.all("/todos", (req, res) => {
    res.status(501).send();
});

app.all('*', (req, res) => {
   res.status(404).send(); 
});

app.listen(port, () => {
    console.log(`NodeJS listening on port ${port}`);
});