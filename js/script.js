$(document).ready(function () {
	var interval_1;
	var player;
	var timeoutId;
	var keystate = [false, false, false]; // left, right, mouse
	var speed = 3;
	const points_per_frame = 6;
	var score = 0;
	const movements = [103.75, 237.5];
	var up_or_down = true;
	const keyLeft = 37;
	const keyRight = 39;
	canvas = new fabric.Canvas('canvas');

	$(document).mousedown(function()
	{
		keystate[2] = true;
	});
	$(document).mouseup( function()
	{
		keystate[2] = false;
	});

	$(document).keydown(function (event) {
		if (event.keyCode === 39) {//right
			keystate[1] = true;
		}
		else if (event.keyCode === 37) {//left
			keystate[0] = true;
		}
	});
	$(document).keyup(function (event) {
		if (event.keyCode === 39) { // right
			keystate[1] = false;
		}
		else if (event.keyCode === 37) {//left
			keystate[0] = false;
		}
		if (timeoutId > 0) {
			clearInterval(timeoutId);
		}
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
		//console.log( keystate );
		if ( player )
		{
			var x = player.get('left');
			var new_x;
			var y = player.get('top');
			var new_y;

			if ( keystate[2] == true )
			{
				if ( y < 200 )
				{
					speed +=  ( points_per_frame / movements[0] );
				}
				else
				{
					speed -= ( points_per_frame / movements[1] );
				}
				new_y = y - speed;
			}
			else
			{
				new_y = y;
			}

			if ( keystate[0] == true && keystate[1] == false )
			{
				new_x =  x - 2;
			}
			else if ( keystate[1] == true && keystate[0] == false )
			{
				new_x =  x + 2;
			}
			else
			{
				new_x = x;
			}

			if ( y > canvas.getHeight() )
			{
				gameOver();
			}


			player.set({left: new_x, top: new_y}).setCoords();
		}
		canvas.renderAll();
	}
});