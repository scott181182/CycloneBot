import { Request, Response } from "express";
import { Handler, Inject } from "../handler";
import { Status } from "../service";

export class StatusHandler implements Handler
{
  public async handle(req: Request, res: Response)
  {
    res.status(200).json({
      status: Status.ok("All good in the hood!")
    });
  }
}
