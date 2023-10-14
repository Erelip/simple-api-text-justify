import { Schema } from "express-validator";

const TextSchema: Schema = {
    text: {
        in: "body",
        notEmpty: {
            errorMessage: "Text is required.",
        },
    },
};

export default {
    TextSchema,
};