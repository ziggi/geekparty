
var img = new Image();
img.src = "res/panel.png";

img.onerror = function () {
	console.log("Error loading image " + img.src);
}

var panel = [153, 53];
var charParam = [10, 40];
var platformWidth = 47;
var levelMoving = 0;
var maxY_ID = 0;
var interval_level;

var level_objs = [
	[200, 564, 0],
	[264, 164, 0],
	[200, 464, 0],
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

changingLevel = function () {
	if (levelMoving != 1) {
		clearInterval(interval_level);

		canvas.remove(level_objs[maxY_ID][3]);
		delete(level_objs[maxY_ID][3]);
		level_objs.splice(maxY_ID, 1);
		
		return;
	}
	for (var i = 0; i < level_objs.length; i++) {

		level_objs[i][4] -= 2;

		if (level_objs[i][4] <= 0 && i != maxY_ID) {
			clearInterval(interval_level);

			canvas.remove(level_objs[maxY_ID][3]);
			delete(level_objs[maxY_ID][3]);
			level_objs.splice(maxY_ID, 1);

			continue;
		}

		level_objs[i][1] += 2;

		level_objs[i][3].set({
			top: level_objs[i][1]
		});
		console.log(maxY_ID + ' ' + level_objs[i][1]);

	}

}

changeLevel = function () {
	if (levelMoving != 1) {

		levelMoving = 1;

		for (var i = 0; i < level_objs.length - 1; i++) {
			if (level_objs[i][1] > level_objs[maxY_ID][1]) {
				maxY_ID = i;
			}
		}


		for (var i = 0; i < level_objs.length; i++) {

			level_objs[i][4] = level_objs[maxY_ID][1] - level_objs[i][1];

		}
		level_objs[maxY_ID][4] = panel[1] + level_objs[maxY_ID][2] / 2;

		//console.log(maxY_ID + ' ' + level_objs.length);

		interval_level = setInterval( changingLevel, 1000 / 60 );
	}

}