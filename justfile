# Set shell for Windows OSs:
# set windows-shell := ['cmd', '/c']
# set windows-shell := ["C:/Program Files/Git/usr/bin/bash.exe", "-c"]
set windows-shell := ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-Command"]

default: 
  just --list --unsorted

install:
	concurrently "cd svelte-app && pnpm install" "cd electron-app && pnpm install"

dev: 
  concurrently "cd svelte-app && pnpm run dev" "cd electron-app && pnpm run dev"

dev-frontend:
	concurrently "cd svelte-app && pnpm run dev"

build: full-svelte
	concurrently "cd electron-app && pnpm run build:win"

build-only: 
	concurrently "cd electron-app && pnpm run build:win"

full-svelte: build-svelte prep-svelte move-svelte

build-svelte:
  concurrently "cd svelte-app && pnpm run build"

prep-svelte:
	sd -F '/_app' './_app' svelte-app/build/index.html	

move-svelte:
	if (Test-Path "electron-app\out\renderer") { Remove-Item -Recurse -Force "electron-app\out\renderer" }; 
	New-Item -ItemType Directory -Force -Path "electron-app\out\renderer" | Out-Null; 
	Copy-Item -Path "svelte-app\build\*" -Destination "electron-app\out\renderer" -Recurse