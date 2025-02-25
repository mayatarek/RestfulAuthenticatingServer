const express =  require("express");
const app = express();


const bookRoutes = require("./books.js");

app.use(express.json());
app.use("/books", bookRoutes);

app.listen(3000, () => {
    console.log("Server is running http://localhost:3000")
})