import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import cookieParser from "cookie-parser";
import notFound from "./app/middleware/notFound";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(cookieParser());

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use(globalErrorHandler);
app.use(notFound);

export default app;
