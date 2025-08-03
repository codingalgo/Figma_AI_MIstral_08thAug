const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'electron-preload.js')
    },
    icon: path.join(__dirname, 'assets/icon.png'), // Optional icon
    title: 'DA Auto Test Generator from Figma'
  });

  // Load the HTML file
  mainWindow.loadFile('figma-exporter.html');

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle exe file selection
ipcMain.handle('select-exe-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Executable Files', extensions: ['exe'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });

  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});

// Handle exe execution
ipcMain.handle('execute-exe', async (event, exePath, args = []) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(exePath)) {
      reject(new Error('Executable file not found'));
      return;
    }

    try {
      const child = spawn(exePath, args, {
        detached: true,
        stdio: 'ignore'
      });

      child.unref(); // Allow the parent to exit independently

      child.on('error', (error) => {
        reject(error);
      });

      // Give it a moment to start, then resolve
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Executable started successfully',
          pid: child.pid
        });
      }, 1000);

    } catch (error) {
      reject(error);
    }
  });
});

// Handle directory selection for saving files
ipcMain.handle('select-directory', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });

  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});

// Handle file saving
ipcMain.handle('save-file', async (event, filePath, buffer) => {
  try {
    fs.writeFileSync(filePath, Buffer.from(buffer));
    return { success: true, message: 'File saved successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

// Handle running executable with console output capture
ipcMain.handle('run-executable', async (event, executablePath, args = []) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(executablePath)) {
      reject(new Error(`Executable not found: ${executablePath}`));
      return;
    }

    try {
      const child = spawn(executablePath, args, {
        stdio: ['pipe', 'pipe', 'pipe'],
        shell: true
      });

      let output = '';
      let errorOutput = '';

      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      child.on('close', (code) => {
        resolve({
          success: code === 0,
          code: code,
          output: output,
          error: errorOutput,
          message: code === 0 ? 'Executable completed successfully' : `Executable exited with code ${code}`
        });
      });

      child.on('error', (error) => {
        reject(new Error(`Failed to start executable: ${error.message}`));
      });

      // For batch files that might run indefinitely, resolve after starting
      setTimeout(() => {
        if (!child.killed) {
          resolve({
            success: true,
            code: null,
            output: output,
            error: errorOutput,
            message: 'Executable started successfully (running in background)',
            pid: child.pid
          });
        }
      }, 3000);

    } catch (error) {
      reject(new Error(`Error running executable: ${error.message}`));
    }
  });
});