import { TextController } from "@controllers";
import { validate } from "@middlewares/validator.middleware";
import { TextSchema } from "@validations";
import { Router } from "express";

const router = Router();

router.post(
    "/",
    validate(TextSchema.TextSchema),
    TextController.justify
);

export default router;