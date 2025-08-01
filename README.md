# DA Auto Test Generator from Figma

Generate and validate test cases & auto execute on real device.

## 🚀 Quick Setup for Local PC

### Step 1: Install Requirements
1. **Download Node.js**: Go to https://nodejs.org and download the latest LTS version
2. **Install Node.js**: Run the installer and follow the steps
3. **Verify Installation**: Open Command Prompt and type `node --version`

### Step 2: Download Project Files
1. Download all project files to your PC
2. Extract to a folder (e.g., `C:\DA-Auto-Test-Generator`)

### Step 3: Run the Desktop App
**Option A: Simple Start (Recommended)**
1. Double-click `start-desktop.bat`
2. Wait for dependencies to install (first time only)
3. Desktop app will launch automatically

**Option B: Manual Start**
1. Open Command Prompt in project folder
2. Run: `npm install` (first time only)
3. Run: `npx electron .`

## 🎯 Features Available on Local PC

### Desktop App Features (Full Functionality)
- ✅ Export Figma frames to local folders
- ✅ Generate AI test cases with Mistral
- ✅ **Select and run .exe files**
- ✅ Save files anywhere on your PC
- ✅ Native file dialogs
- ✅ No browser limitations

### Web Version (Limited)
- Run `npm run dev` and open http://localhost:5000
- Basic export/generation (no .exe file selection)

## 🔑 Pre-configured Credentials
- **Figma API Token**: Already included
- **Figma File ID**: Pre-filled with test project
- **Mistral AI Key**: Ready for test case generation

## 📋 How to Use

1. **Launch**: Double-click `start-desktop.bat`
2. **Generate Everything**: Click the main green button for full automation
3. **Individual Operations**: Use separate buttons for specific tasks
4. **Run Tests**: Use "Select .exe File" to execute automated tests

## ⚠️ Troubleshooting

### If start-desktop.bat doesn't work:
1. Install Node.js from https://nodejs.org
2. Open Command Prompt as Administrator
3. Navigate to project folder: `cd C:\path\to\project`
4. Run: `npm install`
5. Run: `npx electron .`

### If you get permission errors:
- Run Command Prompt as Administrator
- Make sure antivirus isn't blocking the files

## 🔧 System Requirements

- **OS**: Windows 10/11 (recommended)
- **Node.js**: Version 14 or higher
- **RAM**: 4GB minimum
- **Internet**: Required for Figma API and AI generation