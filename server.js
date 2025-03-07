const express =  require("express");
const app = express();


const bookRoutes = require("./books.js");
const authorRoutes = require("./authors.js");
const usersRoutes = require("./users.js");

app.use(express.json());
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/users", usersRoutes);

app.listen(3000, () => {
    console.log("Server is running http://localhost:3000")
})