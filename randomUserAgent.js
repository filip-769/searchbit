import { readFileSync } from "fs";
import { randomInt } from "crypto";

export default () => {
    const raw = readFileSync("./userAgents.json");
    const json = JSON.parse(raw);
    const i = randomInt(json.length);
    return json[i];
}