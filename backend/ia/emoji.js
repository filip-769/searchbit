export default async q => {
    const response = await fetch(`https://duckduckgo.com/js/spice/emojipedia/${encodeURIComponent(q)}`);
    const data = JSON.parse(
        (await response.text())
        .slice(21)
        .slice(0,-3)
        .replaceAll("https://", "/proxy?url=https://")
        );

    return {
        character: data.emoji,
        description: data.description,
        name: data.name,
        imgs: data.vendor_images
    }
}