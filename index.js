// implement your API here


const express = require(`express`);
const db = require(`./data/db`);

const server = express();



server.listen(4000, () => {
    console.log(`===server listening on post 4000 ===`);
});

server.use(express.json());


server.get(`/api/users`, (req, res) => {
    db.find()
        .then(user => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({error: "The users information could not be found..."});
        });
});

//POST Request syntax

server.post(`/api/users`, (req, res) => {
    const userInfo = req.body;

    db.add(userInfo)
        .then((user) => {
            res.status(201),json({success: true, user});
        });
});