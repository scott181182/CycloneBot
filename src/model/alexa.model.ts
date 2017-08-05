import { Response, OutputSpeech, Card, Reprompt } from "alexa-sdk";

export class AlexaResponse implements Response
{
    public outputSpeech: OutputSpeech;
    public card: Card;
    public reprompt: Reprompt;
    public shouldEndSession: boolean;

    public constructor()
    {
        this.tell("I don't know what to say!");
    }

    public tell(text: string) {
        this.outputSpeech = { type: "PlainText", text };
        this.shouldEndSession = true;
    }
    public  ssml(ssml: string) {
        this.outputSpeech = { type: "SSML", ssml };
        this.shouldEndSession = true;
    }
    public prompt(text: string, reprompt = "What is my purpose?") {
        this.tell(text);
        this.reprompt = { outputSpeech: { type: "PlainText", text: reprompt } };
        this.shouldEndSession = false;
    }
    public promptSSML(text: string, reprompt: string) {
        this.ssml(text);
        this.reprompt = { outputSpeech: { type: "SSML", ssml: reprompt } };
        this.shouldEndSession = false;
    }
}
