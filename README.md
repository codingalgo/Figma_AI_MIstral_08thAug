# Figma Frame Exporter

A minimal application that exports all frames from Figma designs and can execute local .exe files.

## Features

✅ **Figma Frame Export**
- Prefilled API credentials for instant use
- Exports all frames as PNG files (2x resolution)
- Progress tracking and frame status indicators
- Batch processing with rate limiting

✅ **Local Executable Runner** (Desktop version only)
- Select and run any .exe file from your computer
- Secure file picker interface
- Process status tracking

## Quick Start

### Web Version (Figma Export Only)
1. Run `npm run dev` 
2. Open http://localhost:5000
3. Click "Export All Frames" to download all frames from the prefilled Figma file

### Desktop Version (Full Features)
1. **Windows**: Double-click `start-desktop.bat`
2. **Mac/Linux**: Run `./start-desktop.sh` in terminal
3. **Manual**: Run `npx electron electron-main.js`

## Desktop App Features

The desktop version includes all web features plus:

### Executable Runner
- Click "Select .exe File" to browse for any executable
- Click "Run Selected Exe" to launch the selected program
- Status messages show execution results

### Enhanced File Handling
- Native file dialogs for better user experience
- Local file system access for downloads
- Process management for launched executables

## Requirements

- Node.js 18+ 
- npm or yarn
- Internet connection (for Figma API)

## API Configuration

The app comes with prefilled credentials:
- **Figma Token**: `figd_2nGk49M9ujxccf01lNpgv3gGfqKaRQ74Q0jBhzn1`
- **File ID**: `2k2t7ZfG09nLyjM4viAGHP` 

To use with your own Figma files:
1. Edit the `figma-exporter.html` file
2. Replace the token and file ID values
3. Get your Figma token from: Account Settings → Personal Access Tokens

## File Structure

```
├── figma-exporter.html      # Main web interface
├── electron-main.js         # Desktop app main process  
├── electron-preload.js      # Security bridge for desktop features
├── start-desktop.bat        # Windows startup script
├── start-desktop.sh         # Mac/Linux startup script
└── server/                  # Web server files
```

## Troubleshooting

**Desktop app won't start:**
- Ensure Electron is installed: `npm install electron`
- Check file permissions on startup scripts

**Figma export fails:**
- Verify internet connection
- Check if the Figma file is public or token has access
- Rate limits may cause delays with large numbers of frames

**Exe runner not working:**
- This feature only works in the desktop version
- Ensure the selected .exe file exists and is executable
- Some antivirus software may block execution

## Development

To modify the application:
1. Edit `figma-exporter.html` for UI changes
2. Edit `electron-main.js` for desktop functionality
3. Restart the application to see changes

The web version auto-reloads during development with `npm run dev`.