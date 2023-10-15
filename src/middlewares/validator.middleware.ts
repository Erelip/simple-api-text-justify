import { BadRequestException } from "@exceptions";
import type { Request, Response, NextFunction } from "express";
import { checkSchema, validationResult } from "express-validator";
import { tokens } from "@routes";

type ValidationMiddleware = (
    schema: any
) => (req: Request, res: Response, next: NextFunction) => void;

const rateLimits = new Map();
const MAX_WORDS_PER_DAY = 80000;

export const validate: ValidationMiddleware = (schema: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await checkSchema(schema).run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return next(new BadRequestException(errors.array().at(0)?.msg));
        return next();
    };
};

export const checkRateLimit: any = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (!tokens.has(token)) {
        return res.status(401).json({ error: 'Token invalide' });
    }
    
    if (!rateLimits.has(token)) {
        rateLimits.set(token, { wordsProcessed: 0, lastReset: new Date() });
    }
    
    const limit = rateLimits.get(token);
    
    const currentTime = new Date();
    if (currentTime.toDateString() !== limit.lastReset.toDateString()) {
        limit.wordsProcessed = 0;
        limit.lastReset = currentTime;
    }
    const text = req.body.toString();
    const len = text.split(' ').length;

    if (limit.wordsProcessed + len > MAX_WORDS_PER_DAY) {
        return res.status(402).json({ error: 'Payment Required' });
    }
    
    limit.wordsProcessed += len;
    next();
};