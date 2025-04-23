import { Router } from "express";
import { UsuarioController } from "../controllers/UsuariosController"
import { AuthMiddleware } from "../middlewares/authMiddlewares";

const middleware = new AuthMiddleware()

// Instanciando o roteador
const router = Router();

router.post('/register', UsuarioController.register);
router.post('/login', UsuarioController.login);
router.get('/users', middleware.authenticateToken, UsuarioController.getAll);

export default router;