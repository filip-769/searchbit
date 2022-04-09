import fetch from "node-fetch";

export default async q => {
    const response = await fetch(`https://www.answers.com/question/search?q=${encodeURIComponent(q)}`);
    const data = await response.json();

    const answers = [];

    data.data.forEach((answer, i) => {
        if(i > 4) return;
        answers.push({
            question: answer.title.endsWith("?") ? answer.title : answer.title + "?",
            answer: answer.answer_preview[0]
        })
    })

    if(!answers[0]) return;

    return { answers };
}