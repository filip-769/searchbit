export default async q => {
    const parts = q.replace(/timer/i, "").replace(/\s\s+/g, " ").trim().match(/\d+\.?\d* *\w+/g);
    let seconds = 0;
    let formattedParts = [];

    parts?.forEach(x => {
        formattedParts.push([
            x.match(/\d+\.?\d*/g)[0],
            x.replace(" ", "").replace(/\d+\.?\d*/g, "").toLowerCase().split("")[0]
        ])
    })

    formattedParts?.forEach(part => {
        if(part[1] === "s" || !part[1]) seconds += +part[0];
        if(part[1] === "m") seconds += part[0] * 60;
        if(part[1] === "h") seconds += part[0] * 3600;
        if(part[1] === "d") seconds += part[0] * 86400;
        if(part[1] === "w") seconds += part[0] * 604800;
    })

    return { seconds: Math.floor(seconds || 300) }
}