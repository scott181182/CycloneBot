import Logger from "./logger";
const logger = Logger.for("status");

export interface Service
{
  init(): Promise<Status>;
}

export class Status
{


  private constructor(
    public status: string,
    public message: string
  ) {  }

  public static ok(msg?: string): Status   { return new Status("ok",    msg || ""); }
  public static error(msg: string): Status { return new Status("error", msg); }

  public succeeded() { return this.status === "ok"; }
}
