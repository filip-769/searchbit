import fetch from "node-fetch";

export default async q => {
    const response = await fetch(`https://www.answers.com/question/search?q=${encodeURIComponent(q)}`);
    const data = await response.json();


    if(!data.data[0]) return;

    return {
        question: data.data[0].title.endsWith("?") ? data.data[0].title : data.data[0].title + "?",
        answer: data.data[0].answer_preview[0]
    };
}