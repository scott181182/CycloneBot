/// <reference types="express" />
import { Request, Response } from "express";
import { Handler } from "../handler";
export declare class StatusHandler implements Handler {
    handle(req: Request, res: Response): Promise<void>;
}
