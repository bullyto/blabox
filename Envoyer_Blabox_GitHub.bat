@echo off
setlocal EnableExtensions DisableDelayedExpansion
title Blabox - Envoi sur GitHub
set "BLABOX_SOURCE=%~dp0"
set "BLABOX_REMOTE=https://github.com/bullyto/blabox.git"
set "BLABOX_WORK=%TEMP%\Blabox-GitHub-%RANDOM%-%RANDOM%"
echo.
echo ===== Blabox - Envoi sur GitHub =====
echo Destination : https://github.com/bullyto/blabox
if not exist "%BLABOX_SOURCE%index.html" (
  echo Place ce BAT a cote de index.html dans le dossier extrait de la demo.
  goto :failed
)
where git >nul 2>nul
if errorlevel 1 (
  echo Installe Git pour Windows : https://git-scm.com/download/win
  goto :failed
)
where robocopy >nul 2>nul
if errorlevel 1 (
  echo Robocopy est introuvable sur ce PC.
  goto :failed
)
if exist "%BLABOX_WORK%" (
  echo Le dossier temporaire existe deja. Relance ce BAT.
  goto :failed
)
echo.
echo Recuperation du depot existant. Connecte-toi a GitHub si demande.
git clone "%BLABOX_REMOTE%" "%BLABOX_WORK%"
if errorlevel 1 goto :failed
pushd "%BLABOX_WORK%"
if errorlevel 1 goto :failed

git config user.name >nul 2>nul
if errorlevel 1 call :configure_name
if errorlevel 1 goto :failed_inside
git config user.email >nul 2>nul
if errorlevel 1 call :configure_email
if errorlevel 1 goto :failed_inside

echo.
echo Copie des fichiers de la demo...
robocopy "%BLABOX_SOURCE%." "%BLABOX_WORK%" /E /XD .git /XF .git /XJ /R:1 /W:1 /NFL /NDL /NJH /NJS
if errorlevel 8 goto :failed_inside

git add --all -- .
if errorlevel 1 goto :failed_inside
git diff --cached --quiet
if not errorlevel 1 goto :unchanged
git commit -m "Mise a jour de la demo Blabox"
if errorlevel 1 goto :failed_inside
echo.
echo Envoi des fichiers vers GitHub...
git push origin HEAD
if errorlevel 1 goto :failed_inside
echo.
echo TERMINE : la demo est sur https://github.com/bullyto/blabox
popd
goto :finish

:unchanged
echo.
echo Le depot contient deja les memes fichiers. Aucun nouvel envoi necessaire.
popd
goto :finish

:configure_name
set "BLABOX_AUTHOR_NAME="
set /p "BLABOX_AUTHOR_NAME=Nom pour les commits Git : "
if not defined BLABOX_AUTHOR_NAME exit /b 1
git config --local user.name "%BLABOX_AUTHOR_NAME%"
exit /b %errorlevel%

:configure_email
set "BLABOX_AUTHOR_EMAIL="
set /p "BLABOX_AUTHOR_EMAIL=Adresse e-mail GitHub pour les commits : "
if not defined BLABOX_AUTHOR_EMAIL exit /b 1
git config --local user.email "%BLABOX_AUTHOR_EMAIL%"
exit /b %errorlevel%

:failed_inside
popd
:failed
echo.
echo L'envoi n'a pas abouti. Lis le message ci-dessus.
echo Ton dossier de demo et le depot de son dossier parent restent inchanges.
echo Copie de travail, si creee : %BLABOX_WORK%
pause
exit /b 1

:finish
echo Tu peux relancer ce BAT pour envoyer tes prochaines modifications.
echo Copie de travail conservee : %BLABOX_WORK%
pause
exit /b 0
