export default async (engine, q, p) => {
    try {
        const func = (await import(`./${engine.replace(/[^a-z]+/g, "")}.js`)).default;
        return await func(q, p);
    } catch (error) {
        console.error(error);
        return;
    }
}