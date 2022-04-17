export default async q => {
    const data = q
    .replace(/^create/i, "")
    .replace(/^generate/i, "")
    .replace(/^make/i, "")
    .trim()
    .replace(/^barcode/i, "")
    .replace(/^qr/i, "")
    .trim()
    .replace(/^code/i, "")
    .trim();
    const type = q.includes("barcode") ? "barcode" : "qr";
    if(type === "barcode") {
        return {
            data,
            type: "barcode",
            img: "/proxy?url="+encodeURIComponent(`https://bwipjs-api.metafloor.com/?bcid=code128&includetext&text=${encodeURIComponent(data)}`)
        }
    } else if (type === "qr") {
        return {
            data,
            type: "qr",
            img: "/proxy?url="+encodeURIComponent(`https://api.qrserver.com/v1/create-qr-code/?format=svg&data=${encodeURIComponent(data)}`)
        }
    } else {
        return;
    }
}