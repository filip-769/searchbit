export default async q => {
    const response = await fetch(`http://d03.eu01.bot-hosting.net:5593/figlet?text=${encodeURIComponent(q.replace(/figlet|big text/g, ""))}`);
    const data = await response.json();

    return {
        figlet: data.figlet
    }
}