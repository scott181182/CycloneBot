/// <reference types="express" />
import { Request, Response } from "express";
import { Handler } from "../handler";
export declare class GroupMeCallback implements Handler {
    private logger;
    private groupme;
    handle(req: Request, res: Response): Promise<void>;
}
export declare class GroupeMeTest implements Handler {
    private groupme;
    handle(req: Request, res: Response): Promise<void>;
}
