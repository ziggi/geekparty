
var img = new Image();
img.src = "res/panel.png";

img.onerror = function () {
	console.log("Error loading image " + img.src);
}


var level_objs = [
	[200, 564, 0],
	[264, 164, 37]
];

img.onload = function () {

	for (var i = 0; i < level_objs.length; i++) {

		tmp = new fabric.Image(img, {
			left: level_objs[i][0],
			top: level_objs[i][1],
			angle: level_objs[i][2]
		});

		tmp.set({
			hasBorders: false,
			hasControls: false,
			lockMovementX: true,
			lockMovementY: true
		});

		canvas.add(tmp);
	}

}