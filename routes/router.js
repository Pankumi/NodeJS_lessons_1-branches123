const { Router } = require("express"); // дістаю Router з express
const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");
const router = Router(); // створюю router
const userPath = path.join(__dirname, "/../db/users.json");

const getUsersList = async (filePath) =>
  JSON.parse(await fs.readFile(filePath));

const writeUsersList = (filePath, content) => {
  fs.writeFile(filePath, JSON.stringify(content));
};

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
    const users = await getUsersList(userPath);
    console.log("users >>", users);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
  next();
}); // GET: localhost:3700/user

router.get("/user/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const users = await getUsersList(userPath);
    const user = users.find((user) => Іекштп(user.id) === id);

    if (!user) {
      res.status(404).json({ message: "User was not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
}); // GET: localhost:3700/user/1
// /:id - квері параметр, при запиті по ендпоінту все що буде після слешу вважається id-шніком. В об'єкті request.params буде створено нов. поле id:"значення яке ми передаємо"

router.post("/user", async (req, res) => {
  try {
    const body = req.body;
    const users = await getUsersList(userPath);
    const user = { id: randomUUID(), ...body };
    console.log(users);
    users.push(user);

    writeUsersList(users);
    e;
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
}); // POST: localhost:3700/user {"name":"Toma"}

// router.put( "/user/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const body = req.body;
//     const users = await getUsersList(userPath);
//     const index = users.findIndex( user => String(user.id) === id );

//     if( index === -1){
//       return res.status(404).json({"message":"User was not found"})
//     }

//     const user ={ ...users[index], ...body };

//     const newUsers = users.map( el => {
//       if( String(el.id) === id ){
//         return user
//       } else {
//         return el
//       }
//     } );
//     await writeUsersList(userPath, newUsers);

//     res.status(200).json(newUsers);
//   } catch (error) {
//     res.status(500).json({Error: error.message})
//   }
// }) // PUT: localhost:3700/user/1 {"name":"Toma"}

router.put("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const users = await getUsersList(userPath);
    let userFound = false;

    const newUsers = users.map((el, idx, arr) => {
      if (String(el.id) === id) {
        userFound = true;
        return { ...el, ...body };
      } else {
        return el;
      }
    });

    if (!userFound) {
      return res.status(404).json({ message: "User was not found" });
    }

    await writeUsersList(userPath, newUsers);

    res.status(200).json(newUsers);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
}); // PUT: localhost:3700/user/1 {"name":"Toma"}

router.delete("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const users = await getUsersList(userPath);

    const filteredUsers = users.filter((user) => user.id !== id);
    
    if (users.length === filteredUsers.length) {
      return res.status(404).json({ message: "User was not found" });
    }

    // await writeUsersList(userPath, filteredUsers);
    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

module.exports = router; // експортую router

//1.45
