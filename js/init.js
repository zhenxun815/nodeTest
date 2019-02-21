console.log('into init...');

const gui = require('nw.gui');

var win = gui.Window.get();
// @ts-ignore
var screen = gui.Screen.Init().screens[0];
var screenWidth = screen.bounds.width;
var screenHeight = screen.bounds.height;
console.log(`screen width is: ${screenWidth}, height is: ${screenHeight}`);

win.showDevTools();
win.setAlwaysOnTop(true);
win.setShowInTaskbar(true);

win.on('move', onMoving);
console.log(`win width: ${win.width}, win height: ${win.height}`);
win.resizeBy(60, 0);
win.show();
console.log(`win width: ${win.width}, win height: ${win.height}`);
let currentX = 0;
let currentY = 0;
function onMoving(movingX, movingY) {
    console.log(`onMoving x: ${movingX}, y: ${movingY}`);
    if (screenWidth - movingX <= 50) {
        win.x = screenWidth - 50;
    }

    if (movingX <= 0) {
        win.x = 0;
    }

    if (screenHeight - movingY <= 50) {
        win.y = screenHeight - 50;
    }

    if (movingY <= 0) {
        win.y = 0;
    }
    document.getElementById('float').style.backgroundImage = 'url(../asserts/float-ondrag.png)'
}