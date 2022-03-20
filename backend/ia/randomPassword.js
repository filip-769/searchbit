import { randomBytes } from "crypto";

export default async q => {
    const length = parseFloat(q?.replaceAll(/[^0-9| ]/g, ""))||10;
    let string;
    try {
        string = randomBytes(length/2+1).toString("hex").slice(0, length);
    } catch (error) {
        return false;
    }

    return {
        string: string,
        length: length
    }
}