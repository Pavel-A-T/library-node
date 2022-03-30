const express = require('express');
const cors = require('cors');
const formData = require("express-form-data");

const {Book} = require('./models');
const stor = {
    books: [],
};

[1, 2, 3].map(el => {
    const newBook = new Book(`book N${el}`, `desc book ${el}`);
    stor.books.push(newBook);
});

const app = express();
app.use(formData.parse());
app.use(cors());

app.get('/api/books', (req, res) => {
    const {books} = stor;
    res.json(books);
});

app.get('/api/books/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const index = books.findIndex(el => el.id === id);

    if (index !== -1) {
        res.json(books[index]);
    } else {
        res.status(404);
        res.json(`Book id=${id} not found`);
    }
});

app.post('/api/books', (req, res) => {
    const {title, description, favorite,
        fileCover, fileName} = req.body;
    const {books} = stor;
    const book = new Book(title, description, favorite, fileCover, fileName);
    books.push(book);
    res.status(201);
    res.json(book);
});

app.post('/api/user/login', (req, res) => {
    res.status(201);
    const obj = { id: 1, mail: "test@mail.ru" };
    res.json(obj);
});

app.put('/api/books/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const index = books.findIndex(el => el.id === id);

    if (index !== -1) {
        let book = books[index];
        const {title, description, favorite,
            fileCover, fileName} = req.body;
        book = {
            ...books[index],
            title,
            description,
            favorite,
            fileCover,
            fileName
        };
        res.json(book);
    } else {
        res.status(404);
        res.json(`Book id=${id} not found`);
    }

});

app.delete('/api/books/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const index = books.findIndex(el => el.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        res.json('ok');
    } else {
        res.status(404);
        res.json(`Book id=${id} not found`);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
