import { Response, OutputSpeech, Card, Reprompt } from "alexa-sdk";
export declare class AlexaResponse implements Response {
    outputSpeech?: OutputSpeech;
    card?: Card;
    reprompt?: Reprompt;
    shouldEndSession: boolean;
    constructor();
    tell(text: string): void;
    ssml(ssml: string): void;
    prompt(text: string, reprompt: string): void;
    promptSSML(text: string, reprompt: string): void;
}
