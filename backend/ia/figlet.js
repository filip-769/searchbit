export default async q => {
    const response = await fetch(`https://uploadbeta.com/api/figlet/?cached&msg=${encodeURIComponent(q.replace(/figlet|big text/i, ""))}`);
    const data = await response.json();

    return {
        figlet: data
    }
}