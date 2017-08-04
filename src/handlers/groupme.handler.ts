import { Request, Response } from "express";
import { Handler, Inject } from "../handler";
import { Status } from "../service";
import Logger from "../logger";

import { GroupMeService } from "../services/groupme.service";

export class GroupMeCallback implements Handler
{
    private logger = Logger.for("groupme.callback");

    @Inject("GroupMeService")
    private groupme: GroupMeService;

    public async handle(req: Request, res: Response)
    {
        this.logger.info(req.body);
        res.json({ status: Status.ok(req.body) });
    }
}
export class GroupeMeTest implements Handler
{
    @Inject("GroupMeService")
    private groupme: GroupMeService;

    public async handle(req: Request, res: Response)
    {
        const response = await this.groupme.sendMessage("Testing from Server!");
        res.json({ status: Status.ok("Tested"), data: response });
    }
}
