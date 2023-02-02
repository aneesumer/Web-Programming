<?php
include('init.php');
include('admin_auth.php');
include('polls.php');

$pollId = $_POST['pollId'];
unset($polls[$pollId]);
file_put_contents('polls.json', json_encode($polls));
header('Location: index.php');
die();
?>