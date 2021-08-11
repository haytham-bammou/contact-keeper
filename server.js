const express = require("express");
const path = require("path");

const app = express();
app.get("/", (req, res) =>
  res.json({ msg: "xelcom to the contact keeper api" })
);

// define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));