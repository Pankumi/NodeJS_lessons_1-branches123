// Модуль 1 заняття 1

// Дізнатись версію ноди: node --version

// Ввиконати index.js в терміналі пишем: node index.js

// Для ініціалізації NPM (створення package.json): npm init

// // ТРИ ТИПИ ІНПОРТІВ:
// 1 вбудовані - для розбиття додатку на частини
// require - для підключення зовн. модулів
const { getCurrentData } = require("./dateUtils");
// console.log('getCurrentData >>', getCurrentData());

// 2 вбудовані модулі для роботи з файлами і операційною системою
// 3 які можна встановити через npm.

// // ГЛОБАЛЬНІ ЗМІННІ:
// // global:
global.testData = "123";
// console.log('global >>', global.testData);

// // process: збферігає данні про запущєний процес
// console.log('process.env >>', process.env);
console.log("process.argv >>", process.argv); // містить масив з аргументів які були передані при запуску процесу

// process.exit // завершує виконання скрипту

// console.log('__dirname >>', __dirname);
// console.log('__filename >>', __filename);

// _______
// // npm i calc-js - БІБЛІОТЕКА для коректної роботи з числами з плав. крапкою
// // імпорт синтаксисом node
const Calc = require("calc-js").Calc;
// // імпорт синтаксисом typescript
// import { Calc } from 'calc-js';

const [, , a = 1.1, b = 2.2] = process.argv;
const aNum = Number(a);
const bNum = Number(b);
const numericResult = new Calc(aNum).sum(bNum).finish();
console.log("numericResult >>", numericResult);
// // в консолі викликаємо скрипт і передаємо аргументи: node index 0.2 0.1

// РОРБОТА З ФАЙЛ СИСТЕМОЮ:
// _______
// Path module:
const path = require("path");
console.log("Normalization >>", path.normalize("test/test1/tad/..")); // для нормалізації шляху до файлу або директорії
const directory = 'public';
const filename = 'index.html';
console.log("Join path >>", path.join(__dirname, directory, filename));  // приймає кілька аргументів та повертає об'єднаний шлях
console.log("resolve >>", path.resolve("dateUtils.js")); // 1) Об'єднує передані в метод шляхи в один. 2) Нормалізує шлях. 3) Визначає абсолютний шлях на основі поточної директорії
console.log("ext name >>", path.extname("index.js")); // використовується для отримання розширення файлу з вказаного шляху.

// _______
// FS module: // щоб отримати доступ до всього що лежить на вашому комп'ютері:
const fs = require("fs");

// fs.readFileSync(<path>, <encoding>) // прочитати файл
// fs.writeFileSync(<path>, <content>, <encoding>) // записати файл
// fs.renameFileSync(<oldPath>, <newPath>) // перейменувати файл
// fs.readdiSync(<path>) // прочитати директорію
// fs.unlinkSync(<path>) // видалити файл


// // * ПРОЧИТАТИ ФАЙЛ:
// // СИНХРОННЕ виконання заборонено для клієнтських запитів оскільки призупеняє додаток, можна використовувати під час ініціалізації додатку.
const data = fs.readFileSync("./data.txt", "utf8");
console.log("data Sync >>", data);

// // щоб виконанати АСИНХРОННО прибираєм Sync і додаєм ковбек функцію яка викличеться коли файл система прочитає файл і передасть його зн. в колбек:
// // ерор фьорст колбек, це коли 1м параметром передається помилка, а далі наші данні
fs.readFile("./data.txt", "utf8", (error, data) => {
  if (error) {
    console.error("error aSync >>", error);
  }
  console.log("data aSync >>", data);
});

// // АСИНХРОННО через ПРОМІС:
const fsPr = require("fs").promises;
fsPr
  .readFile("./data.txt", "utf8")
  .then((data) => console.log("data aSync promis >>", data))
  .catch((error) => console.error("error aSync promis >>", error));

// // АСИНХРОННО через АСИНК ЕВЕЙТ синтаксис:
const fsAsAw = require("fs").promises;
(async () => {
  try {
    const data = await fsAsAw.readFile("./data.txt", "utf8");
    // const dataAsAw = await fsAsAw.readFile(path.resolve('./data.txt'), 'utf8'); // приклад використання path.resolve()
    console.log("data AsyncAwait >>", data);
  } catch (error) {
    console.error("error aSync promis >>", error);
  }
})();

// // * РОБОТА З ФАЙЛОМ:
const fs2 = require("fs").promises;
(async () => {
  try {
    // ПРОЧИТАТИ ФАЙЛ
    const data = await fs2.readFile("./data.txt", "utf-8");
    console.log("data AsyncAwaitWrite >>", data);

    // ЗАПИСАТИ ФАЙЛ
    const Content = `${data} school`;
    await fs2.writeFile('./data1.txt', Content, 'utf8');
    
    // ДОПИСАТИ В ФАЙЛ
    const newContent = ` + New school`;
    await fs2.appendFile('./data.txt', newContent, 'utf8');

    // ПЕРЕІМЕНУВАТИ / ПЕРЕМІСТИТИ
    await fs2.rename('./data1.txt', './data1_newName.txt');
    await fs2.rename('./data1_newName.txt', './tmp/data1_newName.txt');

    // ПРОЧИТАТИ ДИРЕКТОРІЮ
    console.log("dir info >>", await fs2.readdir('./tmp'));

    // ВИДАЛИТИ ФАЙЛ
    fs2.unlink('./tmp/data1_newName.txt')


  } catch (error) {
    console.error("error >>", error);
  }
})();


console.log("end script");