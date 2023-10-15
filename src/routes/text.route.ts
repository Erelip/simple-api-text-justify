import { TextController } from "@controllers";
import { checkRateLimit } from "@middlewares/validator.middleware";
import { TextSchema } from "@validations";
import { Router } from "express";

const router = Router();

router.post(
    "/",
    checkRateLimit,
    TextController.justify
);

export default router;