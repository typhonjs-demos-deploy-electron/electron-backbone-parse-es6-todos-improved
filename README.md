# electron-backbone-parse-es6-todos-improved
Creates a desktop app from [backbone-parse-es6-todos-improved](https://github.com/typhonjs-demos/backbone-parse-es6-todos-improved) using [backbone-parse-es6](https://github.com/typhonjs-parse/backbone-parse-es6) and [Electron](http://electron.atom.io/).

*Important Note*: Presently Parse & `backbone-parse-es6` is not aware of the hybrid nature of Electron. Electron provides a dual Node / browser environment and when Parse is imported it sets `Parse.CoreManager.config.IS_NODE` to true and subsequently ParseUser and ParseObject initialize thinking the environment is Node. There is a small fix descibed at the end of the installation instructions below.

More documentation and tutorial coming soon. The basic installation steps:

- Install Node
- Install Gulp globally "npm install gulp -g" (if necessary)
- Install JSPM / SystemJS globally "npm install jspm -g" (if necessary)
- Check out the source repo.
- Run "npm install" from the local copy directory. (post install script will run `jspm install` automatically)
- If using WebStorm or an IDE which can import Gulp tasks then import them. 
- Gulp task `electron-start` will launch the Desktop version of `backbone-parse-es6-todos-improved`. 
- Gulp task `electron-package-<platform>-<arch>` will build a standalone version of the app and place it in the `./build` directory. From the command line run `gulp --tasks` to find the specific platform / architecture task for your machine. On my MBP / OSX the task is: `electron-package-darwin-x64`. For more information on all available Gulp tasks supported please see [typhonjs-core-gulptasks](https://www.npmjs.com/package/typhonjs-core-gulptasks)

*Important Fix*: After installing you must replace one line of code in the `backbone-parse-es6-todos-improved` bundle. This is [line 18587](https://github.com/typhonjs-demos/backbone-parse-es6-todos-improved/blob/master/dist/umd/backbone-parse-es6-todos.js#L18587).  In your local copy you can find this file under this relative path from the project root: `jspm_packages/github/typhonjs-demos/backbone-parse-es6-todos-improved@master/dist/umd/backbone-parse-es6-todos.js`

Before: IS_NODE: typeof process !== 'undefined' && !!process.versions && !!process.versions.node,

After: IS_NODE: typeof process !== 'undefined' && !!process.versions && !process.versions.electron && !!process.versions.node,

This will allow Parse to run in browser mode with Electron and everything works great! More details are available at [Parse Issue #193](https://github.com/ParsePlatform/Parse-SDK-JS/issues/193)

--------

For now though a brief walkthrough of what is going on follows:

What this demo is doing is using [JSPM](http://jspm.io/) to load `backbone-parse-es6-todos-improved` from Github which is a standalone web app version of the canonical TODOs app using [backbone-parse-es6](https://github.com/typhonjs-parse/backbone-parse-es6). There is a JSPM [override in package.json](https://github.com/typhonjs-demos/electron-backbone-parse-es6-todos-improved/blob/master/package.json#L20-L32) which only loads the necessary files from `backbone-parse-es6-todos-improved` from the self executing bundled app + assets. The local file [app.js](https://github.com/typhonjs-demos/electron-backbone-parse-es6-todos-improved/blob/master/app.js) is designated as the [main entry point](https://github.com/typhonjs-demos/electron-backbone-parse-es6-todos-improved/blob/master/package.json#L41) in `package.json` which controls launching Electron and the bundled `backbone-parse-es6-todos-improved` web app. Please review [electron.json](https://github.com/typhonjs-demos/electron-backbone-parse-es6-todos-improved/blob/master/electron.json). For [typhonjs-core-gulptasks](https://www.npmjs.com/package/typhonjs-core-gulptasks) to import Electron tasks a given repo must have a valid `electron.json` file in the root path and also have loaded [`electron-packager` and `electron-prebuilt`](https://github.com/typhonjs-demos/electron-backbone-parse-es6-todos-improved/blob/master/package.json#L35-L36). Please review the options available for `electron-packager` which may be used in `electron.json`: https://www.npmjs.com/package/electron-packager#programmatic-api

While it is certainly possible to enable Electron support directly in any given repo. The reason `electron-backbone-parse-es6-todos-improved` separates itself from the web app version is that `electron-prebuilt` is a large download. This separation also shows the power of JSPM to link a separate repo and provide an alternate deployment mechanism via Electron. 
