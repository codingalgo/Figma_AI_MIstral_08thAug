# 🚀 Complete Setup Guide for Local PC

## 📦 What You Need

### 1. Download Node.js (Required)
- Go to **https://nodejs.org**
- Download the **LTS version** (recommended for most users)
- Run the installer and follow all steps
- **Important**: Check "Add to PATH" during installation

### 2. Verify Node.js Installation
1. Press `Windows + R`, type `cmd`, press Enter
2. Type: `node --version` and press Enter
3. You should see something like `v18.17.0` or similar
4. Type: `npm --version` to verify npm is also installed

## 📁 Download Project Files

### Option 1: From Replit (if you have access)
1. Download all files from this Replit project
2. Create a folder on your PC (e.g., `C:\DA-Auto-Test-Generator`)
3. Extract all files to this folder

### Option 2: Essential Files List
Make sure you have these files in your project folder:
```
📁 Your Project Folder/
├── 📄 figma-exporter.html
├── 📄 electron-main.js
├── 📄 electron-preload.js
├── 📄 package.json
├── 📄 start-desktop.bat
├── 📄 README.md
└── 📁 other files...
```

## 🎯 Running the App

### Method 1: Double-Click Start (Easiest)
1. Navigate to your project folder
2. **Double-click `start-desktop.bat`**
3. First time: Wait for installation (may take 2-5 minutes)
4. App will launch automatically

### Method 2: Command Line
1. Open Command Prompt
2. Navigate to project: `cd C:\path\to\your\project`
3. Install dependencies: `npm install` (first time only)
4. Run app: `npx electron .`

## ✅ Testing the App

Once the desktop app opens, you should see:
- **Figma API Token**: Pre-filled (password field)
- **Figma File ID**: Pre-filled
- **Mistral AI Key**: Pre-filled
- **Green Button**: "🚀 Generate Everything"
- **File Selection**: "Select .exe File" button (works only in desktop)

### Test the Features:
1. **Test Generation**: Click "Generate Test Cases Only"
2. **Frame Export**: Click "Export Frames Only" 
3. **Unified**: Click the main green button for everything
4. **File Selection**: Click "Select .exe File" (should open file dialog)

## 🔧 Troubleshooting

### ❌ "Node.js is not installed" Error
- Download Node.js from https://nodejs.org
- Choose LTS version and install completely
- Restart Command Prompt and try again

### ❌ "npm install" Fails
- Right-click Command Prompt → "Run as administrator"
- Make sure you have internet connection
- Try: `npm install --force`

### ❌ Desktop App Won't Start
- Check if antivirus is blocking the app
- Try running `start-desktop.bat` as administrator
- Make sure all project files are in the same folder

### ❌ "Select .exe File" Shows Error
- This is normal in web browser version
- Make sure you're running the desktop app (via `start-desktop.bat`)
- Desktop app shows native Windows file dialogs

## 🎉 Success Indicators

**Desktop App Working Correctly:**
- ✅ Window opens with app interface
- ✅ "Select .exe File" opens Windows file dialog
- ✅ Test generation creates downloadable text files
- ✅ Frame export downloads image files
- ✅ No "desktop app only" error messages

**Ready for Production Use:**
- ✅ Can select and run .exe files
- ✅ Files save to chosen directories
- ✅ All API keys work (Figma + Mistral)
- ✅ Complete automation workflow functions

## 📞 Quick Reference

**Start App**: Double-click `start-desktop.bat`  
**First Time**: Wait for npm install to complete  
**File Selection**: Only works in desktop version  
**Web Version**: `npm run dev` → http://localhost:5000  
**Reinstall**: Delete `node_modules` folder, run `npm install`  