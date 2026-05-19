import { Router } from "express";
import * as Auth from "../../controllers/auth/auth.controller";
const router = Router();

router.get("/login", Auth.login);

export default router;