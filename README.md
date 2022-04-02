# Alpha Node
Searchbit is a meta search engine inspired by Searx.

# Installation
You need nodejs to run Searchbit.

1) Download all the files into a single folder.
2) Open the folder in your terminal.
3) Run `npm i`
4) Run `node .`
5) Open `http://localhost:14734` in your browser.

# Fixing issues

## Search takes too long to complete
To solve this, you can do 2 things:
1) Decrease the default wait delay in config.json
2) Turn off slow engines (usually Baidu and Yacy) in config.json

This can also be caused by slow internet connection.

## Captcha
This can be solved by using proxies.
