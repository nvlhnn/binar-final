const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const { sequelize, UserGame } = require("./models");
const router = require("./routes/index.route.js");
const app = express();
const port = 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan("tiny"));
// require("./config/passport")(app);
app.use(router);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(errorHandler);

module.exports = app;
