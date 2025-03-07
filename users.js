const express = require('express');
const router = express.Router();

const users = [
   { id: 1, name: "user1" },
   { id: 2, name: "user2" },
   { id: 3, name: "user3" },
   { id: 4, name: "user4" },
];

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const authQuery = req.query.auth;

    if (authHeader === 'Bearer ZEWAIL' || authQuery === 'BearerZEWAIL') {
        next(); 
    } else {
        res.status(403).json({ message: 'no >:( add ?auth=BearerZEWAIL' });
    }
};

router.get('/', (req, res) => {
    res.send('This is the root :D');
});

router.use(authMiddleware);

router.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});

router.get('/names', (req, res) => {
    res.json(users);
});

router.get('/names/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
        res.status(404).json({ error: `No user with id:${id} is found :(` });
    } else {
        res.json(user);
    }
});

router.put('/names/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedUser = req.body;
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
        res.status(404).json({ error: `No user with id:${id} is found :(` });
    } else {
        users[index] = { ...users[index], ...updatedUser };
        res.json(users[index]);
    }
});

router.delete('/names/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
        res.status(404).json({ error: `No user with id:${id} is found :(` });
    } else {
        const deletedUser = users.splice(index, 1);
        res.json(deletedUser[0]);
    }
});

module.exports = router;
