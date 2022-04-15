import { createHash } from "crypto";
import { Buffer } from "buffer";

export default async q => {
    if(q.toLowerCase().startsWith("url encode")) return { type: "urlEncode", data: encodeURIComponent(q.slice(11)) };
    if(q.toLowerCase().startsWith("url decode")) return { type: "urlDecode", data: decodeURIComponent(q.slice(11)) };
    if(q.toLowerCase().startsWith("base64 encode")) return { type: "base64Encode", data: Buffer.from(q.slice(14), "utf8").toString("base64") };
    if(q.toLowerCase().startsWith("base64 decode")) return { type: "base64Decode", data: Buffer.from(q.slice(14), "base64").toString("utf8") };
    if(q.toLowerCase().startsWith("md5")) return { type: "md5", data: createHash("md5").update(q.slice(4)).digest("hex") };
    if(q.toLowerCase().startsWith("sha256")) return { type: "sha256", data: createHash("sha256").update(q.slice(7)).digest("hex")};
    return;
}