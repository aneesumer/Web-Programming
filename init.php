<?php 
session_start();
$userIsLoggedIn = $_SESSION["user"] ?? false;
$username = $_SESSION["username"] ?? false;
$adminIsLoggednIn = $_SESSION["admin"] ?? false;

?>