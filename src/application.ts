import { Express, RequestHandler, static as serveFiles } from "express";
import { dirname, resolve } from "path";

import Logger from "./logger";
const logger = Logger.for("app");

import { Handler } from "./handler";
import { ROUTES, SERVICES } from "./routes";
import { Service, Status } from "./service";

type Method =
  "get" | "post" | "put" | "delete" |
  "head" | "options" | "trace" | "connect";



const FN_ARGS      = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
const FN_ARG_SPLIT = /,/;
const FN_ARG       = /^\s*(_?)(.+?)\1\s*$/;

export default class Application
{
  private services: { [key: string]: Service } = {  };
  private handlers: { [key: string]: Handler } = {  };

  constructor(private app: Express) {  }
  public async init()
  {
    SERVICES.forEach((serv) => {
      this.services[(serv as any).name] = new serv();
    });
    const stat = await this.initServices();
    if(!stat.succeeded()) { logger.lethal(stat.message); }
    else { logger.info(stat.message); }

    Object.keys(ROUTES).forEach((path) => {
      const hooks = ROUTES[path];

      Object.keys(hooks).forEach((method) => {
        const handlerClass = hooks[method];
        const handler = this.injectHandler(handlerClass);

        this.handlers[(handlerClass as any).name] = handler;
        this.app[method as Method](path, handler.handle.bind(handler));
      });
    });

    this.app.use(serveFiles(this.app.get("staticDir")));
    this.app.get("*", (req, res) =>
      // res.sendFile(`${this.app.get("staticDir")}/index.html`)
      res.status(404).json({ status: Status.error("Resource not found!") })
    );
  }
  public start()
  {
    this.app.listen(this.app.get("port"), () => {
      logger.info(`Server running!\n   Port: ${this.app.get("port")}\n   Mode: ${this.app.get("mode")}`);
      logger.info(this.app.get("mode") === "dev" ?
        "To run in production, pass 'prod' as an argument" :
        "To run in development, don't pass 'prod' as an argument");
    });
  }

  private async initServices(): Promise<Status>
  {
    let ret = Status.ok("All Services initialized successfully!");

    const keys = Object.keys(this.services);
    for(const key of keys)
    {
      logger.info(`   Initializing service [${key}]...`);
      const stat = await this.services[key].init();
      if(!stat.succeeded()) {
        ret = Status.error(`[${key}] ${stat.message}`);
        break;
      }
      logger.info(`   ${stat.message}`);
    }
    return ret;
  }
  private injectHandler(fn: new() => Handler): Handler
  {
    const handl = new fn();
    const inject: { [field: string]: string } = (handl as any)._inject;
    if(inject) {
      Object.keys(inject).forEach((field) => {
        (handl as any)[field] = this.services[inject[field]];
      });
    }
    return handl;
  }
}
