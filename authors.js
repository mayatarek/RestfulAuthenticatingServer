const express = require('express');
const router = express.Router();

const authors = [
   { id: 1, name: "a" },
   { id: 2, name: "b" },
   { id: 3, name: "c" },
   { id: 4, name: "d" },
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

router.post('/authors', (req, res) => {
    const newAuthor = req.body;
    authors.push(newAuthor);
    res.status(201).json(newAuthor);
});

router.get('/names', (req, res) => {
    res.json(authors);
});

router.get('/names/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const author = authors.find((author) => author.id === id);
    if (!author) {
        res.status(404).json({ error: `No author with id:${id} is found :(` });
    } else {
        res.json(author);
    }
});

router.put('/names/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedAuthor = req.body;
    const index = authors.findIndex((author) => author.id === id);
    if (index === -1) {
        res.status(404).json({ error: `No author with id:${id} is found :(` });
    } else {
        authors[index] = { ...authors[index], ...updatedAuthor };
        res.json(authors[index]);
    }
});

router.delete('/names/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = authors.findIndex((author) => author.id === id);
    if (index === -1) {
        res.status(404).json({ error: `No author with id:${id} is found :(` });
    } else {
        const deletedAuthor = authors.splice(index, 1);
        res.json(deletedAuthor[0]);
    }
});

module.exports = router;
