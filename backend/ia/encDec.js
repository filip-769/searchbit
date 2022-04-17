import { createHash } from "crypto";
import { Buffer } from "buffer";

export default async q => {
    if(q.toLowerCase().startsWith("url encode")) return { type: "urlEncode", data: encodeURIComponent(q.slice(11)) };
    if(q.toLowerCase().startsWith("url decode")) return { type: "urlDecode", data: decodeURIComponent(q.slice(11)) };
    if(q.toLowerCase().startsWith("base64 encode")) return { type: "base64Encode", data: Buffer.from(q.slice(14), "utf8").toString("base64") };
    if(q.toLowerCase().startsWith("base64 decode")) return { type: "base64Decode", data: Buffer.from(q.slice(14), "base64").toString("utf8") };
    if(q.toLowerCase().startsWith("braille encode")) return { type: "brailleEncode", data: q.replace("braille encode ", "").toUpperCase().split("").map(c => "⠀⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯⠰⠱⠲⠳⠴⠵⠶⠷⠸⠹⠺⠻⠼⠽⠾⠿"[" A1B'K2L@CIF/MSP\"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)=".indexOf(c)]).join("") };
    if(q.toLowerCase().startsWith("braille decode")) return { type: "brailleDecode", data: q.replace("braille decode ", "").split("").map(c => " A1B'K2L@CIF/MSP\"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)="["⠀⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯⠰⠱⠲⠳⠴⠵⠶⠷⠸⠹⠺⠻⠼⠽⠾⠿".indexOf(c)]).join("").toLowerCase() };
    if(q.toLowerCase().startsWith("morse code encode")) return { type: "morseEncode", data: q.replace("morse code encode ", "").split(" ").map(a => a.split("").map(b => ({"0":"-----","1":".----","2":"..---","3":"...--","4":"....-","5":".....","6":"-....","7":"--...","8":"---..","9":"----.","a":".-","b":"-...","c":"-.-.","d":"-..","e":".","f":"..-.","g":"--.","h":"....","i":"..","j":".---","k":"-.-","l":".-..","m":"--","n":"-.","o":"---","p":".--.","q":"--.-","r":".-.","s":"...","t":"-","u":"..-","v":"...-","w":".--","x":"-..-","y":"-.--","z":"--.."})[b]).join(" ")).join("   ") };
    if(q.toLowerCase().startsWith("morse code decode")) return { type: "morseDecode", data: q.replace("morse code decode ", "").split("   ").map(a => a.split(" ").map(b => ({".-":"a","-...":"b","-.-.":"c","-..":"d",".":"e","..-.":"f","--.":"g","....":"h","..":"i",".---":"j","-.-":"k",".-..":"l","--":"m","-.":"n","---":"o",".--.":"p","--.-":"q",".-.":"r","...":"s","-":"t","..-":"u","...-":"v",".--":"w","-..-":"x","-.--":"y","--..":"z",".----":"1","..---":"2","...--":"3","....-":"4",".....":"5","-....":"6","--...":"7","---..":"8","----.":"9","-----":"0"})[b]).join("")).join(" ") };
    if(q.toLowerCase().startsWith("md5")) return { type: "md5", data: createHash("md5").update(q.slice(4)).digest("hex") };
    if(q.toLowerCase().startsWith("sha256")) return { type: "sha256", data: createHash("sha256").update(q.slice(7)).digest("hex")};
    return;
}