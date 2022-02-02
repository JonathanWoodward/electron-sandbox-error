const {
    contextBridge,
    ipcRenderer
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        minimizeWindow: async () => {
            return await ipcRenderer.invoke('window:minimize');
        },
        maximizeWindow: async () => {
            return await ipcRenderer.invoke('window:maximize');
        },
        closeWindow: async () => {
            return await ipcRenderer.invoke('window:close');
        }
    }
);
