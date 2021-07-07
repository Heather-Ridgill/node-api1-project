// implement your API here


const express = require(`express`);
const db = require(`./data/db`);

const server = express();



server.listen(4000, () => {
    console.log(`=== server listening on post 4000 ===`);
});

//Middleware
server.use(express.json());

//Route Handler

server.get(`/`, (req, res) => {
    res.send(`Hello World...`);
})

//GET
server.get(`/api/users`, (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({message: err, success: false
            });
        });
});
 
//GET:ID
server.get(`/api/users/:id` ,(req, res) => {
const {id} = req.params;

db.findById(id)
    .then(user => {
        res.status(200).json(user);
    })

    .catch(err => {
        res.status(500).json({
            message: err,
            success: false
        });
    });
});


//POST 

server.post(`/api/users`, (req, res) => {
    const userInfo = req.body;
    console.log('body: ', userInfo);

db.insert(userInfo)
.then((user) => {
    res.status(201).json({success: true, user})
})
.catch((err) => {
    res.status(500).json({ success: false, err});
});

});


//PUT
server.put(`/api/users/:id`, (req, res) =>{
    const id = req.params.id;
    const userInfo = req.body;
    db.update(id, userInfo)
        .then(user => {
            if (user) {
                res.status (200).json({sucess:true, user});
            } else {
                res.status(404).json({success: false, message: `id${id} does not exist`});
            }
        })
        .catch (err => {
            res.status(500).json({success:false, err});
        });
});

//DELETE

server.delete ('/api/users/:id', (req, res) => {
    const{id} = req.params;

    db.remove(id)
    .then(deletedUser  => {
        if(deletedUser) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: `I could not find id=${id}`});
        }
    })
    .catch(err => {
        res.status(500).json({success:false, err});
    });
});


