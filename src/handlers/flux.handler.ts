import { Request, Response } from "express";
import { Handler, Inject } from "../handler";
import { Status } from "../service";

import Logger from "../logger";
const logger = Logger.for("flux");

import fluxbulb from "../model/flux.model";

export class LightHandler implements Handler
{
    public async handle(req: Request, res: Response)
    {
        fluxbulb.turn(req.params.control.toLowerCase() === "on");
        res.status(200).json({ status: Status.ok("Mission Accomplished") });
    }
}
