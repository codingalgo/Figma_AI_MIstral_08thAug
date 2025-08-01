@echo off
title DA Auto Test Generator - Desktop App
echo ===============================================
echo    DA Auto Test Generator from Figma
echo    Desktop App Launcher
echo ===============================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo Node.js found! Version: 
node --version
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies for first time...
    echo This may take a few minutes...
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install dependencies!
        echo Try running as Administrator or check your internet connection.
        pause
        exit /b 1
    )
    echo Dependencies installed successfully!
    echo.
) else (
    echo Dependencies already installed.
    echo.
)

echo Launching DA Auto Test Generator Desktop App...
echo.
echo Features available:
echo - Export Figma frames
echo - Generate AI test cases  
echo - Select and run .exe files
echo - Save files to any location
echo.

npx electron .

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to start the desktop app!
    echo Try the following:
    echo 1. Run this file as Administrator
    echo 2. Check if antivirus is blocking the app
    echo 3. Reinstall Node.js from https://nodejs.org
    echo.
)

pause