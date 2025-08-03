@echo off
echo ========================================
echo DA Auto Test Generator - Portable EXE Builder
echo ========================================
echo.
echo Building portable executable (no installer needed)...
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
call npm install --no-optional

echo.
echo Step 4: Building portable Windows executable (no code signing)...
set ELECTRON_BUILDER_CACHE=%TEMP%\electron-builder-cache
call npx electron-builder --win --config.forceCodeSigning=false --config.buildDependenciesFromSource=false

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

if exist "dist-exe\" (
    echo ✅ SUCCESS: Portable executable created!
    echo.
    echo Your portable executable is located in:
    echo %CD%\dist-exe\
    echo.
    
    for %%f in (dist-exe\*.exe) do (
        echo ✅ Found: %%~nxf (Portable executable - no installation needed)
    )
    
    echo.
    echo 🎉 You can now copy this .exe file to any Windows PC and run it directly!
    echo No installation required - just double-click to run!
) else (
    echo ❌ ERROR: Build failed - dist-exe folder not created
    echo.
    echo This might be due to:
    echo 1. Antivirus blocking the build process
    echo 2. Insufficient disk space
    echo 3. Network connection issues during dependency download
)

echo.
pause