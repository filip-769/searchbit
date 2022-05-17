import { JSDOM } from "jsdom";
import cssCleaner from "./cssCleaner.js";

export default function htmlCleaner (html, baseUrl) {
    const dom = new JSDOM(html);
    if(!dom.window.document.querySelector("link[rel=icon]")) {
        const iconEl = dom.window.document.createElement("link");
        iconEl.setAttribute("rel", "icon");
        iconEl.setAttribute("href", "/favicon.ico");
        dom.window.document.head.appendChild(iconEl);
    }
    dom.window.document.querySelectorAll("[href^='javascript:']").forEach(el => {
        if(el.hasAttribute("href")) el.removeAttribute("href");
    })
    dom.window.document.querySelectorAll("script, meta, applet, frameset, frame, link:not([rel=icon]):not([rel=stylesheet]), link:not([href])").forEach(el => el.remove());
    dom.window.document.querySelectorAll("[src]:not([src^='data:']), [href]:not([href^='#']), [xlink:href] , [srcset], [poster], [cite], [data], [background]").forEach(el => {
        try {
            if(el.hasAttribute("src")) el.setAttribute("src", `/proxy?url=${encodeURIComponent((new URL(el.getAttribute("src"), baseUrl)).href)}`);
            if(el.hasAttribute("href")) el.setAttribute("href", `/proxy?url=${encodeURIComponent((new URL(el.getAttribute("href"), baseUrl)).href)}`);
            if(el.hasAttribute("poster")) el.setAttribute("poster", `/proxy?url=${encodeURIComponent((new URL(el.getAttribute("poster"), baseUrl)).href)}`);
            if(el.hasAttribute("cite")) el.setAttribute("cite", `/proxy?url=${encodeURIComponent((new URL(el.getAttribute("cite"), baseUrl)).href)}`);
            if(el.hasAttribute("data")) el.setAttribute("data", `/proxy?url=${encodeURIComponent((new URL(el.getAttribute("data"), baseUrl)).href)}`);
            if(el.hasAttribute("background")) el.setAttribute("background", `/proxy?url=${encodeURIComponent((new URL(el.getAttribute("background"), baseUrl)).href)}`);
            if(el.hasAttribute("xlink:href")) el.setAttribute("xlink:href", `/proxy?url=${encodeURIComponent((new URL(el.getAttribute("xlink:href"), baseUrl)).href)}`);
            if(el.hasAttribute("srcset")) {
                el.setAttribute("srcset", el.getAttribute("srcset").split(",").map(src => {
                    return src.replace(src.split(" ")[0], `/proxy?url=${encodeURIComponent((new URL(src.split(" ")[0], baseUrl)).href)}`);
                }).join(","));
            };
        } catch (error) {
            console.error(error);
        }
    })

    dom.window.document.querySelectorAll("style").forEach(el => {
        el.textContent = cssCleaner(el.textContent, baseUrl);
    });

    dom.window.document.querySelectorAll("[style]").forEach(el => {
        el.setAttribute("style", cssCleaner(el.getAttribute("style"), baseUrl));
    })

    const blockedAttributes = ["ping","action","nonce","integrity","crossorigin","onabort","onanimationcancel","onanimationend","onanimationiteration","onanimationstart","onauxclick","onblur","oncancel","oncanplay","oncanplaythrough","onchange","onclick","onclose","oncontextmenu","ondblclick","ondrag","ondragend","ondragenter","ondragexit","ondragleave","ondragover","ondragstart","ondrop","ondurationchange","onemptied","onended","onerror","onfocus","onformdata","ongotpointercapture","oninput","oninvalid","onkeydown","onkeypress","onkeyup","onload","onloadeddata","onloadedmetadata","onloadend","onloadstart","onlostpointercapture","onmousedown","onmouseenter","onmouseleave","onmousemove","onmouseout","onmouseover","onmouseup","onmousewheel","onpause","onplay","onplaying","onpointercancel","onpointerdown","onpointerenter","onpointerleave","onpointermove","onpointerout","onpointerover","onpointerrawupdate","onpointerup","onprogress","onratechange","onreset","onresize","onscroll","onsecuritypolicyviolation","onseeked","onseeking","onselect","onselectionchange","onselectstart","onshow","onslotchange","onstalled","onsubmit","onsuspend","ontimeupdate","ontouchcancel","ontouchend","ontouchmove","ontouchstart","ontransitioncancel","ontransitionend","ontransitionrun","ontransitionstart","onvolumechange","onwaiting","onwheel"];
    blockedAttributes.forEach(attr => {
        dom.window.document.querySelectorAll(`[${attr}]`).forEach(el => {
            if(el.hasAttribute(attr)) el.removeAttribute(attr);
        })
    })
    return dom.serialize();
}