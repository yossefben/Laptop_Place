const express = require("express");
const path = require("path");

const mongoDb = require("./db/mongoConnect");

const {
  routesInit,
  originCorsAccess,
  fileUploadAccess,
} = require("./routes/app_routes");

let app = express();
app.use(require("cors")());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
originCorsAccess(app);
fileUploadAccess(app);
routesInit(app);

let port = process.env.PORT || 3900;
app.listen(port);
