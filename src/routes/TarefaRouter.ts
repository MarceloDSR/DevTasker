import { Router } from "express";
import { TarefasController } from "../controllers/TarefasController"; 
import { AuthMiddleware } from "../middlewares/authMiddlewares"

const middleware = new AuthMiddleware()

// Instanciando o roteador
const router = Router();

router.post('/criarTarefa', TarefasController.create);
router.post('/achar', TarefasController.getById);
router.get('/users/', middleware.authenticateToken, TarefasController.getAll);

export default router;