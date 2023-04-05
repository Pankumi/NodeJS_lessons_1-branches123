// NodeJS Модуль 1 заняття 2
// ВІДЕО:
// загальне пояснення 0:59:20-1:11:0
// express в файлі server.js

const http = require("http");

const PORT = 8081;

// // Обробник запитів. Приймає:
// // - request -запит користувача, звідси читаєм,
// // - response -наша відповідь: баді, хедери

// // Варіант 1 різна видача по запиту з різним url:
// const requstHandler = (request, response) => {
//   if ( request.url.indexOf('/home') >= 0 ){
//     response.writeHead(200, {'Content-type': 'text/json'});
//     return response.end( JSON.stringify({"url":"homepage"}) );
//   }
//   response.writeHead(200, { "Content-type": "text/json" });
//   return response.end( JSON.stringify({"url":"other"}) );
// };

// // Варіант 2 на старті синхронно читаю файл:
// const fs = require("fs");
// const manifest = fs.readFileSync('./package.json', 'utf8' );

// const requstHandler = (request, response) => {
//   response.writeHead(200, { "Content-type": "text/json" });
//   return response.end(manifest);
// };

// // Варіант 3 асинхронно читаю файл при кожному зверненні кл:
const fs = require("fs").promises;
const requstHandler = async (request, response) => {
  const manifest = await fs.readFile('./package.json', 'utf8' );
  response.writeHead(200, { "Content-type": "text/json" });
  return response.end(manifest);
};

const server = http.createServer(requstHandler);
// Треба запустити сервер так щоб він зарезервував якийсь порт ОС і слухав на ньому запити
server.listen(PORT, (err) => {
  if (err) {
    console.error("Error at server launch >>", err);
  }
  console.log("Server works at port", PORT);
});


1:11