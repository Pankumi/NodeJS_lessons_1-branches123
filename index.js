// Модуль 1 доп. заняття "Дорога 40 nodeJS blgroup 2
// ВІДЕО:

const express = require("express"); //підключаєм express
const router = require('./routes/router');
const app = express(); // ініціалізуєм додаток (записуєм express в app)
const PORT = 3600; // порт на якому запускаєм додаток

app.use(router); // метод .use() використовується для підключення middleware
//middleware - це проміжний обробник запиту

app.listen(PORT, () => console.log("Server works at port >>", PORT)); // метод .listen для запуску додатка. Аргументи: 1 порт на якому буде працювати додаток, 2 колбек який виконається після запуску додатка

// Запит: http://localhost:3600/home
// http -протокол
// localhost -місцезнаходження
// 3500 -порт
// home -ендпоінт

