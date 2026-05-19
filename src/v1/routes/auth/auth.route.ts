import { Router } from "express";
import * as Auth from "../../controllers/auth/auth.controller";
import{login} from "../../controllers/auth/auth.controller";
import makeCall from "../../../config/makeCall";

const router = Router();

router.get("/login", makeCall(login));

export default router;