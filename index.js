const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const database = require("./db/config");
const cors = require("cors");
const router = require("./routes/index");
const port = process.env.PORT || 3013;
database();

app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(router);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
