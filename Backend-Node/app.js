import express from "express";
import morgan from "morgan";
import globalErrorHandler from "./src/controllers/errorController";
import router from "./src/routers/router";
import AppError from "./utils/AppError";
var cors = require('cors')
const app = express();

app.use(cors());

// parse application/json
app.use(express.json());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1", router);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
