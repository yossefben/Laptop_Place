const indexRouter = require("./index");
const uploadR = require("./upload");
const usersR = require("./users");
const authR = require("./auth");
const prodR = require("./products");
const favpR = require("./favProducts");
const cardsR = require("./cards");
const favcR = require("./favCards");
const fileUpload = require("express-fileupload");

exports.routesInit = (app) => {
  app.use("/", indexRouter);
  app.use("/api/upload", uploadR);
  app.use("/api/users", usersR);
  app.use("/api/auth", authR);
  app.use("/api/products", prodR);
  app.use("/api/favProducts", favpR);
  app.use("/api/cards", cardsR);
  app.use("/api/favCards", favcR);

  app.use((req, res) => {
    res.status(404).json({ msg: "404 url page not found" });
  });
};

exports.fileUploadAccess = (app) => {
  app.use(
    fileUpload({
      limits: { fileSize: 5 * (1024 * 1024) },
    })
  );
};

exports.originCorsAccess = (app) => {
  app.all("*", (req, res, next) => {
    if (!req.get("Origin")) return next();
    res.set("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.set(
      "Access-Control-Allow-Headers",
      "X-Requested-With,Content-Type,x-auth-token"
    );
    next();
  });
};
