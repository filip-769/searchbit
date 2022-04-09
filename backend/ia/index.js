import math from "./math.js";
import weather from "./weather.js";
import ipInfo from "./ipInfo.js";
import currency from "./currency.js";
import numberGenerator from "./randomNumber.js";
import passwordGenerator from "./randomPassword.js";
import infobox from "./infobox.js";
import ptable from "./ptable.js";
import time from "./time.js";
import holidays from "./holidays.js";
import nameday from "./nameday.js";
import translator from "./translator.js";
import programming from "./programming.js";
import questions from "./questions.js";

const regexes = {
    ipInfo: /(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])/i,
    passwordGenerator: /token|random password|password generator|generate password/i,
    numberGenerator: /rng|random number/i,
    nameday: /nameday/i,
    math: /\+|-|\/|\*/,
    weather: /weather/i,
    holidays: /holidays/i,
    nameday: /nameday/i,
    time: /time in|.+ time$/i,
    urlInfo: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
    ptable: /(^(H|He|Li|Be|B|C|N|O|F|Ne|Na|Mg|Al|Si|P|S|Cl|Ar|K|Ca|Sc|Ti|V|Cr|Mn|Fe|Co|Ni|Cu|Zn|Ga|Ge|As|Se|Br|Kr|Rb|Sr|Y|Zr|Nb|Mo|Tc|Ru|Rh|Pd|Ag|Cd|In|Sn|Sb|Te|I|Xe|Cs|Ba|La|Ce|Pr|Nd|Pm|Sm|Eu|Gd|Tb|Dy|Ho|Er|Tm|Yb|Lu|Hf|Ta|W|Re|Os|Ir|Pt|Au|Hg|Tl|Pb|Bi|Po|At|Rn|Fr|Ra|Ac|Th|Pa|U|Np|Pu|Am|Cm|Bk|Cf|Es|Fm|Md|No|Lr|Rf|Db|Sg|Bh|Hs|Mt|Ds|Rg|Cn|Nh|Fl|Mc|Lv|Ts|Og)$)|(Hydrogen|Helium|Lithium|Beryllium|Boron|Carbon|Nitrogen|Oxygen|Fluorine|Neon|Sodium|Magnesium|Aluminium|Silicon|Phosphorus|Sulfur|Chlorine|Argon|Potassium|Calcium|Scandium|Titanium|Vanadium|Chromium|Manganese|Iron|Cobalt|Nickel|Copper|Zinc|Gallium|Germanium|Arsenic|Selenium|Bromine|Krypton|Rubidium|Strontium|Yttrium|Zirconium|Niobium|Molybdenum|Technetium|Ruthenium|Rhodium|Palladium|Silver|Cadmium|Indium|Tin|Antimony|Tellurium|Iodine|Xenon|Cesium|Barium|Lanthanum|Cerium|Praseodymium|Neodymium|Promethium|Samarium|Europium|Gadolinium|Terbium|Dysprosium|Holmium|Erbium|Thulium|Ytterbium|Lutetium|Hafnium|Tantalum|Tungsten|Rhenium|Osmium|Iridium|Platinum|Gold|Mercury|Thallium|Lead|Bismuth|Polonium|Astatine|Radon|Francium|Radium|Actinium|Thorium|Protactinium|Uranium|Neptunium|Plutonium|Americium|Curium|Berkelium|Californium|Einsteinium|Fermium|Mendelevium|Nobelium|Lawrencium|Rutherfordium|Dubnium|Seaborgium|Bohrium|Hassium|Meitnerium|Darmstadtium|Roentgenium|Copernicium|Nihonium|Flerovium|Moscovium|Livermorium|Tennessine|Oganesson|Ununennium)/i,
    currencyConvertor: /(\$|€|₡|£|₪₹|¥|₩|₦|₱|₲|₴|₫|₽|(Zł)|AED|(AFN)|(ALL)|(AMD)|(ANG)|(AOA)|(ARS)|(AUD)|(AWG)|(AZN)|(BAM)|(BBD)|(BDT)|(BGN)|(BHD)|(BIF)|(BMD)|(BND)|(BOB)|(BRL)|(BSD)|(BTN)|(BWP)|(BYN)|(BYR)|(BZD)|(CAD)|(CDF)|(CHF)|(CLF)|(CLP)|(CNY)|(COP)|(CRC)|(CUC)|(CVE)|(CZK)|(DJF)|(DKK)|(DOP)|(DZD)|(EGP)|(ETB)|(EUR)|(FJD)|(FKP)|(GBP)|(GHS)|(GIP)|(GMD)|(GNF)|(GTQ)|(GYD)|(HKD)|(HNL)|(HRK)|(HTG)|(HUF)|(IDR)|(ILS)|(INR)|(IQD)|(ISK)|(JMD)|(JOD)|(JPY)|(KES)|(KGS)|(KHR)|(KMF)|(KRW)|(KWD)|(KYD)|(KZT)|(LAK)|(LBP)|(LKR)|(LRD)|(LSL)|(LYD)|(MAD)|(MDL)|(MGA)|(MKD)|(MMK)|(MNT)|(MOP)|(MRO)|(MUR)|(MVR)|(MWK)|(MXN)|(MYR)|(MZN)|(NAD)|(NGN)|(NIO)|(NOK)|(NPR)|(NZD)|(OMR)|(PAB)|(PEN)|(PGK)|(PHP)|(PKR)|(PLN)|(PYG)|(QAR)|(RON)|(RSD)|(RUB)|(RWF)|(SAR)|(SBD)|(SCR)|(SEK)|(SHP)|(SKK)|(SLL)|(SOS)|(SRD)|(SSP)|(STD)|(SVC)|(SZL)|(THB)|(TJS)|(TMT)|(TND)|(TOP)|(TRY)|(TTD)|(TWD)|(TZS)|(UAH)|(UGX)|(UYU)|(UZS)|(VES)|(VND)|(VUV)|(WST)|(XAF)|(XAG)|(XAU)|(XCD)|(XDR)|(XOF)|(XPD)|(XPF)|(XPT)|(XTS)|(YER)|(ZAR)|(ZMW)|(JEP)|(GGP)|(IMP)|(GBX)|(CNH)|(TMM)|(ZWL)|(SGD)|(USD)|(BTC)|(BCH)|(BSV)|(ETH)|(ETH2)|(ETC)|(LTC)|(ZRX)|(USDC)|(BAT)|(LOOM)|(MANA)|(KNC)|(LINK)|(DNT)|(MKR)|(CVC)|(OMG)|(GNT)|(DAI)|(SNT)|(ZEC)|(XRP)|(REP)|(XLM)|(EOS)|(XTZ)|(ALGO)|(DASH)|(ATOM)|(OXT)|(COMP)|(ENJ)|(REPV2)|(BAND)|(NMR)|(CGLD)|(UMA)|(LRC)|(YFI)|(UNI)|(BAL)|(REN)|(WBTC)|(NU)|(YFII)|(FIL)|(AAVE)|(BNT)|(GRT)|(SNX)|(STORJ)|(SUSHI)|(MATIC)|(SKL)|(ADA)|(ANKR)|(CRV)|(ICP)|(NKN)|(OGN)|(1INCH)|(USDT)|(FORTH)|(CTSI)|(TRB)|(POLY)|(MIR)|(RLC)|(DOT)|(SOL)|(DOGE)|(MLN)|(GTC)|(AMP)|(SHIB)|(CHZ)|(KEEP)|(LPT)|(QNT)|(BOND)|(RLY)|(CLV)|(FARM)|(MASK)|(FET)|(PAX)|(ACH)|(ASM)|(PLA)|(RAI)|(TRIBE)|(ORN)|(IOTX)|(UST)|(QUICK)|(AXS)|(REQ)|(WLUNA)|(TRU)|(RAD)|(COTI)|(DDX)|(SUKU)|(RGT)|(XYO)|(ZEN)|(AUCTION)|(JASMY)|(WCFG)|(BTRST)|(AGLD)|(AVAX)|(FX)|(TRAC)|(LCX)|(ARPA)|(BADGER)|(KRL)|(PERP)|(RARI)|(DESO)|(API3)|(NCT)|(SHPING)|(UPI)|(CRO)|(AVT)|(MDT)|(VGX)|(ALCX)|(COVAL)|(FOX)|(MUSD)|(GALA)|(POWR)|(GYEN)|(ALICE)|(INV)|(LQTY)|(PRO)|(SPELL)|(ENS)|(DIA)|(BLZ)|(CTX)|(ERN)|(IDEX)|(MCO2)|(POLS)|(SUPER)|(UNFI)|(STX)|(GODS)|(IMX)|(RBN)|(BICO)|(GFI)|(GLM)|(MPL)|(PLU)|(FIDA)|(ORCA)|(QSP)|(RNDR)|(SYN)|(AIOZ)|(AERGO)|(HIGH)) +(in|to|into)/i,
    unitConvertor: /(in|to|into)/i,
    translator: /translate .+ (into|to) .+/i,
    questions: /^(how|where|when|what|why|am|are|who|whom|which|whose) /i,
    programming: /($|^| )(Shell|Bash|C#|C\+\+|C|CSS|Html|Java|Javascript|js|Objectiv-C|PHP|Python|SQL|Swift|Whatever|Ruby|TypeScript|ts|Go|Kotlin|Assembly|R|VBA|Scala|Rust|Dart|Elixir|Clojure|WebAssembly|F#|Erlang|Haskell|Matlab|Cobol|Fortran|Scheme|Perl|Groovy|Lua|Julia|Delphi|Abap|Lisp|Prolog|Pascal|PostScript|Smalltalk|ActionScript|BASIC|Solidity|PowerShell|GDScript|Excel)($|^| )/i,
    infobox: /.+/,
}


