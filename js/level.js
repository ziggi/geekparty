
var img = new Image();
img.src = "res/panel.png";

img.onerror = function () {
	console.log("Error loading image " + img.src);
}

var panel = [153, 53];
var charParam = [10, 40];
var platformWidth = 47;
var valueChanging = 0;

var level_objs = [
	[200, 564, 0],
	[200, 464, 0],
	[264, 164, 0],
	[564, 264, 0]
];

img.onload = function () {

	for (var i = 0; i < level_objs.length; i++) {

		level_objs[i][3] = new fabric.Image(img, {
			left: level_objs[i][0],
			top: level_objs[i][1],
			angle: level_objs[i][2]
		});

		level_objs[i][3].set({
			hasBorders: false,
			hasControls: false,
			lockMovementX: true,
			lockMovementY: true
		});

		canvas.add(level_objs[i][3]);
	}

}

changeLevel = function () {

	for (var i = 0; i < level_objs.length; i++) {

		var value = level_objs[0][1] - level_objs[i][1] + panel[1];

		if (level_objs[i][1] < value) {
			
		}
		level_objs[i][1] += 2;

		level_objs[i][3].set({
			top: level_objs[i][1]
		});

	}

}