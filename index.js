// implement your API here


const express = require(`express`);
const db = require(`./data/db`);

const server = express();



server.listen(4000, () => {
    console.log(`===server listening on post 4000 ===`);
});

server.use(express.json());

//POST Request syntax

server.post(`/api/users`, (req, res) => {
    const userInfo = req.body;

    db.add(userInfo)
        .then((user) => {
            res.status(201),json({success: true, user});
        });
});