import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cors from "cors";
import { useTransaction } from "./transaction";
import googleFitMiddleWare from "./googleFit";

const app = express();

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.all("/", (req, res) => res.status(200).send({ status: "ok" }));
app.all("/favicon.ico", (req, res) => res.status(200).send());

app.use("*", useTransaction);

app.use(googleFitMiddleWare);

export default app;