# Searchbit
Searchbit is a meta search engine inspired by Searx.

## Installation
You need nodejs >= 18 to run Searchbit.

1) Download all the files into a single folder.
2) Open the folder in your terminal.
3) Run `npm i`
4) Run `node .`
5) Open `http://localhost:14734` in your browser.

## Instances
| URL                                 | Notes                            |
|-------------------------------------|----------------------------------|
| http://connect.zenet.host:2021/     | no https, port 2021 only         |
| https://searchbit.filip769.repl.co/ | slow, usage monitoring by replit |

## FAQ

### Why am i getting a security warning from NPM?
This shouldn't have any effect on Searchbit and will be fixed, when https://github.com/mde/ejs/pull/645 will be merged.

### Which browser rendering engines are supported?
Currently only Blink 100+, Gecko 100+, WebKit 600+.