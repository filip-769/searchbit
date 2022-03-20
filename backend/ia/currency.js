import fetch from "node-fetch";

export default async q => {
    const symbols = {
        "$": "USD",
        "€": "EUR",
        "₡": "CRC",
        "£": "GBP",
        "₪": "ILS",
        "₹": "INR",
        "¥": "JPY",
        "₩": "KRW",
        "₦": "NGN",
        "₱": "PHP",
       "Zł": "PLN",
        "₲": "PYG",
        "₴": "UAH",
        "₫": "VND",
        "₽": "RUB"
    }

    let from = q.replaceAll(/[1-9|.|,]|convert|transform|switch/g,"").split(" ").filter(Boolean)[0].trim().toUpperCase();
    let to =   q.replaceAll(/[1-9|.|,]|convert|transform|switch/g,"").split(" ").filter(Boolean).pop().trim().toUpperCase();
    const amout = parseFloat(q.replaceAll(/[^0-9|.|,]/g, "").replace(",",".")) || 1;

    for(const symbol in symbols) {
        if(symbol === from) {
            from = symbols[from];
        }

        if(symbol === to) {
            to = symbols[to];
        }
    }
    let json;
    try {
        const response = await fetch(`https://api.coinbase.com/v2/exchange-rates?currency=${encodeURIComponent(from)}`);
        json = await response.json();
    } catch (error) {
        return false;
    }

    return {
        from: {
            currency: from,
            amout: amout
        },
        to: {
            currency: to,
            amout: +json?.data?.rates[to] * amout
        }
    }
}