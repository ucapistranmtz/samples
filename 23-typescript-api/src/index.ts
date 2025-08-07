import express, { Request, Response } from "express";
//routes
import routes from "./routes/user.routes";

//midleware
import { errorHandler } from "./middlewares/error.middleware";

const port: number = Number(process.env.PORT) || 3000;
const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Api up and running" });
});

app.use("/api/users", routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is runing on https://localhost:${port}`);
});
