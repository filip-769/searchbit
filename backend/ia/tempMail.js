import { randomBytes } from "crypto";

export default async q => {
    const email = "searchbit-" + randomBytes(10/2+1).toString("hex").slice(0, 10);
    return {
        email: email + "@maildrop.cc",
        url: `https://maildrop.cc/inbox/${email}`
    }
}