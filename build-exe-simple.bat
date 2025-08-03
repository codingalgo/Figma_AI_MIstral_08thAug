@echo off
echo ========================================
echo DA Auto Test Generator - EXE Builder
echo ========================================
echo.
echo Building standalone executable...
echo.

cd /d "%~dp0"

echo Step 1: Creating build directory...
if not exist build-temp mkdir build-temp
cd build-temp

echo.
echo Step 2: Copying necessary files...
copy ..\electron-main.js .
copy ..\electron-preload.js .
copy ..\figma-exporter.html .
copy ..\electron-package.json package.json

echo.
echo Step 3: Installing dependencies...
call npm install

echo.
echo Step 4: Building Windows executable...
call npx electron-builder --win

echo.
echo Step 5: Moving files back to main directory...
cd ..
if exist build-temp\dist move build-temp\dist dist-exe
rmdir /s /q build-temp

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