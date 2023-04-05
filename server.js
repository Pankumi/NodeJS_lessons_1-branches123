// NodeJS Модуль 1 заняття 2
// ВІДЕО:
// 1:26:00 response.end(), response.sendStatus(), response.send(), response.sendFile(), response.json(), response.redirect(), response.render()

// // npm i express
const express = require('express'); //підключаєм express
const app = express(); // ініціалізуєм express додаток (записуєм express в app)

const PORT = 3500; // порт на якому запускаєм додаток

app.get('/home', (req, res)=>{
  res.send('get request');
}) // "get" - метод, "/home" - url, "req" - request запит користувача, звідси читаєм, "res" - response -наша відповідь: баді, хедери
// щоб визначити get запит для всіх url видаляєм 1 параметр: app.get((req, res)=>{...

app.post('/home', (req, res)=>{
  res.send('post request');
})

app.delete('/home', (req, res)=>{
  res.send('delete request');
}) 

app.use((req, res)=>{
    res.redirect('http://google.com');
    // res.send('middleware request');
})

app.listen(PORT, (err) => {
    if (err) {
      console.error("Error at server launch >>", err);
    }
    console.log("Server works at port", PORT);
  });
