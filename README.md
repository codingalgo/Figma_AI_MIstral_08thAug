# DA Auto Test Generator from Figma

This application automatically exports Figma frames and generates AI-powered test cases with dynamic credential management and visual step tracking.

## 🚀 Three Ways to Run

### Method 1: Web Browser Mode
```bash
npm run dev
```
- Open browser to provided URL
- Full web-based functionality
- Requires internet connection

### Method 2: Desktop Application Mode
```bash
# Windows
start-desktop.bat

# Mac/Linux  
./start-desktop.sh
```
- Native desktop app with enhanced file system access
- Better performance and offline capabilities
- Direct file operations

### Method 3: Standalone Executable Mode
```bash
# Windows
./build-exe.bat

# Mac/Linux
./build-exe.sh
```
**Creates a portable .exe file that includes:**
- ✅ All dependencies bundled
- ✅ No installation required 
- ✅ Works on any Windows PC
- ✅ Single file distribution
- ✅ Desktop shortcuts and Start Menu entries

**Generated Files:**
- `dist-exe/DA Auto Test Generator Setup.exe` - Full installer
- `dist-exe/win-unpacked/DA Auto Test Generator.exe` - Portable version

## Features

- **Figma Frame Export**: Automatically download frame images from Figma prototypes
- **AI Test Case Generation**: Generate automated test cases using configurable AI providers
- **Visual Progress Tracking**: Step-by-step UI with animated progress indicators
- **Flexible AI Configuration**: Support for Mistral, OpenAI, Ollama, and local AI deployments

## AI Configuration

The application supports multiple AI providers through the expandable "🤖 AI Configuration" section:

| Provider | API Base URL | Model Examples |
|----------|-------------|----------------|
| **Mistral AI** | `https://api.mistral.ai` | `mistral-large-latest` |
| **OpenAI** | `https://api.openai.com` | `gpt-4`, `gpt-3.5-turbo` |
| **Ollama** | `http://localhost:11434` | `llama3-8b`, `codellama` |
| **LM Studio** | `http://localhost:1234` | `local-model` |
| **Groq** | `https://api.groq.com` | `llama3-8b-8192` |
| **Custom** | Your endpoint | Any model name |

## 📦 Distribution Options

1. **Development**: `npm run dev` - For coding and testing
2. **Desktop App**: `start-desktop.bat` - For daily usage  
3. **Portable EXE**: `build-exe.bat` - For sharing with others

The executable version is perfect for:
- Sharing with team members who don't have Node.js
- Running on restricted corporate machines
- Quick deployment without setup
- Offline usage scenarios

## System Requirements

- **Web/Desktop**: Node.js 18+, modern browser
- **Executable**: Windows 10+ (standalone, no dependencies)
- Internet connection for AI API calls
- Figma access token for frame exports

## Quick Commands

| Action | Command |
|--------|---------|
| Web Mode | `npm run dev` |
| Desktop Mode | `start-desktop.bat` |
| Build EXE | `build-exe.bat` |
| Install Dependencies | `npm install` |

## Development

Built with:
- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Express.js + Node.js
- **Desktop**: Electron + electron-builder
- **AI Integration**: Configurable providers with OpenAI-compatible APIs

## File Structure

```
├── client/              # React frontend
├── server/              # Express backend  
├── figma-exporter.html  # Main application interface
├── electron-main.js     # Electron main process
├── electron-package.json # Electron build config
├── build-exe.bat        # Windows executable builder
├── build-exe.sh         # Mac/Linux executable builder
├── start-desktop.*      # Desktop launch scripts
├── dist-exe/            # Generated executable files
└── package.json         # Dependencies and scripts
```