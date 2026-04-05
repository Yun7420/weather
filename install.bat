@echo off
cd /d "%~dp0"
echo Using npx.cmd (avoids PowerShell blocking npx.ps1)...
call npx.cmd pnpm@latest install %*
