export default async q => {
    const text = q.replace("translate", "").split("to")[0].trim();
    const lang = q.replace("translate", "").split("to")[1].trim().toLowerCase();

    const response = await fetch(`https://simplytranslate.org/api/translate?text=${encodeURIComponent(text)}&to=${encodeURIComponent(lang)}`);
    const data = await response.json();

    return {
        fromText: text,
        toText: data["translated-text"],
        toLang: lang
    }
}