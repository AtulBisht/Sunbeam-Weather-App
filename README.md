# Sunbeam-Weather-App

It is an Angular-Electron App which give you information about Weather Forecast.

## Install Angular Cli

``npm install -g @angular/cli``

## Clone App
``https://github.com/AtulBisht/Sunbeam-Weather-App.git``

## Install dependencies with npm 

``npm install``

## Run app in ELECTRON

``npm run electron``

## Easily test your app locally while developing

``ng serve``

## electron-packager

Package your Electron app into OS-specific bundles (.app, .exe, etc.) via JavaScript or the command line.

If you want to run electron-packager through npm, install the package locally:

``npm install --save-dev electron-packager``

Edit the scripts section of your package.json:

 "scripts": {

    "electron": "ng build --dev && electron ./dist/index.html",

    "package-mac": "electron-packager . sunbeam-weather-app --platform=darwin --asar=true --arch=x64 --icon=src/assets/img/icons/SWA.icns --prune=true --out=release-builds --overwrite --ignore=node_modules/electron-*",

    "package-linux": "electron-packager . sunbeam-weather-app --overwrite --asar=true --platform=linux --arch=x64 --icon=src/assets/img/icons/SWA.png --prune=true --out=release-builds",

    "package-win": "electron-packager . sunbeam-weather-app --overwrite --asar=true --platform=win32 --arch=ia32 --icon=src/assets/img/icons/SwA.ico --ignore=node_modules/electron-* --prune=true --out=release-builds",

  },
  "devDependencies": {

    "electron": "^1.8.6",
    "electron-packager": "^12.0.2",
    
  } 

### For Windows
``npm run package-win``

Note: If you are using macOS for create package install wine

### For MacOS
``npm run package-mac``

### For Linux
``npm run package-linux``

## electron-builder

A complete solution to package and build a ready for distribution Electron app for macOS, Windows and Linux with “auto update”

If you want to run electron-builder through npm, install the package locally:

``npm install --save-dev electron-builder``

Edit the scripts section of your package.json:

"scripts": {
  
    "build-mac": "electron-builder . --mac --x64",

    "build-linux": "electron-builder . --linux --x64",

    "build-win": "electron-builder . --win --ia32",
   
  },
  "devDependencies": {
   
    "electron": "^1.8.6",

    "electron-builder": "^20.13.3",

    "electron-packager": "^12.0.2",
  }

### For mac,windows, linux
``npm run build-mwl``

### For Windows 
``npm run build-win``

Note: If you use macOS to create distributable file install wine.

### For MacOS 
``npm run build-mac``

### For Linux 
``npm run build-linux``







