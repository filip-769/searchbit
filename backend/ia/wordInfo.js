import fetch from "node-fetch";

export default async q => {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(q.replace(/synonyms?|antonyms?|define|definitions?|phonetics|pronunciation| for /gi, "").trim())}`);
    const data = await response.json();

    const meanings = [];

    data[0]?.meanings.forEach(meaning => {
        const definitions = [];
        meaning.definitions.filter(x => x.definition).forEach(definition => definitions.push(definition.definition))
        meanings.push({
            type: meaning.partOfSpeech,
            synonyms: meaning.synonyms,
            antonyms: meaning.antonyms,
            definitions: definitions
        })
    });

    return {
        phonetics: {
            audio: data[0].phonetics.filter(x => !!x.audio)?.[0]?.audio,
            text: data[0].phonetic || data[0].phonetics.filter(x => !!x.text)?.[0]?.text
        },
        meanings
    };
}