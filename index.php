<?php
include('init.php');
include('polls.php');

if ($polls && count($polls)) {

  $key_values = array_column($polls, 'deadline');

  array_multisort($key_values, SORT_ASC, $polls);
}

$numberOfCurrentPolls = 0;
$numberOfClosedPolls = 0;
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
    <div class="d-flex justify-content-between">
      <div>
        <h1>Polling Home Page</h1>
        <p>Here you can add vote on different polls</p>
      </div>
      <div>
          <?php if($userIsLoggedIn || $adminIsLoggednIn) :?>
            <a href="logout.php">Logout</a>
          <?php else: ?>
            <a href="register.php">Registration</a>
            <a href="login.php">Login</a>
            <a href="admin_login.php">Admin Login</a>
          <?php endif ?>
      </div>
    </div>

    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active"><a href="#">Home</a></li>
      </ol>
    </nav>
    <?php if($adminIsLoggednIn): ?>
      <form action='create.php' method='post'>
        <input type='submit' class="btn btn-primary" value='Create a poll'>
      </form>
    <?php endif ?>

    <hr />
    <h2 class="mb-3">Current Polls</h2>
    <ul class="list-group">
      <?php if ($polls && count($polls)) : ?>

        <?php foreach ($polls as $p) : ?>
          <?php if ($p['deadline'] >= date('Y-m-d')) : ?>
            <?php $numberOfCurrentPolls++; ?>
            <li class="list-group-item list-group-item-action">
              <h3><?= $p['id'] ?></h3>
              <p>Question: <?= $p['question'] ?></p>
              <p>Creation Date: <?= $p['createdAt'] ?></p>
              <p>Deadline: <?= $p['deadline'] ?></p>
              <?php $urlArray = urlencode(base64_encode(json_encode($p))) ?>
              <?php if(!$adminIsLoggednIn): ?>
                <form action='vote.php?arr=<?= $urlArray ?>' method='post' class="mb-2">
                  <input type='submit' class="btn btn-secondary" value='<?= in_array($username, $p['voted']) ? 'Update/edit vote' : 'Vote'?>'>
                </form>
              <?php endif ?>
              <?php if($adminIsLoggednIn): ?>
                <form action='delete.php?' method='post' class="mb-2">
                  <input type="hidden" name="pollId" value="<?=$p['id']?>"/>
                  <input type='submit' class="btn btn-danger" value='Delete'>
                </form>
              <?php endif ?>
            </li>
          <?php endif ?>
        <?php endforeach ?>
      <?php endif ?>
      <?php if (!$numberOfCurrentPolls) : ?>
        <div class="alert alert-primary" role="alert">
          There is no current polls!
        </div>
      <?php endif ?>
    </ul>

    <h2 class="mb-3 mt-5">Closed Polls</h2>
    <ul class="list-group mb-5">
      <?php if ($polls && count($polls)) : ?>
        <?php foreach ($polls as $p) : ?>
          <?php if ($p['deadline'] < date('Y-m-d')) : ?>
            <?php $numberOfClosedPolls++; ?>
            <li class="list-group-item list-group-item-action">
              <h3><?= $p['id'] ?></h3>
              <p>Question: <?= $p['question'] ?></p>
              <p>Creation Date: <?= $p['createdAt'] ?></p>
              <p>Deadline: <?= $p['deadline'] ?></p>
              <?php if($adminIsLoggednIn): ?>
                <form action='delete.php?' method='post' class="mb-2">
                  <input type="hidden" name="pollId" value="<?=$p['id']?>"/>
                  <input type='submit' class="btn btn-danger" value='Delete'>
                </form>
              <?php endif ?>
              <a class="btn btn-primary" href="results.php?pollId=<?=$p['id']?>">Show Results</a>
            </li>
          <?php endif ?>
        <?php endforeach ?>
      <?php endif ?>
      <?php if (!$numberOfClosedPolls) : ?>
        <div class="alert alert-primary" role="alert">
          There is no closed polls!
        </div>
      <?php endif ?>
    </ul>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
</body>

</html>