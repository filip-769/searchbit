export default function cssCleaner (css, baseUrl) {
    css.match(/url ?\([^)]*\)/mg)?.forEach(x => {
        let url = x.replace(/url ?\(/, "").slice(0, -1);
        if (url.startsWith("'") || url.startsWith("\"")) url = url.slice(1, -1);
        if (url.startsWith("data:")) return;
        url = (new URL(url, baseUrl)).href;
        css = css.replace(x, `url("/proxy?url=${encodeURIComponent(url)}")`)
    })
    return css;
}