export default async q => {
    const response = await fetch(`https://www.codegrepper.com/api/search.php?q=${encodeURIComponent(q)}&search_options=search_titles`);
    const data = await response.json();

    if(!data.answers[0]) return;

    return {
        code: data.answers[0].answer.trim(),
        language: data.answers[0].language
    };
}