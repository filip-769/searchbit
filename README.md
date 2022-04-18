# Searchbit
Searchbit is a meta search engine inspired by Searx.

# Installation
You need nodejs >= 17.5.0 to run Searchbit.

1) Download all the files into a single folder.
2) Open the folder in your terminal.
3) Run `npm i`
4) Run `npm run start`
5) Open `http://localhost:14734` in your browser.

# FAQ

## Why are you using `ejs-zero-dependencies` instead of `ejs`
`EJS` is dependent on `jake`, which is dependent on `async`, which has/had a security vulnerability.
