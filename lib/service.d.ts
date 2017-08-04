export interface Service {
    init(): Promise<Status>;
}
export declare class Status {
    status: string;
    message: string;
    private constructor();
    static ok(msg?: string): Status;
    static error(msg: string): Status;
    succeeded(): boolean;
}
