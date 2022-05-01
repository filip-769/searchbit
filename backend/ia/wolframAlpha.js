export default async q => {
    const response = await fetch("https://www.wolframalpha.com/input/api/v1/code");
    const token = (await response.json()).code;

    const response2 = await fetch(`https://www.wolframalpha.com/input/json.jsp?input=${encodeURIComponent(q.slice(1).trim())}&proxycode=${token}&async=false&banners=raw&debuggingdata=false&format=image,plaintext,imagemap,minput,moutput&formattimeout=2&output=JSON&parsetimeout=2&scantimeout=0.5&sponsorcategories=true&statemethod=deploybutton`, { headers: { Referer: "https://www.wolframalpha.com/input/" }});
    const data = await response2.json();

    let input = "";
    let results = [];

    data.queryresult.pods.forEach(pod => {
        if(pod.id === "Input") {
            input = pod.subpods[0].plaintext;
        } else if (pod.subpods[0].plaintext) {
            results.push({ name: pod.title, data: pod.subpods[0].plaintext});
        }
    });

    return {
        input,
        results
    }
}