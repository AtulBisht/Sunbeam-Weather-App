# Sunbeam-Weather-App

It is an Angular-Electron App which give you information about Weather Forecast.

## Clone App
``https://github.com/AtulBisht/Sunbeam-Weather-App.git``

## Install dependencies with npm 

``npm install``

## To Run app in ELECTRON

``npm run electron``

## Easily test your app locally while developing

``ng serve``

## electron-packager to package electron app

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

    "electron": "*",
    "electron-packager": "*",
    
  } 

### For Windows
``npm run package-win``

Note: If you are using macOS for creating package install wine

### For MacOS
``npm run package-mac``

### For Linux
``npm run package-linux``

## electron-builder to package and build distributable electron app

A complete solution to package and build a ready for distribution Electron app for macOS, Windows and Linux with “auto update”

If you want to run electron-builder through npm, install the package locally:

``npm install --save-dev electron-builder``

Edit the scripts section of your package.json:

"scripts": {
  
    "build-mac": "electron-builder  --mac --x64",

    "build-linux": "electron-builder  --linux --x64",

    "build-win": "electron-builder  --win --ia32",
   
  },
  "devDependencies": {
   
    "electron": "*",

    "electron-builder": "*",

    "electron-packager": "*",
  }

### For all platform (macOS, Windows, Linux) 
``npm run build-mwl``

### For Windows 
``npm run build-win``

Note: If you are using macOS to create distributable file install wine.

### For MacOS 
``npm run build-mac``

### For Linux 
``npm run build-linux``