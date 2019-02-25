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
let mouseDownX = 0;
let mouseDownY = 0;

window.onload = function () {

    let float = document.querySelector('#float');
    initClickEvent(float);
    initDragEvent(float);

};


/**
 * 
 * 初始化鼠标点击事件
 * 
 * @param {Element} element 
 */
function initClickEvent(element) {

    //禁用默认右键菜单,自定义右键点击事件
    window.oncontextmenu = onRightClickEvent;

    //自定义左键点击事件
    element.addEventListener('click', event => {
        // @ts-ignore
        let mouseButton = event.button;
        if (0 == mouseButton) {
            onLeftClickEvent(element);
        }
    });

}

/**
 * 
 * 鼠标左键点击事件
 * 
 * @param {Element} element 
 */
function onLeftClickEvent(element) {
    console.log(`left click event...`);
}


/**
 * 
 * 鼠标右键点击事件
 * 
 * @param {Event} event 
 * 
 */
function onRightClickEvent(event) {
    event.preventDefault();
    console.log(`right click event...`);
}


/**
 * 初始化鼠标拖拽事件
 * 
 * @param {Element} element 
 */
function initDragEvent(element) {

    console.log(`${element.id} init drag event...`);

    window.addEventListener('mousemove', event => {
        if (dragFlag) {
            //console.log(`mousemove x:${event.screenX},y:${event.screenY}`);
            win.x = event.screenX - 25;
            win.y = event.screenY - 25;
        }
    });

    window.addEventListener('mousedown', event => {
       
        let mouseButton = event.button;
        mouseDownX = event.screenX;
        mouseDownY = event.screenY;
        //console.log(`mousedown...button ${mouseButton}`);
        // @ts-ignore
        element.style.backgroundImage = "url('../assets/float-ondrag.png')";
        if (0 == mouseButton) {
            dragFlag = true;
        }

    });

    window.addEventListener("mouseup", event => {
        //console.log("mouseup...");
        event.preventDefault();
        let mouseButton = event.button;
        dragFlag = false;
        // @ts-ignore
        element.style.backgroundImage = "url('../assets/float-default.png')";
    });
}
