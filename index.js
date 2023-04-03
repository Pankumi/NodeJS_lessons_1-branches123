const http = require('http');

const PORT = 8081;

// Обробник запитів. Приймає:
// - request -запит користувача, звідси читаєм,
// - response -наша відповідь: баді, хедери
const requstHandler = (request, response) => {
//  response.writeHead(200, {'Content-type': 'text/html'});
//  response.end('<h1>GoIt</h1>');
 response.writeHead(404, {'Content-type': 'text/json'});
 response.end(JSON.stringify({a:1,b:[]}))
}

const server = http.createServer(requstHandler);

// Треба запустити сервер так щоб він зарезервував якийсь порт ОС і слухав на ньому запити
server.listen(PORT, (err)=>{
  if (err) {
    console.error('Error at aserver launch >>' ,err);
  }
  console.log('Servar works at port', PORT);
});