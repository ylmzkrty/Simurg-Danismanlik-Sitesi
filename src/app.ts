import express, { NextFunction, Router } from "express";
const app = express();

import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import connectDB from "./utils/connectDatabase";
import logger from "./utils/logger";
import apiRouter from "./manager/apiRouter";
import accountRouter from "./manager/accountRouter";

import pageRouter from "./manager/pageRouter";

import cookieParser from "cookie-parser"

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(cookieParser());

//pages
app.use("/", pageRouter);

//account
app.use("/account/", accountRouter);

//api
app.use("/api/", apiRouter);


app.listen(3000, async () => {
  await connectDB();
  logger.info("Project Running");
});
