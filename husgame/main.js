var body = document.querySelector("body");
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
body.onkeydown = rawkeyDown;
body.onkeyup = rawkeyUp;

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

var images = {'hus':createImage("img/hussik.png")};
var keys = [];

function rawkeyDown (e) {
    if (!keys[e.keyCode])
        keyDown(e.keyCode)
        keys[e.keyCode] = true;
}
function rawkeyUp (e) {
    keyUp(e.keyCode)
    keys[e.keyCode] = false;
}

function handleInput() {
    for (keyCode in keyboard){
        if (keyboard[keyCode] == keyboard.TAB || keyCode == keyboard.ALT) continue;
        if (keys[keyboard[keyCode]]) {
            switch (keyboard[keyCode]) {
                case keyboard.KEY_D:
                    player.pos.x+=15;
                    break;
                case keyboard.KEY_A:
                    player.pos.x-=15;
                    break;
            }
        }
    }
}

function keyDown (keyCode) {

} 

function keyUp (keyCode) {
    
}

function createImage(file) {
    var image = new Image();
    image.src = file;
    return image;
}

canvas.onclick = function(evt) {
	var mousePos = getMousePos(canvas, evt);
};

var player = new Player(new Vector(canvas.width/2,canvas.height*0.8));
draw();
function draw() {
    canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(images.hus,100,100,200,200);
        player.draw();
        handleInput();
    setTimeout(function() {
        requestAnimationFrame(draw);
    }, 1000.0 / 60);
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return new Vector((evt.clientX - rect.left),(evt.clientY - rect.top));
}