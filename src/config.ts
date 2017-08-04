import { readFileSync, existsSync } from "fs";

import { Configuration } from "pure-config";

const CONFIG_DIR = `${__dirname}/config`;
type Mode = "prod" | "dev" | "tst";

const MODE: Mode =
    process.argv[2] ? process.argv[2] :
    existsSync(`${CONFIG_DIR}/mode.txt`) ? readFileSync(`${CONFIG_DIR}/mode.txt`, "utf8").trim() :
    process.env.NODE_ENV ? process.env.NODE_ENV :
    "dev";

const config = new Configuration(`${CONFIG_DIR}/${MODE}/config.pure`);
config.put("env", MODE);

export default config;
