/// <reference types="express" />
import { Request, Response } from "express";
export interface Handler {
    handle(req: Request, res: Response): void;
}
export declare function Inject(className: string): (clazz: Handler, name: string) => void;
