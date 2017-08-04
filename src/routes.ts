import { Handler } from "./handler";
import { Service } from "./service";


import { GroupMeService } from "./services/groupme.service";

import { StatusHandler } from "./handlers/status.handler";
import { GroupMeCallback, GroupeMeTest } from "./handlers/groupme.handler";



export const SERVICES: Array<new() => Service> = [
    GroupMeService
];

export const ROUTES: { [route: string]: { [method: string]: new() => Handler } } =
{
    "/api/status": { get: StatusHandler },
    "/callback": { post: GroupMeCallback },
    "/api/groupme/test": { get: GroupeMeTest }
};
