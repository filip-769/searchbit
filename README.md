# Searchbit
Searchbit is a meta search engine inspired by Searx.

## Installation

### Prerequisites
You need Git to install and Nodejs to run Searchbit.
1) Git
- To check if you have git installed run `git --version` in terminal.
- If not install it from https://git-scm.com/downloads.
2) Nodejs
- To check if you have nodejs installed run `node --version` in terminal.
- If you don't have it or have version older than v18 install the latest version from https://nodejs.dev/download/.


### Installation command
#### **Unix**
Run this command in some easily accessible folder to install* or if installed start Searchbit.

\* Searchbit is going to be installed in a folder named `searchbit`.
```bash
(ls index.js && clear && node --no-warnings . || ls searchbit &&cd searchbit && clear && node --no-warnings .) || (clear && echo "Cloning repositary" && git clone --quiet https://github.com/filip-769/searchbit.git &&cd searchbit && echo "Repositary cloned" && echo "Installing dependencies" && npm i --silent && echo "Dependencies installed" && echo "Running server" && node --no-warnings .)
```
If everything worked you should be able to visit `http://localhost:PORT`.

#### **Every OS**
To install, run these commands in any empty directory.
- `git clone https://github.com/filip-769/searchbit.git .`
- `npm i`

To start server, run this command in that directory.
- `node .`

If everything worked you should be able to visit `http://localhost:PORT`.

## Public Instances
| URL                                   | Notes                                   | Hosting                     |
|---------------------------------------|-----------------------------------------|-----------------------------|
| https://searchbit1.privateweb.eu.org/ | official                                | https://skyhosting.digital/ |
| https://searchbit2.privateweb.eu.org/ | official, usage monitoring by replit    | https://repl.it/            |
| https://searchbit3.privateweb.eu.org/ | official, traffic proxied by cloudflare | https://zenet.host/         |

Note: Official instances are updated at least once a month.

## FAQ

### Why does search takes to long to complete?
All search engines are enabled by default, which may be to much for some hardware, try using only a few engines.

### What are the minimum system requirements?
We don't have any limit, but it's recommended to have:
- Internet speed: 300mbit/s, 1gbit/s+ is recommened for all search engines enabled
- Storage: 100MB in more than enough
- CPU: any modern CPU
- RAM: more enabled engines -> more RAM, at least 1GB is recommened

### Which browser rendering engines are supported?
Currently only Blink 100+, Gecko 100+, WebKit 600+.

## Donations

### OpenAlias:

- **XMR**: xmr@privateweb.eu.org
- **BTC**: btc@privateweb.eu.org

### Address:

- **XMR**: `4AabpD4rV4cfznin3cYQmGJ7sLmB3VdX9FPN9xLKKMBkQUtiFXBUEJWBZnudQEZTuRKCAiXBmjtxdWKVNJgpcoXcFV3ztKW`
- **BTC**: `bc1qva8ztzeulyuhtknw0pnfcg62t8xudjsx3tn90q`

## Contact me
If you need help with Searchbit, please create an issue.
- Email: 1byo2en5@duck.com
- Matrix: [@filip769:matrix.org](https://matrix.to/#/@filip769:matrix.org)