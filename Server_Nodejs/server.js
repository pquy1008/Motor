
var app = require('http').createServer(handler)
var io = require('socket.io')(app);

// Web server
app.listen(8080);

function handler(req, res) {
	res.writeHead(200)
	res.end('Nice')
}

// Socket server
var sockets = []
io.on('connection', function(socket) {
	console.log('connected');
	sockets.push(socket)

	var index = sockets.indexOf(socket)

	// Receve a request for change camera possion
	socket.on('move_camera', function(data) {
		console.log('move camera');
		console.log(data);
		socket.emit('move_camera', data);
	})

	// Receive a request for change direction
	socket.on('move_direction', function(data) {
		console.log('move direction');
		console.log(data);
		socket.emit('move_direction', data);
	})

	socket.on('disconnect', function() {
		console.log('disconnected');
	})
})