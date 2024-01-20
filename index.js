const { app, BrowserWindow, screen } = require("electron");
const path = require("path");

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const mainWindow = new BrowserWindow({
    width: 350,
    height: 700,
    x: width - 350, // Posiciona la ventana en el lado derecho
    y: 0, // Posiciona la ventana en la parte superior
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "www/index.html"));
}

app.whenReady().then(createWindow);
