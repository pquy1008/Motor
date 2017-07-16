// Apache config
var app = require('http').createServer(handler)
var io = require('socket.io')(app);


/*********************
PWM for Camera direction config
*********************/
// 0.115 => 0 degree
// 0.05  => 180 degree
const pwm = require('raspi-pwm');

// Servo Left-Right
var servoLR = new pwm.PWM({pin: 'P1-12', frequency: 50});

// Servo Up-Down
var servoUD = new pwm.PWM({pin: 'P1-35', frequency: 50});


/*********************
PWM for Motor config
*********************/
var Gpio = require('pigpio').Gpio;

// Left motor
var leftMotor = {
	forwardRate: 0,
	forwardGpio: new Gpio(27, {mode: Gpio.OUTPUT}),
	backwardRate: 0,
	backwardGpio: new Gpio(17, {mode: Gpio.OUTPUT})
};

// Right motor
var rightMotor = {
	forwardRate: 0,
	forwardGpio: new Gpio(24, {mode: Gpio.OUTPUT}),
	backwardRate: 0,
	backwardGpio: new Gpio(23, {mode: Gpio.OUTPUT})
};

// 50Hz
var timer = setInterval(function() {
	try {
		leftMotor.forwardGpio.pwmWrite(leftMotor.forwardRate);
		leftMotor.backwardGpio.pwmWrite(leftMotor.backwardRate);

		rightMotor.forwardGpio.pwmWrite(rightMotor.forwardRate);
		rightMotor.backwardGpio.pwmWrite(rightMotor.backwardRate);
	}
	catch (err) {
		console.log('setTimeInterval erro:');
		console.log(err);
		return;
	}
}, 20);


// Web socket port
app.listen(8080);

// Just for test webserver
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

 		// Limit direction for camera
		if (data.x < -75) {data.x = -75}
		if (data.x >  75) {data.x =  75}

		if (data.y < -75) {data.y = -75}
		if (data.y >  75) {data.y =  75}

		// Just mistake at a step before
		data.x = -data.x;

		// Start servo
		const pwmDurty = 3.25 / 75 * data.x / 100 + 0.0825
		servoLR.write(pwmDurty);

		var pwmDurty2 = 3.25 / 75 * data.y / 100 + 0.0825
		servoUD.write(pwmDurty2);

		console.log(data);
	})

	// Receive a request for change direction
	socket.on('move_direction', function(data) {
		console.log('move direction');

		// Limit direction
		if (data.x < -75) {data.x = -75}
		if (data.x >  75) {data.x =  75}
		if (data.y < -75) {data.y = -75}
		if (data.y >  75) {data.y =  75}

		// Seperate to 4 segment
		// Turn right & keep forward
		if (data.y >= 0 && data.x >= 0) {
			leftMotor.forwardRate = Math.round(Math.sqrt(Math.pow(data.x, 2) + Math.pow(data.y, 2)) * 255 / 75)
			rightMotor.forwardRate = Math.round(data.y * 255 / 75);

			leftMotor.backwardRate = 0;
			rightMotor.backwardRate = 0;
		}
		// Turn left & keep forward
		else if(data.y >= 0 && data.x < 0) {
			leftMotor.forwardRate = Math.round(data.y * 255 / 75);
			rightMotor.forwardRate = Math.round(Math.sqrt(Math.pow(data.x, 2) + Math.pow(data.y, 2)) * 255 / 75);

			leftMotor.backwardRate = 0;
			rightMotor.backwardRate = 0;
		}
		// Turn left & backward
		else if(data.y < 0 && data.x < 0) {
			leftMotor.backwardRate = Math.round(-data.y * 255 / 75)
			rightMotor.backwardRate = Math.round(Math.sqrt(Math.pow(data.x, 2) + Math.pow(data.y, 2)) * 255 / 75);

			leftMotor.forwardRate = 0;
			rightMotor.forwardRate = 0;
		}
		// Turn right & backward
		else {
			leftMotor.backwardRate = Math.round(Math.sqrt(Math.pow(data.x, 2) + Math.pow(data.y, 2)) * 255 / 75);
			rightMotor.backwardRate = Math.round(-data.y * 255 / 75)

			leftMotor.forwardRate = 0;
			rightMotor.forwardRate = 0;
		}

		console.log(data);
	})

	socket.on('disconnect', function() {
		console.log('disconnected');
	})
})
