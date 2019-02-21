console.log("into init...");

const gui = require("nw.gui");

const win = gui.Window.get();
win.showDevTools();
win.setAlwaysOnTop(true);
win.setShowInTaskbar(true);
win.show();

console.log(`win width: ${win.width}, win height: ${win.height}`);

// @ts-ignore
const screen = gui.Screen.Init().screens[0];
const screenWidth = screen.bounds.width;
const screenHeight = screen.bounds.height;
console.log(`screen width is: ${screenWidth}, height is: ${screenHeight}`);

let dragFlag = false;

window.onload = function() {
  initMouseEvent();
};

function initMouseEvent() {
  let float = document.querySelector("#float");
  window.addEventListener("mousemove", event => {
    
    if (dragFlag) {
      console.log(`mousemove x:${event.screenX},y:${event.screenY}`);
      win.x = event.screenX - 25;
      win.y = event.screenY - 25;
      // @ts-ignore
      float.style.backgroundImage = "url(../asserts/float-ondrag.png)";
    }
  });

  
  float.addEventListener("dblclick", event => {
    console.log("dblclick ...");
    alert("dbclick!");
  });

  
  float.addEventListener("mousedown", event => {
    console.log("mousedown...");
    dragFlag = true;
  });

  
  window.addEventListener("mouseup", event => {
    console.log("mouseup...");
    dragFlag = false;
    // @ts-ignore
    float.style.backgroundImage = "url(../asserts/float-default.png)";
  });
}
