const http = require('http');
const port = 8081;

const toDoList = ["Read Books", "Play Cricket"];

http.createServer((request, response) => {
    const { method, url } = request;

    if (url == "/todos") {
        if (method == "GET") {
            response.writeHead(200, { "content-type": "text/html" });
            response.write(toDoList.toString());
        }

        else if (method == "POST") {
            let body = '';
            request.on('error', (err) => {
                console.error(err);
            }).on('data', (frag) => {
                body += frag;
            }).on('end', () => {
                body = JSON.parse(body);
                let newToDo = toDoList;
                newToDo.push(body.item);
                console.log(newToDo);
                response.writeHead(201);
            })
        }

        else if (method == "DELETE") {
            let body = '';
            request.on('error', (err) => {
                console.error(err);
            }).on('data', (frag) => {
                body += frag;
            }).on('end', () => {
                body = JSON.parse(body);
                let deleteItem = body.item;

                toDoList.find((element, index) => {
                    if (element === deleteItem) {
                        toDoList.splice(index, 1);
                    }
                });

                response.writeHead(204);
            });
        }

        else {
            response.writeHead(404);
        }
    }

    else {
        response.writeHead(404);
    }

    response.end();

}).listen(port, () => {
    console.log(`NodeJS listening on port ${port}`);
});