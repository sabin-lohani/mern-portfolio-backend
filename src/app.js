import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// import routes
import authRouter from "../routes/auth.routes.js";
import siteRouter from "../routes/site.routes.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/site", siteRouter);

export default app;
