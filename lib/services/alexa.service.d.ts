import { Service, Status } from "../service";
import { ResponseBody } from "alexa-sdk";
export declare class AlexaService implements Service {
    private intentMap;
    init(): Promise<Status>;
    processRequest(req: any): Promise<ResponseBody>;
    private handleLaunchRequest(response);
    private handleIntentRequest(request, response);
    private handleSessionEndedRequest(response);
    private handleUnhandledRequest(response);
}
