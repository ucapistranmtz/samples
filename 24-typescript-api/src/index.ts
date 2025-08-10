import express, { Application } from "express";
import userRoutes from "./routes/userRoutes";

const app: Application = express();

app.use(express.json());

app.use("/api/users", userRoutes);

const PORT = process.env.port || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
