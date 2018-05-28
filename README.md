# Sunbeam-Weather-App

It is an Angular-Electron App which give you information about Weather Forecast.

## Clone App
<https://github.com/AtulBisht/Sunbeam-Weather-App.git>

## Install dependencies with npm 

``npm install``

## To Run app in ELECTRON

``npm run electron``

## Easily test your app locally while developing

``ng serve``

## electron-packager to package electron app

Link :- 
<https://www.christianengvall.se/electron-packager-tutorial/>

Package your Electron app into OS-specific bundles (.app, .exe, etc.) via JavaScript or the command line.

#### -> If you want to run electron-packager through npm, install the package locally:

``npm install --save-dev electron-packager``

#### -> Edit the scripts section of your package.json:

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

### To create package for Windows
``npm run package-win``

Note: If you are using macOS for creating package for windows install wine

### To create package for MacOS
``npm run package-mac``

### To create package for Linux
``npm run package-linux``

## electron-builder to package and build distributable electron app

Link :-
 <https://www.electron.build/>

A complete solution to package and build a ready for distribution Electron app for macOS, Windows and Linux with “auto update”

#### -> If you want to run electron-builder through npm, install the package locally:

``npm install --save-dev electron-builder``

#### -> Set productName, version, author, copyright, appID, Output folder, Icon in package.json
   {
     
  "name": "sunbeam_weather_app", 

  "description": "Weather app",

  "productName": "Sunbeam-Weather-App",

  "version": "0.0.0",

  "license": "MIT",

  "author": "Atul Bisht <atul.bisht@nerdapplabs.com>",

  "copyright": "© 2018, nerdAppLabs software solution",

  "main": "main.js",

  "build": {

    "appId": "com.atulbisht.sunbeam-weather-app",
    "directories": {
      "output": "app"
    },
    "mac": {
      "category": "public.app-category.weather",
      "target":"pkg",
      "icon": "build/SWA.icns"
    },
    "win": {
      "target":"nsis",
      "icon": "build/SWA.ico"
    },
    "linux":{
      "target":"deb",
      "icon":"build/SWA.png"
    },
  }

}

#### -> Edit the scripts section of your package.json:

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

##### -> To package and build distributable electron app for all platform (macOS, Windows, Linux) 
``npm run build-mwl``

#### -> To package and build distributable electron app for Windows 
``npm run build-win``

Note: If you are using macOS to create distributable file for windows install wine.

#### -> To package and build distributable electron app for MacOS 
``npm run build-mac``

#### -> To package and build distributable electron app for Linux 
``npm run build-linux``