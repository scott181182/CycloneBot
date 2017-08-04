import { Request, Response } from "express";
import { Handler, Inject } from "../handler";
import { Status } from "../service";

import Logger from "../logger";
const logger = Logger.for("alexa");

import { AlexaService } from "../services/alexa.service";

export class AlexaHandler implements Handler
{
    @Inject("AlexaService")
    private alexa: AlexaService;

    public async handle(req: Request, res: Response)
    {
        const response = await this.alexa.processRequest(req.body);
        res.status(200).json(response);
    }
}
