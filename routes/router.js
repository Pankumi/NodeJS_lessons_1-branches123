const { Router } = require("express"); // дістаю Router з express
const fs = require("fs/promises");
const path = require("path");

const router = Router(); // створюю router
const userPath = path.join(__dirname, '/../db/users.json');

const getUsersList = async() => JSON.parse( await fs.readFile(userPath));

// // Щоб додаток слухав http запити по методу get/ post/ delete/ ...:
// router.get("/home", (req, res, next) => {
//   res.json({ message: "Hello friend!" });
// }); // // "get" - метод, приймає:
// // 1) "/home" - ендпоінт (url який ми чекаємо),
// // 2) колбек ф яку тереба виконати: "req"
// // Колбек ф приймає: req - request запит користувача, звідси читаєм, "res" - response -наша відповідь: баді, хедери
////  щоб визначити get запит для всіх url видаляєм 1й параметр: app.get((req, res)=>{...

// статус коди 100ті - шнформ. 200ті - успіх 300ті редірект 400ті - помилка кл. 500ті - помилки серверу

router.get("/user", async (req, res, next) => {
  try {
    const users = await getUsersList();
    console.log('users >>', users);
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({Error: error.message})
  }
  next();
});

router.get("/user/:id", async (req, res, next)=>{
  try {
    const id = req.params.id;
    const users = await getUsersList();
    const user = users.find((user)=> Іекштп(user.id) === id);

    if(!user) {
      res.status(404).json({message: 'User was not found'})
    }
    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({Error: error.message})
  }
}) // /:id - квері параметр, при запиті по ендпоінту все що буде після слешу вважається id-шніком. В об'єкті request.params буде створено нов поле id:"значення яке ми передаємо"

module.exports = router; // експортую router


