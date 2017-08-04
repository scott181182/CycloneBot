import { Service, Status } from "../service";
export declare class GroupMeService implements Service {
    init(): Promise<Status>;
    sendMessage(msg: string): Promise<Status>;
}
