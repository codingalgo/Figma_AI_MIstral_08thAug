const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  selectExeFile: () => ipcRenderer.invoke('select-exe-file'),
  executeExe: (exePath, args) => ipcRenderer.invoke('execute-exe', exePath, args),
  selectDirectory: () => ipcRenderer.invoke('select-directory'),
  saveFile: (filePath, buffer) => ipcRenderer.invoke('save-file', filePath, buffer),
  runExecutable: (executablePath, args) => ipcRenderer.invoke('run-executable', executablePath, args)
});