export default class Logger {
    private domain;
    level: number;
    private constructor();
    static for(domain: string): Logger;
    private writeln(msg, tags, error);
    private println(msg, ...tags);
    private errorln(msg, ...tags);
    lethal(msg: string, ...tags: string[]): void;
    error(msg: string, ...tags: string[]): void;
    warn(msg: string, ...tags: string[]): void;
    info(msg: string, ...tags: string[]): void;
    debug(msg: string, ...tags: string[]): void;
}
