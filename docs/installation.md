# Installation

## Option one - installation using docker
WIP

## Option two - direct installation command into folder
### Prerequisites
1) Git
- To check if you have git installed run `git --version` in terminal.
- If not install it from https://git-scm.com/downloads.
2) Nodejs
- To check if you have nodejs installed run `node --version` in terminal.
- If you don't have it or have version older than v18 install the latest version from https://nodejs.dev/download/.

### Unix method
Run this command in some easily accessible folder to install* or if installed start Searchbit.

\* Searchbit is going to be installed in a folder named `searchbit`.
```bash
(ls index.js && clear && npm run start || ls searchbit &&cd searchbit && clear && npm run start) || (clear && echo "Cloning repositary" && git clone --quiet https://github.com/filip-769/searchbit.git &&cd searchbit && echo "Repositary cloned" && echo "Installing dependencies" && npm i --silent && echo "Dependencies installed" && echo "Running server" && npm run start)
```
If everything worked you should be able to visit `http://localhost:PORT`.

### **Windows**
Note: running on Windows is not recommended!
To install, run these commands in any empty directory.
- `git clone https://github.com/filip-769/searchbit.git .`
- `npm i`

To start server, run this command in that directory.
- `npm run start`

If everything worked you should be able to visit `http://localhost:PORT`.