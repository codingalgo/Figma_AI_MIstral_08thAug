@echo off
title Fix DA Auto Test Generator Setup
echo ===============================================
echo    Fixing DA Auto Test Generator Setup
echo ===============================================
echo.

echo Step 1: Backing up current package.json...
if exist package.json (
    copy package.json package-backup.json >nul 2>&1
    echo ✅ Backup created
) else (
    echo ℹ️ No existing package.json found
)

echo.
echo Step 2: Using Electron-specific configuration...
copy electron-package.json package.json >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Electron package.json copied
) else (
    echo ❌ Failed to copy electron package configuration
    pause
    exit /b 1
)

echo.
echo Step 3: Cleaning old installation...
if exist node_modules (
    echo Removing old node_modules...
    rmdir /s /q node_modules >nul 2>&1
    echo ✅ Cleaned old installation
)

echo.
echo Step 4: Installing fresh dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Installation failed!
    echo Try running as Administrator
    pause
    exit /b 1
)

echo.
echo Step 5: Testing setup...
call node check-setup.js

echo.
echo ✅ Setup complete! Try running the app:
echo Double-click start-desktop.bat or run: npx electron .
echo.
pause