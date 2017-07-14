var socket = io('http://192.168.0.212:8080');

// SOCKET is connected
socket.on('connect', function(data) {

	// Connect successful
	console.log('SERVER connected');
	$('.status1').css('background-color', 'green');

	// CONTROL CAMERA
	var cameraPossition = {x: 0, y: 0}

	// Move
	$('#leftpoint').draggable({
		stop: function() {
			// Get possition value without 'px'
			// O has posstion is (75, 75)
			var x = $(this).css('left').replace(/[^-\d\.]/g, '') - 75
			var y = -$(this).css('top').replace(/[^-\d\.]/g, '') + 75

			cameraPossition = {x: x, y: y}
			socket.emit('move_camera', cameraPossition)
		}
	})

	// Reset
	// $('#leftpoint').doubletap(function() {
	// 	console.log('double tap');
	// })

	// CONTROL DIRECTION
	var direction = {x: 0, y: 0}

	// Move
	$('#rightpoint').draggable({
		drag: function() {
			var x = $(this).css('left').replace(/[^-\d\.]/g, '') - 75
			var y = -$(this).css('top').replace(/[^-\d\.]/g, '') + 75

			// Make sure that this is not the same old possition
			if (x == direction.x && y == direction.y) {return}

			direction = {x: x, y: y}
			socket.emit('move_direction', direction)
		}
	})
})

// SOCKET is disconnected
socket.on('disconnect', function() {
	console.log('SERVER disconnected');
	$('.status1').css('background-color', 'red');

	// Disable interaction
	$('#leftpoint, #rightpoint').draggable('destroy');
})