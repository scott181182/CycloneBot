import { appendFileSync } from "fs";

import config from "./config";

declare var process: any;

enum LogLevels { ERROR = 0, WARN, INFO, DEBUG }
const LEVEL: number = config.get("env") === "prod" ? LogLevels.INFO : LogLevels.DEBUG;


/* tslint:disable:no-console */
const outFile = config.get("logger.outFile");
const errFile = config.get("logger.errFile");
const outPath = config.getPath("logger.outFile");
const errPath = config.getPath("logger.errFile");
const writer: { log: (msg: string) => void, error: (msg: string) => void } = {
    log:   outFile === "console" ?
        (msg: string) => console.log(msg) :
        (msg: string) => appendFileSync(outPath, msg + "\n"),
    error: errFile === "console" ?
        (msg: string) => console.error(msg) :
        (msg: string) => appendFileSync(errPath, msg + "\n")
};

function pad(num: number) { return (num < 10 ? "0" : "") + num; }
function getTimestamp(): string
{
    const now = new Date();
    return now.getFullYear() +
        "-" + pad(now.getMonth() + 1) +
        "-" + pad(now.getDate()) +
        " " + pad(now.getHours()) +
        ":" + pad(now.getMinutes()) +
        ":" + pad(now.getSeconds());
}

export default class Logger
{
  public level = LEVEL;

  private constructor(private domain: string) {  }
  public static for(domain: string): Logger { return new Logger(domain); }

  private writeln(msg: string, tags: string[], error: boolean)
  {
    const preamble = tags.map((dom) => `[${dom}]`).join(" ");
    const timestamp = getTimestamp();
    const message = `[${timestamp}]${preamble} : ${msg}`;

    writer[error ? "error" : "log"](message);
  }

  private println(msg: string, ...tags: string[]) { this.writeln(msg, tags, false); }
  private errorln(msg: string, ...tags: string[]) { this.writeln(msg, tags, true); }

  public lethal(msg: string, ...tags: string[]) {
    this.errorln(msg, "lethal", ...tags);
    process.exit(1);
  }
  public error(msg: string, ...tags: string[]) {
    if(this.level >= LogLevels.ERROR) { this.errorln(msg, "error", this.domain, ...tags); }
  }
  public warn(msg: string, ...tags: string[]) {
    if(this.level >= LogLevels.WARN) {  this.errorln(msg, "warn", this.domain, ...tags); }
  }
  public info(msg: string, ...tags: string[]) {
    if(this.level >= LogLevels.INFO) {  this.println(msg, "info", this.domain, ...tags); }
  }
  public debug(msg: string, ...tags: string[]) {
    if(this.level >= LogLevels.DEBUG) { this.println(msg, "debug", this.domain, ...tags); }
  }
}
