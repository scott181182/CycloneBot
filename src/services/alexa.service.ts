import config from "../config";
import { Service, Status } from "../service";

import { RequestBody, Request, IntentRequest, ResponseBody } from "alexa-sdk";
import { AlexaResponse } from "../model/alexa.model";
import { ColorMap } from "../model/flux.model";
import fluxbulb from "../model/flux.model";

import Logger from "../logger";
const logger = Logger.for("alexa");

const APP_ID = config.get("alexa.appID");

type Map<V> = { [key: string]: V };

export class AlexaService implements Service
{

    private intentMap:
        Map<(request: RequestBody<IntentRequest>, reponse: AlexaResponse) => Map<any>> =
    {
        "AMAZON.CancelIntent": (req, res) => this.handleSessionEndedRequest,
        "AMAZON.StopIntent":   (req, res) => this.handleSessionEndedRequest,

        "TurnLightOn":  (req, res) => {
            fluxbulb.turnOn();
            res.tell("Okay");
            return {  };
        },
        "TurnLightOff": (req, res) => {
            fluxbulb.turnOff();
            res.tell("Okay");
            return {  };
        },
        "TurnLightWarm": (req, res) => {
            fluxbulb.setWarm(1);
            res.tell("Okay");
            return {  };
        },
        "TurnLightColor": (req, res) => {
            const color = ColorMap[req.request.intent.slots.Color.value];
            fluxbulb.setRGB(color.red, color.green, color.blue);
            res.tell("Okay!");
            return {  };
        },
        "SetLightBrightness": (req, res) => {
            const level = parseInt(req.request.intent.slots.Level.value) / 100;

            res.tell("Sorry, I can't do that yet!");
            return {  };
        },
        "TurnLightDim": (req, res) => {
            fluxbulb.darken(0.5);
            res.tell("Okay");
            return {  };
        },
        "TurnLightBright": (req, res) => {
            fluxbulb.brighten(0.5);
            res.tell("Okay");
            return {  };
        }
    };

    public async init()
    {
        return Status.ok("empty");
    }

    public processRequest(req: any): Promise<ResponseBody>
    {
        const request = req as RequestBody<Request>;
        if(request.session.application.applicationId !== APP_ID) { return Promise.reject("Invalid Application ID!"); }

        const response: AlexaResponse = new AlexaResponse();
        let sessionMap: Map<any>;
        switch(request.request.type)
        {
            case "LaunchRequest": this.handleLaunchRequest(response); break;
            case "IntentRequest": sessionMap = this.handleIntentRequest(request, response); break;
            case "SessionEndedRequest": this.handleSessionEndedRequest(response); break;
        }

        return Promise.resolve({ version: "1.0", response, sessionAttributes: sessionMap });
    }

    private handleLaunchRequest(response: AlexaResponse)
    {
        response.prompt(
            "Cyclone Bot here. You can give me commands, like turn off the light, or turn the light green"
        );
    }
    private handleIntentRequest(request: RequestBody<IntentRequest>, response: AlexaResponse): Map<any>
    {
        if(this.intentMap[request.request.intent.name]) {
            return this.intentMap[request.request.intent.name](request, response);
        } else {
            this.handleUnhandledRequest(response);
            return {  };
        }
    }
    private handleSessionEndedRequest(response: AlexaResponse): Map<any> {
        response.tell("Goodbye!");
        response.shouldEndSession = true;
        return {  };
    }
    private handleUnhandledRequest(response: AlexaResponse) {
        response.prompt("Sorry, I don't know how to do that. Please try again");
    }
}
