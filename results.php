<?php
include('init.php');
include('auth_user_or_admin.php');
include('polls.php');
$idArray = json_decode(base64_decode(urldecode($_GET["arr"])));

$voteErr = false;
$voteSuccess = false;
$poll = $polls[$_GET["pollId"]];
if(strtotime($poll['deadline']) > strtotime("now")) {
    header('Location: index.php');
    die();
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
    <h1>Result page</h1>
    <p>On this page you check votes.</p>

    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item "><a href="index.php">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Results</li>
      </ol>
    </nav>
    <hr />
    <p><span class="fw-bold">Question</span>: <?= $poll['question'] ?></p>
    <p><span class="fw-bold">Creation Time</span>: <?= $poll['createdAt'] ?></p>
    <p><span class="fw-bold">Deadline</span>: <?= $poll['deadline'] ?></p>
    <p><span class="fw-bold">Votes by</span>: <?= implode(', ', $poll['voted']) ?></p>
    <p><span class="fw-bold">Results:</span></p>
    <?php foreach($poll['answers'] as $option => $numberOfVotes) :?>
        <?=$option?>: <?=$numberOfVotes?> votes<br/>
    <?php endforeach ?>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
</body>

</html>