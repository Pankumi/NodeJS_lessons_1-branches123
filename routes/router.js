const { Router } = require("express"); // дістаю Router з express
const fs = require("fs/promises");
const path = require("path");

const router = Router(); // створюю router
const userPath = path.join(__dirname, '/../db/users.json');

// // Щоб додаток слухав http запити по методу get/ post/ delete/ ...:
// router.get("/home", (req, res, next) => {
//   res.json({ message: "Hello friend!" });
// }); // // "get" - метод, приймає:
// // 1) "/home" - ендпоінт (url який ми чекаємо),
// // 2) колбек ф яку тереба виконати: "req"
// // Колбек ф приймає: req - request запит користувача, звідси читаєм, "res" - response -наша відповідь: баді, хедери
////  щоб визначити get запит для всіх url видаляєм 1й параметр: app.get((req, res)=>{...

router.get("/user", async (req, res) => {
  try {
    const users = JSON.parse(await fs.readFile(userPath));
    console.log('users >>', users);
  } catch (error) {}
});

module.exports = router; // експортую router

