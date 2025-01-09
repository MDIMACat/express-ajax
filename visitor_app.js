const express = require("express");
const path = require("path")
const { createTable } = require("./src/visitor");
const  visitorsRoutes  = require("./src/routes/visitorRoutes");
const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./src/public")));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use("/app", visitorsRoutes)

app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}/app`);
  try {
    const result = await createTable();
    console.log(`${result}`)
  } catch (error) {
    throw new Error(`Unable to create table : ${error}`);
  }
});