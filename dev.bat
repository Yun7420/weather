@echo off
cd /d "%~dp0"
call npx.cmd pnpm@latest run dev %*
