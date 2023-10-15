import { NextFunction, Request, Response } from "express";
import { BadRequestException, UnauthorizedException } from "@exceptions";
import {v4 as uuidv4} from 'uuid';
import { tokens } from "@routes";

const userTokens: { [key: string]: string } = {};

class TokenController {
    auth = async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.body;
        const token = uuidv4();

        try {
            userTokens[email] = token;
            tokens.add(token);
            res.status(200).send(token);
        } catch (err) {
            next(err);
        }
    };
}

export default new TokenController();