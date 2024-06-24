const express = require("express");
const app = express();
const mainRouter = require("./routes/index");
app.use(express.json());

app.use("/api/vi", mainRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
