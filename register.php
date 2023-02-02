<?php
include('init.php');
$file = file_get_contents('users.json');
$users = json_decode($file, true) ?? [];

$options = null;
$successMsg = false;
$passwordErr = $emailErr = $usernameErr = '';

if (isset($_POST["Submit"])) {

  $email = $_POST["email"];
  $password = $_POST["password"];
  $username = $_POST["username"];
  
  $hasError = false;
  if(isset($users[$email])) {
    $emailErr = 'The given email already exists!';
    $hasError = true;
  }

  if(strlen(trim($email)) == 0 ) {
    $emailErr = 'The email field is required!';
    $hasError = true;
  }

  if(strlen(trim($username)) == 0 ) {
    $usernameErr = 'The username field is required!';
    $hasError = true;
  }

  if(strlen($password) < 6) {
    $passwordErr = 'The password must containt at least 6 characters!';
    $hasError = true;
  }

  if(!$hasError) {
    $users[$email] = [
      'password' => md5($password),
      'username' => $username,
    ];
    file_put_contents('users.json', json_encode($users));
    $successMsg = "The user has been created successfully! Now you can log in!";
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
    <h1>Registration</h1>
    <p>Here you can create your own profile!</p>

    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="index.php">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Registration</li>
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
        <label for="email" class="form-label">Email address *</label>
        <input type="text" class="form-control" name="email" id="email" aria-describedby="emailHelp">
        <?php if(strlen($emailErr)) :?>
          <div class="alert alert-danger mt-2" role="alert">
            <?= $emailErr;?>
          </div>
        <?php endif ?>
      </div>
      <div class="mb-3">
        <label for="username" class="form-label">Username *</label>
        <input type="text" class="form-control" name="username" id="username" aria-describedby="emailHelp">
        <?php if(strlen($usernameErr)) :?>
          <div class="alert alert-danger mt-2" role="alert">
            <?= $usernameErr;?>
          </div>
        <?php endif ?>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password *</label>
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