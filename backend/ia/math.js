export default async q => {
    const response = await fetch(`https://api.mathjs.org/v4/?expr=${encodeURIComponent(q.replaceAll(",", "."))}`);
    const data = await response.text();

    return {
        left: q.replaceAll(",", "."),
        right: data
    }
}