@echo off
chcp 65001 >nul
rem Lance l API RH Copilot sur http://localhost:3000
cd /d "%~dp0SAAS_RH_API\SAAS_API" || exit /b 1

if not exist ".env" (
  echo ERREUR : le fichier .env est absent dans SAAS_RH_API\SAAS_API.
  echo Copiez .env.example en .env et renseignez GROQ_API_KEY.
  exit /b 1
)

if not exist "node_modules" call npm install

echo Demarrage de l API sur http://localhost:3000 (Ctrl+C pour arreter)
call npm start
