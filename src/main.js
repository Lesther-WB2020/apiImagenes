const{app, BrowserWindow} = require('electron')
const {ipcMain} = require('electron') 
const path = require('path')

let ventana;
function createWindow(){
    ventana = new BrowserWindow({
        width: 950,
        height: 1000,
        title: 'BUSCADOR DE IMÁGENES',
        webPreferences:{
            preload: path.join(app.getAppPath(),'preload.js')
        }
    })
    ventana.loadFile('./render/index.html')
}
app.whenReady().then(createWindow)


