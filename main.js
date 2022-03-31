const path = require("path");
const url = require("url");
const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const fs = require("fs");
const { NavItem } = require("react-bootstrap");

let mainWindow;

let isDev = false;

if (
  process.env.NODE_ENV !== undefined &&
  process.env.NODE_ENV === "development"
) {
  isDev = true;
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 1200,
    show: false,
    backgroundColor: "white",
    icon: `${__dirname}/assets/icon.png`,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  let indexPath;

  if (isDev && process.argv.indexOf("--noDevServer") === -1) {
    indexPath = url.format({
      protocol: "http:",
      host: "localhost:8080",
      pathname: "index.html",
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: "file:",
      pathname: path.join(__dirname, "dist", "index.html"),
      slashes: true,
    });
  }

  mainWindow.loadURL(indexPath);

  // Don't show until we are ready and loaded
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();

    // Open devtools if dev
    if (isDev) {
      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
      } = require("electron-devtools-installer");

      installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
        console.log("Error loading React DevTools: ", err)
      );
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createMainWindow);

// Load logs
ipcMain.on("logs:load", sendLogs);

// Create log
ipcMain.on("logs:add", async (e, item) => {
  try {
    if (fs.existsSync("./billing.json")) {
      const logs = fs.readFileSync("./billing.json", "utf8");
      console.log("parsed logs", JSON.parse(logs));

      let data = [].concat(JSON.parse(logs));

      // console.log("data 1", data)
      // console.log("item 1", item)

      data.unshift((item));


      fs.writeFileSync("./billing.json", JSON.stringify(data));
    } else {

      console.log(JSON.stringify(item));
      fs.writeFileSync("./billing.json", JSON.stringify(item));
    }
  } catch (err) {
    console.error(err);
  }
});

// Delete log
// ipcMain.on("logs:delete", async (e, id) => {
//   try {
//     await Log.findOneAndDelete({ _id: id });
//     sendLogs();
//   } catch (err) {
//     console.log(err);
//   }
// });

async function sendLogs() {
  try {
    // const logs = await Log.find().sort({ created: 1 });

    if (fs.existsSync("./billing.json")) {
      //file exists
      const logs = fs.readFileSync("./billing.json", "utf8");
      mainWindow.webContents.send("logs:get", JSON.parse(logs));
    } else {
      console.log("no data");
    }
  } catch (err) {
    console.log(err);
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

// Stop error
app.allowRendererProcessReuse = true;
