# Searchbit
Searchbit is a meta search engine inspired by Searx.

# Installation
You need nodejs to run Searchbit.

1) Download all the files into a single folder.
2) Open the folder in your terminal.
3) Run `npm i`
4) Run `node .`
5) Open `http://localhost:8080` in your browser.

# Fixing issues

## Search takes too long to complete
To solve this, you can do 2 things:
1) Decrease the maximum wait time in config.json
2) Turn off slow engines (usually baidu and yacy) in config.json
This can also be because of slow internet.

## Captcha
This can be solved by using proxies.
