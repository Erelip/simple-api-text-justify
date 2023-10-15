import { TokenController } from "@controllers";
import { Router } from "express";

const router = Router();

router.post(
    "/",
    TokenController.auth
);

export default router;