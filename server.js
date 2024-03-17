const express = require("express");

// const dotenv = require("dotenv").config();
const contact_route = require("./routes/contactRoutes");
const user_route = require("./routes/userRoutes");
const errorHandle = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection")

const port = 5001

connectDb();
const app = express()

app.use(express.json());
app.use("/api/contacts", contact_route);
app.use("/api/users", user_route);
app.use(errorHandle)

app.listen(port, () =>{
    console.log(`server is running on ${port}`)
});
