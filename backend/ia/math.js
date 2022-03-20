import { evaluate } from "mathjs";


export default async q => {
    try {
        return {
            left: q.replaceAll(",", "."),
            right: evaluate(q.replaceAll(",", "."))+""
        }
    } catch (error) {
        return false;
    }
}