export default async (q) => {
    const list = [];
    for (const regex in regexes) {
        if(regexes[regex].test(q)) {
            switch(regex) {
                case "infobox":
                    list.push({ type: "infobox", response: await infobox(q) });
                    break;
                case "math":
                    list.push({ type: "math", response: await math(q) });
                    break;
                case "weather":
                    list.push({ type: "weather", response: await weather(q) });
                    break;
                case "ipInfo":
                    list.push({ type: "ipInfo", response: await ipInfo(q) });
                    break;
                case "ptable":
                    list.push({ type: "ptable", response: await ptable(q) });
                    break;
                case "nameday":
                    list.push({ type: "nameday", response: await nameday(q) });
                    break;
                case "holidays":
                    list.push({ type: "holidays", response: await holidays(q) });
                    break;
                case "time":
                    list.push({ type: "time", response: await time(q) });
                    break;
                case "currencyConvertor":
                    list.push({ type: "currencyConvertor", response: await currency(q) });
                    break;
                case "numberGenerator":
                    list.push({ type: "numberGenerator", response: await numberGenerator(q) });
                    break;
                case "passwordGenerator":
                    list.push({ type: "passwordGenerator", response: await passwordGenerator(q) });
                    break;
                case "translator":
                    list.push({ type: "translator", response: await translator(q) });
                    break;
                case "programming":
                    list.push({ type: "programming", response: await programming(q) });
                    break;
                case "questions":
                    list.push({ type: "questions", response: await questions(q) });
                    break;
            }
        }
    }
    return list.filter(object => !!object.response);
}