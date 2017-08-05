import { Handler } from "./handler";
import { Service } from "./service";


import { GroupMeService } from "./services/groupme.service";
import { AlexaService } from "./services/alexa.service";

import { StatusHandler } from "./handlers/status.handler";
import { GroupMeCallback, GroupeMeTest } from "./handlers/groupme.handler";
import { AlexaHandler } from "./handlers/alexa.handler";
import { LightHandler } from "./handlers/flux.handler";



export const SERVICES: Array<new() => Service> = [
    GroupMeService,
    AlexaService
];

export const ROUTES: { [route: string]: { [method: string]: new() => Handler } } =
{
    "/api/status": { get: StatusHandler },
    "/callback": { post: GroupMeCallback },
    "/api/groupme/test": { get: GroupeMeTest },
    "/api/alexa": { post: AlexaHandler },
    "/api/flux/:control": { get: LightHandler }
};
