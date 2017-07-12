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

	<div class="container">
		<div class="leftcontrol">
			<div class="leftpoint">
			</div>
		</div>

		<div class="rightcontrol">
			<div class="rightpoint">
			</div>
		</div>

		<div class="videoframe">
		</div>
	</div>

	<script>
	$(".leftpoint, .rightpoint").draggable();

	$(".leftpoint, .rightpoint").on("touchstart", function(e) {
		$(".status").html(e.touches.length);
		console.log(e.touches.length);
	})

	</script>
</body>

</html>