import config from "../config";
import { Service, Status } from "../service";

import Logger from "../logger";
const logger = Logger.for("groupme");

import * as request from "request";

const ENDPOINT = config.get("groupme.endpoint");
const BOT_ID   = config.get("groupme.botID");
const GROUP_ID = config.get("groupme.groupID");

export class GroupMeService implements Service
{

    public async init()
    {
        return Status.ok("empty");
    }

    public sendMessage(msg: string): Promise<Status>
    {
        const options: request.CoreOptions & request.UrlOptions = {
            url: ENDPOINT,
            method: "post",
            json: true,
            body: { text: msg, bot_id: BOT_ID }
        };
        return new Promise((resolve, reject) => {
            request(options, (err, res) => {
                if(err) {
                    logger.error(err);
                    reject(err);
                }
                else { resolve(res.body); }
            });
        });
    }
}
