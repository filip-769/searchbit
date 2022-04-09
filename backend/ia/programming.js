import fetch from "node-fetch";

export default async q => {
    const response = await fetch(`https://www.codegrepper.com/api/search.php?q=${encodeURIComponent(q)}&search_options=search_titles`);
    const data = await response.json();

    const answers = [];

    data.answers.forEach((answer, i) => {
        if(i > 4) return;
        answers.push({
            code: answer.answer.trim(),
            language: answer.language
        })
    })

    if(!answers[0]) return;

    return { answers };
}