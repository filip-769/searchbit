import { evaluate } from "mathjs";


export default async q => {
    return {
        left: q.replaceAll(",", "."),
        right: evaluate(q.replaceAll(",", "."))
    }
}