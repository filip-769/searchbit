import { Readable } from "node:stream";
import htmlCleaner from "./htmlCleaner.js";
import cssCleaner from "./cssCleaner.js";

export default async function (req, res) {
    try {
        if(!/^https?:\/\//.test(req.query.url)) return res.status(400).json({ error: 400 });
        const response = await fetch(req.query.url);
        const type = response.headers.get("Content-Type");
        if(type) res.type(type);
        if(type?.includes("html")) {
            res.header({ "Content-Security-Policy": "default-src 'none'; sandbox; frame-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'self'; font-src 'self';" });
            res.send(htmlCleaner(await response.text(), req.query.url));
        } else if(type?.includes("css")) {
            res.send(cssCleaner(await response.text(), req.query.url));
        } else {
            res.header({ "Content-Security-Policy": "default-src 'none'" });
            if(type) res.type(type);
            Readable.fromWeb(response.body).pipe(res);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 500 });
    }
}