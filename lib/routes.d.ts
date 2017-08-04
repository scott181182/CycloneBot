import { Handler } from "./handler";
import { Service } from "./service";
export declare const SERVICES: Array<new () => Service>;
export declare const ROUTES: {
    [route: string]: {
        [method: string]: new () => Handler;
    };
};
