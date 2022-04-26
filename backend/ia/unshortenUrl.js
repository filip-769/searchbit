export default async q => {
    const sourceUrl = q.match(/https?:\/\/.+\.[a-z]+/g)[0];
    const response = await fetch(`https://www.urlrevealer.com/api?url=${encodeURIComponent(sourceUrl)}`);
    const data = await response.text();

    return {
        sourceUrl,
        destinationUrl: data
    }
}