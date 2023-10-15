import { NextFunction, Request, Response } from "express";
import { TextService } from "@services";
import { BadRequestException, UnauthorizedException } from "@exceptions";

class TextController {
    justify = async (req: Request, res: Response, next: NextFunction) => {
        const text = req.body.toString();
        try {
            const justify = TextService.justify(text);
            if (justify == null)
                throw new BadRequestException("Unknown action.");

            res.setHeader('Content-Type', 'text/plain');
            res.status(200).send(justify);
        } catch (err) {
            next(err);
        }
    };
}

export default new TextController();