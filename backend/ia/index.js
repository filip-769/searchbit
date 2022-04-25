const regexes = {
    ipInfo: /(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])/i,
    randomPassword: /token|random password|password generator|generate password/i,
    randomNumber: /rng|random number/i,
    nameday: /nameday/i,
    math: /\+|-|\/|\*/,
    weather: /weather/i,
    holidays: /holidays/i,
    nameday: /nameday/i,
    time: /time in|.+ time$/i,
    urlInfo: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
    ptable: /(^(H|He|Li|Be|B|C|N|O|F|Ne|Na|Mg|Al|Si|P|S|Cl|Ar|K|Ca|Sc|Ti|V|Cr|Mn|Fe|Co|Ni|Cu|Zn|Ga|Ge|As|Se|Br|Kr|Rb|Sr|Y|Zr|Nb|Mo|Tc|Ru|Rh|Pd|Ag|Cd|In|Sn|Sb|Te|I|Xe|Cs|Ba|La|Ce|Pr|Nd|Pm|Sm|Eu|Gd|Tb|Dy|Ho|Er|Tm|Yb|Lu|Hf|Ta|W|Re|Os|Ir|Pt|Au|Hg|Tl|Pb|Bi|Po|At|Rn|Fr|Ra|Ac|Th|Pa|U|Np|Pu|Am|Cm|Bk|Cf|Es|Fm|Md|No|Lr|Rf|Db|Sg|Bh|Hs|Mt|Ds|Rg|Cn|Nh|Fl|Mc|Lv|Ts|Og)$)|(Hydrogen|Helium|Lithium|Beryllium|Boron|Carbon|Nitrogen|Oxygen|Fluorine|Neon|Sodium|Magnesium|Aluminium|Silicon|Phosphorus|Sulfur|Chlorine|Argon|Potassium|Calcium|Scandium|Titanium|Vanadium|Chromium|Manganese|Iron|Cobalt|Nickel|Copper|Zinc|Gallium|Germanium|Arsenic|Selenium|Bromine|Krypton|Rubidium|Strontium|Yttrium|Zirconium|Niobium|Molybdenum|Technetium|Ruthenium|Rhodium|Palladium|Silver|Cadmium|Indium|Tin|Antimony|Tellurium|Iodine|Xenon|Cesium|Barium|Lanthanum|Cerium|Praseodymium|Neodymium|Promethium|Samarium|Europium|Gadolinium|Terbium|Dysprosium|Holmium|Erbium|Thulium|Ytterbium|Lutetium|Hafnium|Tantalum|Tungsten|Rhenium|Osmium|Iridium|Platinum|Gold|Mercury|Thallium|Lead|Bismuth|Polonium|Astatine|Radon|Francium|Radium|Actinium|Thorium|Protactinium|Uranium|Neptunium|Plutonium|Americium|Curium|Berkelium|Californium|Einsteinium|Fermium|Mendelevium|Nobelium|Lawrencium|Rutherfordium|Dubnium|Seaborgium|Bohrium|Hassium|Meitnerium|Darmstadtium|Roentgenium|Copernicium|Nihonium|Flerovium|Moscovium|Livermorium|Tennessine|Oganesson|Ununennium)/i,
    currency: /(\$|€|₡|£|₪₹|¥|₩|₦|₱|₲|₴|₫|₽|(Zł)|AED|(AFN)|(ALL)|(AMD)|(ANG)|(AOA)|(ARS)|(AUD)|(AWG)|(AZN)|(BAM)|(BBD)|(BDT)|(BGN)|(BHD)|(BIF)|(BMD)|(BND)|(BOB)|(BRL)|(BSD)|(BTN)|(BWP)|(BYN)|(BYR)|(BZD)|(CAD)|(CDF)|(CHF)|(CLF)|(CLP)|(CNY)|(COP)|(CRC)|(CUC)|(CVE)|(CZK)|(DJF)|(DKK)|(DOP)|(DZD)|(EGP)|(ETB)|(EUR)|(FJD)|(FKP)|(GBP)|(GHS)|(GIP)|(GMD)|(GNF)|(GTQ)|(GYD)|(HKD)|(HNL)|(HRK)|(HTG)|(HUF)|(IDR)|(ILS)|(INR)|(IQD)|(ISK)|(JMD)|(JOD)|(JPY)|(KES)|(KGS)|(KHR)|(KMF)|(KRW)|(KWD)|(KYD)|(KZT)|(LAK)|(LBP)|(LKR)|(LRD)|(LSL)|(LYD)|(MAD)|(MDL)|(MGA)|(MKD)|(MMK)|(MNT)|(MOP)|(MRO)|(MUR)|(MVR)|(MWK)|(MXN)|(MYR)|(MZN)|(NAD)|(NGN)|(NIO)|(NOK)|(NPR)|(NZD)|(OMR)|(PAB)|(PEN)|(PGK)|(PHP)|(PKR)|(PLN)|(PYG)|(QAR)|(RON)|(RSD)|(RUB)|(RWF)|(SAR)|(SBD)|(SCR)|(SEK)|(SHP)|(SKK)|(SLL)|(SOS)|(SRD)|(SSP)|(STD)|(SVC)|(SZL)|(THB)|(TJS)|(TMT)|(TND)|(TOP)|(TRY)|(TTD)|(TWD)|(TZS)|(UAH)|(UGX)|(UYU)|(UZS)|(VES)|(VND)|(VUV)|(WST)|(XAF)|(XAG)|(XAU)|(XCD)|(XDR)|(XOF)|(XPD)|(XPF)|(XPT)|(XTS)|(YER)|(ZAR)|(ZMW)|(JEP)|(GGP)|(IMP)|(GBX)|(CNH)|(TMM)|(ZWL)|(SGD)|(USD)|(BTC)|(BCH)|(BSV)|(ETH)|(ETH2)|(ETC)|(LTC)|(ZRX)|(USDC)|(BAT)|(LOOM)|(MANA)|(KNC)|(LINK)|(DNT)|(MKR)|(CVC)|(OMG)|(GNT)|(DAI)|(SNT)|(ZEC)|(XRP)|(REP)|(XLM)|(EOS)|(XTZ)|(ALGO)|(DASH)|(ATOM)|(OXT)|(COMP)|(ENJ)|(REPV2)|(BAND)|(NMR)|(CGLD)|(UMA)|(LRC)|(YFI)|(UNI)|(BAL)|(REN)|(WBTC)|(NU)|(YFII)|(FIL)|(AAVE)|(BNT)|(GRT)|(SNX)|(STORJ)|(SUSHI)|(MATIC)|(SKL)|(ADA)|(ANKR)|(CRV)|(ICP)|(NKN)|(OGN)|(1INCH)|(USDT)|(FORTH)|(CTSI)|(TRB)|(POLY)|(MIR)|(RLC)|(DOT)|(SOL)|(DOGE)|(MLN)|(GTC)|(AMP)|(SHIB)|(CHZ)|(KEEP)|(LPT)|(QNT)|(BOND)|(RLY)|(CLV)|(FARM)|(MASK)|(FET)|(PAX)|(ACH)|(ASM)|(PLA)|(RAI)|(TRIBE)|(ORN)|(IOTX)|(UST)|(QUICK)|(AXS)|(REQ)|(WLUNA)|(TRU)|(RAD)|(COTI)|(DDX)|(SUKU)|(RGT)|(XYO)|(ZEN)|(AUCTION)|(JASMY)|(WCFG)|(BTRST)|(AGLD)|(AVAX)|(FX)|(TRAC)|(LCX)|(ARPA)|(BADGER)|(KRL)|(PERP)|(RARI)|(DESO)|(API3)|(NCT)|(SHPING)|(UPI)|(CRO)|(AVT)|(MDT)|(VGX)|(ALCX)|(COVAL)|(FOX)|(MUSD)|(GALA)|(POWR)|(GYEN)|(ALICE)|(INV)|(LQTY)|(PRO)|(SPELL)|(ENS)|(DIA)|(BLZ)|(CTX)|(ERN)|(IDEX)|(MCO2)|(POLS)|(SUPER)|(UNFI)|(STX)|(GODS)|(IMX)|(RBN)|(BICO)|(GFI)|(GLM)|(MPL)|(PLU)|(FIDA)|(ORCA)|(QSP)|(RNDR)|(SYN)|(AIOZ)|(AERGO)|(HIGH)) +(in|to|into)/i,
    translator: /^translate .+ (into|to) .+$/i,
    tempMail: /(temp|temporary|(5|10) minute) (mail|email)/i,
    status: /^is .+ (down|up)($|\?$)|^.+ status$/i,
    encDec: /^((base64|url|braille|morse code) (encode|decode)|sha256|md5) /i,
    code: /(^create|^generate|^make|^) (qr|barcode) /i,
    timer: /^timer/i,
    wordInfo: /synonyms?|antonyms?|define|definitions?|phonetics|pronunciation/i,
    questions: /^(how|where|when|what|why|am|are|is|who|whom|which|whose) |\?$/i,
    programming: /($|^| )(Shell|Bash|C#|C\+\+|C|CSS|Html|Java|Javascript|js|Objectiv-C|PHP|Python|SQL|Swift|Whatever|Ruby|TypeScript|ts|Go|Kotlin|Assembly|R|VBA|Scala|Rust|Dart|Elixir|Clojure|WebAssembly|F#|Erlang|Haskell|Matlab|Cobol|Fortran|Scheme|Perl|Groovy|Lua|Julia|Delphi|Abap|Lisp|Prolog|Pascal|PostScript|Smalltalk|ActionScript|BASIC|Solidity|PowerShell|GDScript|Excel)($|^| )/i,
    infobox: /.+/,
    figlet: /figlet|big text/i,
    tos: /tos|tosdr|privacy policy|terms of service/i,
    whois: /whois +.+\..+/i,
}


export default async (q) => {
    const list = [];
    for (const regex in regexes) {
        if(regexes[regex].test(q)) {
            try {
                const func = (await import(`./${regex.replace(/[^a-zA-Z]+/g, "")}.js`)).default;
                list.push({ type: regex, response: await func(q) });
            } catch (error) {
                console.error(error);
            }
        }
    }
    return list.filter(object => !!object.response);
}