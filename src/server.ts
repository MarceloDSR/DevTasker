import usuarioRouter from "../src/routes/UsuarioRouter";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { error } from "console";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", usuarioRouter);

AppDataSource.initialize().then(() => {
  app.listen(3000, () => console.log("Server is running on port 3000"));
}).catch((error) => {
  console.log("Erro ao conectar ao banco de dados!", error)
});