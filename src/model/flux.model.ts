import config from "../config";

import { FluxBulb, Color } from "fluxjs";

const myBulb = new FluxBulb(config.get("flux.ip"));
export default myBulb;

export const ColorMap: { [key: string]: Color } = {
    "white"  : new Color(255, 255, 255),
    "red"    : new Color(255, 0  , 0  ),
    "green"  : new Color(0  , 255, 0  ),
    "blue"   : new Color(0  , 0  , 255),
    "yellow" : new Color(255, 255, 0  ),
    "magenta": new Color(255, 0  , 255),
    "cyan"   : new Color(0  , 255, 255),

    "purple"  : new Color(128, 0  , 128),
    "orange"  : new Color(255, 128, 255),
    "fuchsia" : new Color(255, 0  , 255),
    "pink"    : new Color(255, 192, 203),
}
