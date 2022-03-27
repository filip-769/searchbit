# Data sources

## Search engines

Name | Website | Pagination | Web | Autocomplete | Image 
-----|---------|:----------:|:---:|:------------:|:-----:
Alexandria | https://alexandria.org | &check; | &check; | &cross; | &cross;
Baidu | https://baidu.com | &check; | &check; | &cross; | &cross;
Bing | https://bing.com | &check; | &check; | &check; | &cross;
Brave | https://search.brave.com | &cross; | &check; | &check; | &cross;
Crawlson | https://crawlson.com | &cross; | &check; | &cross; | &cross;
Entfer | https://entfer.com | &cross; | &check; | &cross; | &cross;
Exactseek | https://exactseek.com | &check; | &check; | &cross; | &cross;
Exalead | https://exalead.com/search/ | &check; | &check; | &check; | &cross;
Fairsearch | https://fairsearch.com | &check; | &check; | &check; | &cross;
Gigablast | https://gigablast.com | &check; | &check; | &cross; | &cross;
Google | https://google.com | &check; | &check; | &check; | &cross;
Infotiger | https://infotiger.com | &check; | &check; | &cross; | &cross;
Mojeek | https://mojeek.com | &check; | &check; | &cross; | &cross;
Naver | https://naver.com | &check; | &check; | &check; | &cross;
Neeva | https://neeva.com | &check; | &check; | &check; | &cross;
Petal | https://petalsearch.com | &check; | &check; | &cross; | &cross;
Qwant | https://qwant.com | &check; | &check; | &check; | &cross;
Right Dao | https://rightdao.com | &check; | &check; | &cross; | &cross;
Seekport | http://seekport.com | &check; | &check; | &cross; | &cross;
Seznam | https://search.seznam.cz | &check; | &check; | &check; | &cross;
Teclis | https://teclis.com | &check; | &check; | &cross; | &cross;
Usearch | https://usearch.com | &check; | &check; | &check; | &cross;
Wiby | https://wiby.org | &check; | &check; | &cross; | &cross;
Yacy | https://yacy.searchlab.eu | &check; | &check; | &check; | &cross;
Yandex | https://yandex.com | &check; | &check; | &check; | &cross;
Yessle | https://yessle.com | &cross; | &check; | &cross; | &cross;
Yioop | https://yioop.com | &check; | &check; | &cross; | &cross;

Notes:
- Neeva, Qwant and Mojeek image search was excluded, because it looks like they only get images from Bing.

## Instant answers

Used for | Website | Rate limiting
 --- | --- | ---
Currency conversion | https://developers.coinbase.com/api/v2 | 10 000/h
Public holidays | https://date.nager.at/Api | unknown
Infobox | https://api.duckduckgo.com/api | throttling at high QPS
IP info | https://reallyfreegeoip.org/ | do not abuse
Namedays | https://nameday.abalin.net/docs/ | unknown
Time | https://timeapi.io/ | unknown
Geolocation | https://open-meteo.com/en/docs/geocoding-api | 10 000/day
Weather | https://weatherdbi.herokuapp.com/ | unknown

Data for all other instant answers is generated locally
