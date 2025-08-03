@echo off
echo ========================================
echo DA Auto Test Generator - EXE Builder
echo ========================================
echo.
echo Building standalone executable...
echo.

cd /d "%~dp0"

echo Step 1: Installing electron-builder dependencies...
call npm install --prefix . electron@37.2.4 electron-builder@26.0.12

echo.
echo Step 2: Building Windows executable...
call npx --prefix . electron-builder --win --config electron-package.json

echo.
echo ========================================
echo Checking Build Results...
echo ========================================
echo.

if exist "%CD%\dist-exe\" (
    echo ✅ SUCCESS: Executable files created!
    echo.
    echo Your executable files are located in:
    echo %CD%\dist-exe\
    echo.
    
    if exist "%CD%\dist-exe\DA Auto Test Generator Setup.exe" (
        echo ✅ Found: DA Auto Test Generator Setup.exe (Installer)
    ) else (
        echo ❌ Missing: DA Auto Test Generator Setup.exe
    )
    
    if exist "%CD%\dist-exe\win-unpacked\DA Auto Test Generator.exe" (
        echo ✅ Found: DA Auto Test Generator.exe (Portable version)
    ) else (
        echo ❌ Missing: Portable version in win-unpacked folder
    )
    
    echo.
    echo 🎉 You can now distribute these files to any Windows PC!
) else (
    echo ❌ ERROR: Build failed - dist-exe folder not created
    echo.
    echo Possible solutions:
    echo 1. Run as Administrator
    echo 2. Check if antivirus is blocking the build
    echo 3. Ensure you have write permissions in this folder
)

echo.
pause