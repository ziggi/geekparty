$(document).ready(function () {
	var interval_1;

	var canvas = new fabric.Canvas('canvas');

	console.log( canvas );
	$('#right').mousedown(function () {
	}).bind('mouseup mouseleave', function () {
		});
	$('#left').mousedown(function () {

	}).bind('mouseup mouseleave', function () {

		});
	$(document).keydown(function (event) {
		if (event.keyCode === 39) {//right

		}
		else if (event.keyCode === 37) {//left

		}
	});
	$(document).keyup(function (event) {

	});


	player = new fabric.Rect(
		{
			left: canvas.getWidth()/2,
			top: canvas.getHeight() - 40 - 10,
			fill: 'green',
			width: 10,
			height: 40
		}
	);
	canvas.add( player );

	interval_1 = setInterval( processTick, 1000 / 60 );

	function gameOver()
	{
		var text = new fabric.Text('Game Over\nGained score: ' + score, { left: canvas.getWidth()/2, top: canvas.getHeight()/2});
		canvas.add(text);
		clearInterval( interval_1 );
	}
	function processTick()
	{
		canvas.renderAll();
	}
});