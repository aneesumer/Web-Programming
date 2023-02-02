<?php
include('init.php');
$file = file_get_contents('users.json');
$users = json_decode($file, true) ?? [];

$options = null;
$successMsg = false;
$passwordErr = $emailErr = '';
if (isset($_POST["Submit"])) {

  $email = $_POST["email"];
  $password = $_POST["password"];
  
  $hasError = false;
  if(!isset($users[$email])) {
    $emailErr = 'The given email does not exist!';
    $hasError = true;
  }

  if(strlen(trim($email)) == 0 ) {
    $emailErr = 'The email field is required!';
    $hasError = true;
  }

  if(strlen($password) < 6) {
    $passwordErr = 'The password must containt at least 6 characters!';
    $hasError = true;
  }

  if(isset($users[$email]) && md5($password) != $users[$email]['password']) {
    $emailErr = 'The given email address and password is not correct! Please try again!';
    $hasError = true;
  }

  if(!$hasError) {
    $_SESSION["user"] = true;
    $_SESSION["username"] = $users[$email]['username'];
    $successMsg = 'Login successful!';
  }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Poll Website</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
</head>

<body>
  <div class="container">
    <h1>Login</h1>
    <p>Here you can log into your profile!</p>

    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="index.php">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Login</li>
      </ol>
    </nav>
    <hr />
    <?php if($successMsg) :?>
        <div class="alert alert-success mb-2" role="alert">
          <?= $successMsg ?>
        </div>
      <?php endif ?>  
    <form action="" method="post" novalidate class="mb-5">
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="text" class="form-control"  name="email" id="email" aria-describedby="emailHelp">
        <?php if(strlen($emailErr)) :?>
          <div class="alert alert-danger mt-2" role="alert">
            <?= $emailErr;?>
          </div>
        <?php endif ?>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" name="password" id="password" aria-describedby="emailHelp">
        <?php if(strlen($passwordErr)) :?>
          <div class="alert alert-danger mt-2" role="alert">
            <?= $passwordErr;?>
          </div>
        <?php endif ?>
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" name="Submit">
    </form>
  </div>
</body>

</html>
