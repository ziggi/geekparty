
var img = new Image();
img.src = "res/plat.png";

img.onerror = function () {
	console.log("Error loading image " + img.src);
}

img.onload = function () {

	robot = new fabric.Image(img, {
		left: 64,
		top: 64,
		angle: 90
	});
	console.log(robot);
	robot.set({
		hasBorders: false,
		hasControls: false,
		lockMovementX: true,
		lockMovementY: true
	});

	canvas.add(robot);

}