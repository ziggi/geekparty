$(document).ready(function () {
	var interval_1;
	var player;
	var startButton;
	var timeoutId;
	var gamestate = 0;
	var keystate = [false, false, false]; // left, right, mouse
	var speed = 3;
	const points_per_frame = 6;
	var score = 0;
	const movements = [103.75, 237.5];
//	var up_or_down = true;
//	const keyLeft = 37;
//	const keyRight = 39;
	canvas = new fabric.Canvas('canvas');

	prepareResourses();

	$('canvas').click( startGame );
	$(document).mousedown(function()
	{
		//startGame();
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

	function startGame()
	{
		if ( !interval_1 && gamestate == 0 )
		{
			//prepareResourses();
			interval_1 = setInterval( processTick, 1000 / 60 );
		}
	}
	function prepareResourses()
	{
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

		rectangle = new fabric.Rect(
			{
				left: canvas.getWidth()/4,
				top: canvas.getHeight() - 40 - 10 - 80,
				fill: 'red',
				width: 140,
				height: 10
			}
		);
		canvas.add( rectangle );

		startButton = new fabric.Text(
			'Press screen to start',
			{
				left: canvas.getWidth()/2,
				top: canvas.getHeight()/2
			});
		canvas.add( startButton );
	}


	function gameOver()
	{
		var text = new fabric.Text('Game Over\nGained score: ' + score, { left: canvas.getWidth()/2, top: canvas.getHeight()/2});
		canvas.add(text);
		clearInterval( interval_1 );
		gamestate = 99;
	}
	function processTick()
	{
		canvas.remove( startButton );
		//console.log( keystate );
		if ( player )
		{
			var x = player.get('left');
			var new_x;
			var y = player.get('top');
			var new_y;

			var old_speed = speed;
//			if ( keystate[2] == true )
			if ( gamestate == 1 ) // fly
			{
				if ( y < 300 )
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
				new_x =  x - points_per_frame/2;
			}
			else if ( keystate[1] == true && keystate[0] == false )
			{
				new_x =  x + points_per_frame/2;
			}
			else
			{
				new_x = x;
			}

			var left_offset = rectangle.get('left');
			var top_offset = rectangle.get('top');
			var rectangle_width = rectangle.get('width');
			var rectangle_height = rectangle.get('height');
			var player_width = player.get('width');
			var player_height = player.get('height');

			if (
					new_x > left_offset - rectangle_width/2 - player_width/2
				&&
					new_x < left_offset + rectangle_width/2 + player_width/2
				&&
					new_y > top_offset - rectangle_height/2  - player_height/2 - old_speed
				&&
					new_y < top_offset + rectangle_height/2  - player_height/2 + old_speed
				&&
					!(
							new_x > left_offset - rectangle_width/2 + rectangle_width/3 + player_width/2
						&&
							new_x < left_offset - rectangle_width/2 + 2*rectangle_width/3 + player_width/2
					)
				)
			{

				gamestate = 2;//stand
				if ( new_y > top_offset - rectangle_height/2  - player_height/2 - old_speed
					&&
					new_y < top_offset + rectangle_height/2  - player_height/2 + old_speed )
				{
					new_y = top_offset - rectangle_height/2  - player_height/2;
				}
			}
			else
			{
				gamestate = 1;//fly
			}


			var width = player.get('width')/2;

			if ( new_x - width < 0 )
			{
				new_x = 0 + width;
			}
			else if ( new_x + width > canvas.getWidth() )
			{
				new_x = canvas.getWidth() - width;
			}

			if ( y - player.get('height')/2 > canvas.getHeight() )
			{
				gameOver();
			}

			player.set({left: new_x, top: new_y}).setCoords();
		}
		canvas.renderAll();
	}
});