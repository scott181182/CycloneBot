import config from "../config";

import { FluxBulb } from "fluxjs";

const myBulb = new FluxBulb(config.get("flux.ip"));
export default myBulb;
