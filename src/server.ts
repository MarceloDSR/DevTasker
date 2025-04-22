import express from "express";
import usuarioRouter from "../src/routes/UsuarioRouter";

const app = express();
app.use(express.json()); // Para parsing de JSON

// Usar as rotas
app.use("/api", usuarioRouter);

// Iniciar o servidor
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});