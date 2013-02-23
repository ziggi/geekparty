var canvas = new fabric.Canvas('canvas');


var img = new Image();
img.src = "res/plat.png";
img.onerror = function () {
	console.log("Error loading image " + img.src);
}
img.onload = function () {
	//canvas.image(this,64,64).id('robot');
	robot = new fabric.Image(img, {
		left:64,
		top:64,
		angle:90
	});
	//console.log(robot);
	canvas.add(robot);
	//animateRobot();
}

