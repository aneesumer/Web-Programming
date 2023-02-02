<?php

$file = file_get_contents('polls.json');
$polls = json_decode($file, true) ?? [];

?>