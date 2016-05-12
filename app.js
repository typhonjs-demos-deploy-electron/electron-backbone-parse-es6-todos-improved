/**
 * app.js -- Provides a minimal Electron app launching the bundled version of `backbone-parse-es6-todos-improved`.
 *
 * Please see the JSPM override for `backbone-parse-es6-todos-improved` defined in `package.json` that limits files
 * installed by JSPM to the minimum necessary to launch the bundled app.
 */

var app =            require('electron').app;
var BrowserWindow =  require('electron').BrowserWindow;

app.on('ready', function()
{
   var mainWindow = new BrowserWindow({ width: 800, height: 800 });

   mainWindow.loadURL('file://' + __dirname
    + '/jspm_packages/github/typhonjs-demos/backbone-parse-es6-todos-improved@master/index.html');
});