#!/bin/bash

echo "========================================"
echo "DA Auto Test Generator - EXE Builder"
echo "========================================"
echo

echo "Building standalone executable..."
echo

cd "$(dirname "$0")"

echo "Step 1: Installing electron-builder dependencies..."
npm install electron-builder@26.0.12

echo
echo "Step 2: Building executable for current platform..."

# Detect platform and build accordingly
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    echo "Building for Windows..."
    npx electron-builder --win
elif [[ "$OSTYPE" == "darwin"* ]]; then
    echo "Building for macOS..."
    npx electron-builder --mac
else
    echo "Building for Linux..."
    npx electron-builder --linux
fi

echo
echo "========================================"
echo "Build Complete!"
echo "========================================"
echo
echo "Your executable file is located in:"
echo "$(pwd)/dist-exe/"
echo
echo "You can now distribute the generated files!"
echo