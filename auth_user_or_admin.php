<?php
if(!$userIsLoggedIn && !$adminIsLoggednIn) {
    header('Location: login.php');
    die();
}

?>