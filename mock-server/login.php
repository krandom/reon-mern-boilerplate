<?php
header('Access-Control-Allow-Origin: http://localhost:8080', true);

$username = $_POST['username'];
$password = $_POST['password'];

// if ($username !== 'username' || $password !== 'password')
	// echo '{"code":400,"message":"Login failed","data":{},"success":false}';
// else
	echo '{"code":200,"message":"Login successful","data":{"userID":1,"sessionID":"thisWouldBeYourSessionID"},"success":true}';
?>