/// <reference types="express" />
import { Request, Response } from "express";
import { Handler } from "../handler";
export declare class AlexaHandler implements Handler {
    private alexa;
    handle(req: Request, res: Response): Promise<void>;
}
