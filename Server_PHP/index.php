<!DOCTYPE html>
<html>
<head>
<title>Control Motor via Internet</title>

<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<link rel = "stylesheet" type = "text/css" href = "css/style.css" />

<script src="lib/jquery.min.js"></script>
<script src="lib/jquery-ui.min.js"></script>
<script src="lib/jquery.ui.touch-punch.min.js"></script>
</head>

<body>
	<div class="status1">server</div>
	<div class="status2">pi</div>
	<div class="status3">view mode</div>

	<div class="container">
		<div class="leftcontrol">
			<div id="leftpoint">
			</div>
		</div>

		<div class="rightcontrol">
			<div id="rightpoint">
			</div>
		</div>

		<div class="videoframe">
		</div>
	</div>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.5/socket.io.min.js"></script>
	<script src="js/socket-client.js"></script>
</body>
</html>