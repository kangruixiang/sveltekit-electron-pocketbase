import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { spawn } from 'child_process'
import { resourcesPath } from 'process'

let pocketBaseProcess

const pocketbaseDevPath = join(__dirname, '..', '..', 'db', 'pocketbase')
const pocketbaseProdPath = join(resourcesPath, 'db', 'pocketbase')


function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  mainWindow.on('close', () => {
    if (pocketBaseProcess) {
      console.log('Stopping PocketBase...')
      pocketBaseProcess.kill('SIGINT')

      pocketBaseProcess.on('close', () => {
        app.quit()
      })
    }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev) {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    mainWindow.webContents.openDevTools()
  }
}



// function createAdminAccount() {
//   return new Promise((resolve, reject) => {
//     let createAdmin
//     if (is.dev) {
//       createAdmin = spawn(pocketbaseDevPath, ['superuser', 'upsert', adminEmail, adminPass])
//     } else {
//       createAdmin = spawn(pocketbaseProdPath, ['superuser', 'upsert', adminEmail, adminPass])
//     }

//     createAdmin.stdout.on('data', () => {
//       console.log('Create admin PocketBase account if not already exist.')
//     })

//     createAdmin.on('close', (code) => {
//       if (code === 0) {
//         console.log('Admin account either exists or created successfully.')
//         resolve(undefined)
//       } else {
//         reject(new Error('Failed to create admin account'))
//       }
//     })

//     createAdmin.on('error', (err) => {
//       reject(err)
//     })
//   })
// }

function runPocketbase() {

  let pocketBaseProcess
  if (is.dev) {
    pocketBaseProcess = spawn(pocketbaseDevPath, ['serve'])
  } else {
    pocketBaseProcess = spawn(pocketbaseProdPath, ['serve'])
  }

  console.log('starting Pocketbase...')

  pocketBaseProcess.stdout.on('data', (data) => {
    console.log(`Pocketbase: ${data.toString()}`)
  })

  pocketBaseProcess.on('close', (code) => {
    console.log(`Pocketbase exited with code ${code}`)
  })

  pocketBaseProcess.on('error', (err) => {
    console.log('Failed to start Pocketbase: ', err)
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {


  // try {
  //   await createAdminAccount()
  // } catch (err) {
  //   console.log('Error creating admin account: ', err)
  // }

  // run pocketbase
  runPocketbase()

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
