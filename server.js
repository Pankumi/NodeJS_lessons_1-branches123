// NodeJS Модуль 1 заняття 2
// ВІДЕО:
// 1:26:00:
// response.end(),
// response.sendStatus() - повертає заданий статус
// response.send()
// response.sendFile() - повертає файл
// response.json() - передає json
// response.redirect() - перенаправляє на url
// response.render() - щоб в шаблонізаторі рендерити якісь данні. Може знадобитися для відображення дуже простого фронтенду з простим шаблонізатором "єджс" "хендл бар"

// // npm i express
// // npm i morgan
// Ось мій код:
const morgan = require("morgan"); // зовнішній middleware щоб логати запити

const express = require("express"); //підключаєм express
const app = express(); // ініціалізуєм express додаток (записуєм express в app)

const PORT = 3500; // порт на якому запускаєм додаток

app.use(express.json()); // в express вбудований middleware який парсить тіло запиту, що містить JSON, і додає його до об'єкта запиту req.body
app.use(express.urlencoded({ extended: true })); // в express вбудований middleware який парсить з html форм
app.use(express.static("./public")); // в express вбудований middleware який робить визначену директорію на сервері публічною. Щоб створ. простий веб сервер необхідно помістити сайт в папку яку потім прописати в app.use(express.static(''))

// app.use((req, res, next) => {
//   res.json({javascript: 'object'}) // повертаєм json об'єкт (статус 200 за замовчуванням)
//   res.status(500).json({javascript: 'object'}) // додаєм статус 500 і повертаєм json об'єкт
//   res.redirect('http://google.com'); // переадресовуєм на http://google.com
//   res.send('middleware request'); //
//   next();
// });

// app.use((req, res, next) => {
//   console.log("req.method >>", req.method);
//   console.log("req.originalUrl >>", req.originalUrl);
//   console.log("new Date().toISOString() >>", new Date().toISOString());
//   console.log("req.body >>", req.body); // дивимось що приходе від користувача
//   next();
// }); // middleware для логування

app.use(morgan('tiny')); // middleware для логування

app.get("/home", (req, res) => {
  res.send("get request");
}); // "get" - метод, "/home" - url, "req" - request запит користувача, звідси читаєм, "res" - response -наша відповідь: баді, хедери
// щоб визначити get запит для всіх url видаляєм 1 параметр: app.get((req, res)=>{...

app.post("/home", (req, res) => {
  // res.send("post request");
  res.send(req.body);
});

app.delete("/home", (req, res) => {
  res.send("delete request");
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error at server launch >>", err);
  }
  console.log("Server works at port >>", PORT);
});




