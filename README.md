# Sveltekit Pocketbase Electron

This is a scaffolding project for sveltekit+pocketbase+electron. Most of the instructions came from following this [article](https://www.darricheng.com/posts/developing-an-electron-app-with-sveltekit/). 

## How to use

- Download [Pocketbase](https://pocketbase.io/docs/) and place under root directory.
- Install [sd](https://github.com/chmln/sd).
- Install [Just](https://github.com/casey/just). Then run `just install` and `just dev` in root directory to start.
 
The current justfile is made with windows powershell in mind. 


## Caveats

- Had to use hash based routing in order to work with electron: https://github.com/sveltejs/kit/issues/11997
- Had to add 'unsafe-inline' to make CSP work: https://github.com/sveltejs/kit/issues/11747