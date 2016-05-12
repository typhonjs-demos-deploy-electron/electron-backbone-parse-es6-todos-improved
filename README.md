# electron-backbone-parse-es6-todos-improved
Creates a desktop app from [backbone-parse-es6-todos-improved](https://github.com/typhonjs-demos/backbone-parse-es6-todos-improved) using [backbone-parse-es6](https://github.com/typhonjs-backbone-parse/backbone-parse-es6) and [Electron](http://electron.atom.io/).

More documentation and tutorial coming soon. The basic installation steps:

- Install Node (only once as necessary)
- Install Gulp globally "npm install gulp -g" (only once as necessary)
- Install JSPM / SystemJS globally "npm install jspm -g" (only once as necessary)
- Check out the source repo.
- Run "npm install" from the local copy directory. (post install script will run `jspm install` automatically)
- If using WebStorm or an IDE which can import Gulp tasks then import them. 
- Gulp task `electron-start` will launch the Desktop version of `backbone-parse-es6-todos-improved`. 
- Gulp task `electron-package-<platform>-<arch>` will build a standalone version of the app and place it in the `./build` directory. From the command line run `gulp --tasks` to find the specific platform / architecture task for your machine. On my MBP / OSX the task is: `electron-package-darwin-x64`. For more information on all available Gulp tasks supported please see [typhonjs-core-gulptasks](https://www.npmjs.com/package/typhonjs-core-gulptasks)

--------

For now though a brief walkthrough of what is going on follows:

What this demo is doing is using [JSPM](http://jspm.io/) to load `backbone-parse-es6-todos-improved` from Github which is a standalone web app version of the canonical TODOs app using [backbone-parse-es6](https://github.com/typhonjs-backbone-parse/backbone-parse-es6). There is a JSPM [override in package.json](https://github.com/typhonjs-demos/electron-backbone-parse-es6-todos-improved/blob/master/package.json#L20-L32) which only loads the necessary files from `backbone-parse-es6-todos-improved` from the self executing bundled app + assets. The local file [app.js](https://github.com/typhonjs-demos-deploy-electron/electron-backbone-parse-es6-todos-improved/blob/master/app.js) is designated as the [main entry point](https://github.com/typhonjs-demos-deploy-electron/electron-backbone-parse-es6-todos-improved/blob/master/package.json#L42) in `package.json` which controls launching Electron and the bundled `backbone-parse-es6-todos-improved` web app. Please review [.electronrc](https://github.com/typhonjs-demos-deploy-electron/electron-backbone-parse-es6-todos-improved/blob/master/.electronrc). For [typhonjs-core-gulptasks](https://www.npmjs.com/package/typhonjs-core-gulptasks) to import Electron tasks a given repo must have a valid `.electronrc` file in the root path and also have loaded [`electron-packager` and `electron-prebuilt`](https://github.com/typhonjs-demos/electron-backbone-parse-es6-todos-improved/blob/master/package.json#L35-L36). Please review the options available for `electron-packager` which may be used in `.electronrc`: https://www.npmjs.com/package/electron-packager#programmatic-api

While it is certainly possible to enable Electron support directly in any given repo. The reason `electron-backbone-parse-es6-todos-improved` separates itself from the web app version is that `electron-prebuilt` is a large download. This separation also shows the power of JSPM to link a separate repo and provide an alternate deployment mechanism via Electron. 
