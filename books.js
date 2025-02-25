const express = require('express');
const router = express.Router();

const books = [
    { id: 1, title: 'Book name 1', author: 'Ahmed Ahmed', price: 50 },
    { id: 2, title: 'Amazing book', author: 'Mohammed Mohammed', price: 376 },
    { id: 3, title: 'Wow a name', author: 'Ashraf Ashraf Ashraf ibn Ashraf', price: 3999 },
];

router.use(express.json());

router.get('/', (req, res) => {
    res.send('This is the root :D');
});

router.post('/books', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.status(201).json(newBook);
});

router.get('/items', (req, res) => {
    res.json(books);
});

router.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find((book) => book.id === id);
    if (!book) {
        res.status(404).json({ error: `No book with id:${id} is found :(` });
    } else {
        res.json(book);
    }
});

router.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedBook = req.body;
    const index = books.findIndex((book) => book.id === id);
    if (index === -1) {
        res.status(404).json({ error: `No book with id:${id} is found :(` });
    } else {
        books[index] = { ...books[index], ...updatedBook };
        res.json(books[index]);
    }
});

router.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex((book) => book.id === id);
    if (index === -1) {
        res.status(404).json({ error: `No book with id:${id} is found :(` });
    } else {
        const deletedBook = books.splice(index, 1);
        res.json(deletedBook[0]);
    }
});

module.exports = router;