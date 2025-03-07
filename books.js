const express = require('express');
const router = express.Router();

const books = [
    { id: 1, title: 'Book name 1', author: 'Ahmed Ahmed', price: 50, status: "checked out" },
    { id: 2, title: 'Amazing book', author: 'Mohammed Mohammed', price: 376, status: "available" },
    { id: 3, title: 'Wow a name', author: 'Ashraf Ashraf Ashraf ibn Ashraf', price: 3999, status: "available" },
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

router.post('/books', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.status(201).json(newBook);
});

router.post('/books/borrow/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find((book) => book.id === id);

    if (!book) {
        return res.status(404).json({ error: `No book with id:${id} is found :(` });
    }
    if (book.status === "checked out") {
        return res.status(400).json({ error: "Book is already checked out!" });
    }

    book.status = "checked out";
    res.json({ message: "Book borrowed successfully!", book });
});

router.post('/books/return/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find((book) => book.id === id);

    if (!book) {
        return res.status(404).json({ error: `No book with id:${id} is found :(` });
    }
    if (book.status === "available") {
        return res.status(400).json({ error: "Book is already returned!" });
    }

    book.status = "available";
    res.json({ message: "Book returned successfully!", book });
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
