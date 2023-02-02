<?php
if(!$adminIsLoggednIn) {
    header('Location: admin_login.php');
    die();
}

?>