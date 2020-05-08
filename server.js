const express = require("express");
const connectToDb = require("./config/db");

const app = express();

connectToDb();

//Init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) =>
    res.json({ msg: "Welcome to contact keeper's API" })
);

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
