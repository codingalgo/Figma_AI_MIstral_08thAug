@echo off
echo ========================================
echo DA Auto Test Generator - EXE Builder
echo ========================================
echo.
echo Building standalone executable...
echo.

cd /d "%~dp0"

echo Step 1: Installing electron-builder dependencies...
call npm install --prefix . electron-builder@26.0.12

echo.
echo Step 2: Building Windows executable...
call npx --prefix . electron-builder --win

echo.
echo ========================================
echo Build Complete!
echo ========================================
echo.
echo Your executable file is located in:
echo %CD%\dist-exe\
echo.
echo Files created:
echo - DA Auto Test Generator Setup.exe (Installer)
echo - DA Auto Test Generator.exe (Portable version in win-unpacked folder)
echo.
echo You can now distribute the installer or the portable executable!
echo.
pause