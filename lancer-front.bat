@echo off
chcp 65001 >nul
rem Lance le front RH Copilot sur http://localhost:5173
cd /d "%~dp0SAAS_RH_FRONT\SAAS_FRONT" || exit /b 1

if not exist "node_modules" call npm install

echo Demarrage du front sur http://localhost:5173 (Ctrl+C pour arreter)
echo L API doit etre lancee dans un autre terminal (lancer-api.bat).
call npm run dev -- --port 5173 --strictPort
