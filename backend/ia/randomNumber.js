import { randomInt } from "crypto";

export default async q => {
    const min = parseFloat(q.replaceAll(/[^0-9| ]/g, "").split(" ").filter(Boolean)[0]??0);
    const max = parseFloat(q.replaceAll(/[^0-9| ]/g, "").split(" ").filter(Boolean)[1]??10);
    if(!(min < max)) return false;
    

    let number;

    try {
        number = randomInt(min, max);
    } catch (error) {
        return false;
    }

    return {
        number: number,
        min: min,
        max: max
    }
}