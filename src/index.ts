import * as express from "express";

import * as bodyParser from "body-parser";

import config from "./config";
import Logger from "./logger";
const logger = Logger.for("index");

import Application from "./application";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



process.on("uncaughtException", (err: NodeJS.ErrnoException) => {
  switch(err.code)
  {
    case "EADDRINUSE":
      logger.error("   Address currently in use!");
      break;
    case "EACCES":
      logger.error(`   Admin access required to use port ${app.get("port")}`);
      break;
    default: logger.error(err.stack);
  }
});

function main(args: string[])
{
  app.set("mode", config.get("env"));
  app.set("port", config.get("server.port"));
  app.set("staticDir", config.getPath("server.staticDir"));

  const application = new Application(app);
  application.init().then(() => application.start());
}
main(process.argv.slice(2));
