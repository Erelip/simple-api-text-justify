import { NextFunction, Request, Response } from "express";
import { TextService } from "@services";
import { BadRequestException, UnauthorizedException } from "@exceptions";

class TextController {
    justify = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const text = TextService.justify("test");
            if (text == null)
                throw new BadRequestException("Unknown action.");
            return res.status(200).json('test');
        } catch (err) {
            next(err);
        }
    };
}

export default new TextController();