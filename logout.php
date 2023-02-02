<?php
include('init.php');
unset($_SESSION['user']);
unset($_SESSION['username']);
unset($_SESSION['admin']);
header('Location: index.php');
die();

?>