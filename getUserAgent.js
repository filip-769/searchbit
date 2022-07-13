import { readFileSync } from "fs";

const raw = readFileSync("./serverConfig.json");
const json = JSON.parse(raw);

export default () => json.userAgent;