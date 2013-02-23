$(document).ready(function () {
	var interval_1;
	var player;
	var timeoutId;
	var keystate = [false, false, false]; // left, right, mouse
	const keyLeft = 37;
	const keyRight = 39;
	var jCanvas = $('canvas');
	canvas = new fabric.Canvas('canvas');

	console.log(jCanvas);
	jCanvas.mousedown(function()
	{
		keystate[2] = true;
//		if ( player )
//		{
//			var x = player.get('left');
//			var y = player.get('top');
//
//			player.animate({left:x, top: y - 240 });
//		}
	});
	jCanvas.mouseup( function()
	{
		keystate[2] = false;
	});
	//console.log( canvas );

	function move( direction, first )
	{
		var x = player.get('left');
		if (direction == undefined || direction == 'right') {
			direction = x + 20;
		}
		else {
			direction =  x - 20;
		}
		console.log( direction );
		player.set(
			'left',
			x).setCoords();

		player.animate(
			'left',
			direction,
			{
				duration: 1000/60
			}).setCoords();
	}

	$('#right').mousedown(function ()
	{
		move('right');
		timeoutId = setInterval( function () {
			move('right')
		}, 100);
	}).bind('mouseup mouseleave', function () {
			clearInterval( timeoutId );
		});
	$('#left').mousedown(function ()
	{
		move('left');
		timeoutId = setInterval( function () {
			move('left')
		}, 100);
	}).bind('mouseup mouseleave', function () {
			clearInterval( timeoutId );
		});

	$(document).keydown(function (event) {
		if (event.keyCode === 39) {//right
			//$('#right').trigger( 'click' );
//			move('right');
//			timeoutId = setInterval( function () {
//				move('right')
//			}, 1000/60);
			keystate[1] = true;
		}
		else if (event.keyCode === 37) {//left
			//$('#left').trigger( 'click' );
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
				new_y = y - 1;
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


			player.set({left: new_x, top: new_y}).setCoords();
		}
		canvas.renderAll();
	}
});