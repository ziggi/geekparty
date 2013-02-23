$(document).ready(function () {
	var interval_1;
	var startButton;
	var lockplayer;
	var bear;
	var bearInterval;
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
	$(document).click( function(){ gamestate = 1; lockplayer = false;});
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
			gamestate = 2;
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

		bear = new fabric.Rect(
			{
				left: 47,
				top: -100,
				fill: 'orange',
				width: 153,
				height: 53
			}
		);
		canvas.add( bear );

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
		var text = new fabric.Text('Game Over\nGained score: ' + currentPlayerDock, { left: canvas.getWidth()/2, top: canvas.getHeight()/2});
		canvas.add(text);
		clearInterval( interval_1 );
		gamestate = 99;
	}
	function processTick()
	{
		if ( startButton )
		{
			canvas.remove( startButton );
			delete ( startButton );
		}
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
				//console.log( speed );
				if ( currentPlayerDock == 0 && y > 400  )
				{
					speed -= ( points_per_frame / movements[1] );
				}
				else if ( currentPlayerDock > 0 && y > level_objs[currentPlayerDock][3].get('top') - 400 )
				{
					speed -=  ( points_per_frame / movements[1] );
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
			if ( gamestate == 1 )
			{
				for( var i = 0; i < level_objs.length; i++ )
				{
					if ( i  == currentPlayerDock ) continue;
					//console.log( level_objs[i] );
					left_offset = level_objs[i][3].get('left');
					top_offset = level_objs[i][3].get('top');
					rectangle_width = level_objs[i][3].get('width');
					rectangle_height = level_objs[i][3].get('height');
					player_width = player.get('width');
					player_height = player.get('height');

					if (	gamestate == 1 &&
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
						currentPlayerDock = i;
						//console.log( i );


						if (
								new_y > top_offset - rectangle_height/2  - player_height/2 - old_speed
							&&
								new_y < top_offset + rectangle_height/2  - player_height/2 + old_speed
						)
						{
							new_y = top_offset - rectangle_height/2  - player_height/2;
							speed = old_speed;
							lockplayer = true;
						}

						if (
								x > left_offset - rectangle_width/2 + 2 * rectangle_width/3 - player_width/2
							&&
								x < left_offset + rectangle_width/2 - player_width/2
						)
						{
							prepareBear( left_offset - rectangle_width/2 + rectangle_width/6, top_offset - rectangle_height/2 );

						}
						else if (
								x > left_offset - rectangle_width/2 + player_width/2
							&&
								x < left_offset - rectangle_width/2 + rectangle_width/3 + player_width/2
						)
						{
							prepareBear( left_offset - rectangle_width/2 +  5 * rectangle_width/6, top_offset - rectangle_height/2 );

						}

						break;
					}
					else
					{
						new_y = y - speed;
						//gamestate = 1;//fly

					}
				}
				if ( new_y < canvas.getHeight()/2 )
				{
					changeLevel();
				}
				if ( new_y > canvas.getHeight() - 200 )
				{
					levelMoving = 0;
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
			}


			if ( !lockplayer )
			{
				player.set({left: new_x, top: new_y}).setCoords();
			}
		}
		canvas.renderAll();
	}

	function prepareBear( ttx, tty)
	{
		tx = ttx;
		ty = tty;
		if ( !bearInterval )
		{
			bearInterval = setInterval(  moveBear, 1000/60 );
		}
	}
	function moveBear(  )
	{
		if ( bear )
		{
			var bear_x = bear.get('left');
			var new_x;
			var bear_y = bear.get('top');
			var new_y;

			if ( bear_y + points_per_frame > ty )
			{
				new_y = ty;
				gamestate = 1;
				lockplayer = false;
				speed = 3;
				ty = -100;
				tx = 47;
				bear.set({left: 47, top: -100}).setCoords();
				clearInterval( bearInterval );
				bearInterval = false;
				return;
			}
			else
			{
				new_y = bear_y + 6;
			}

			new_x = tx;
			bear.set({left: new_x, top: new_y}).setCoords();

		}
	}
});