<?php
include('init.php');
include('auth.php');
include('polls.php');
$idArray = json_decode(base64_decode(urldecode($_GET["arr"])));


$voteErr = false;
$voteSuccess = false;
if (isset($_POST["Submit"])) {
  $options = $_POST["options"];

    if(empty($options)) {
      $voteErr = 'You have to select at least one option!';
    }

    foreach ($options as $option) {
      $polls[$idArray->id]["answers"][$option]++;
    }

    if(!in_array($username, $polls[$idArray->id]["voted"])) {
      array_push($polls[$idArray->id]["voted"], $username);
    }

    if(!$voteErr) {
      $voteSuccess = true;
    }

    file_put_contents('polls.json', json_encode($polls));
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
    <h1>Vote page</h1>
    <p>On this page you can vote.</p>

    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item "><a href="index.php">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Vote</li>
      </ol>
    </nav>
    <hr />
    <form action="vote.php?arr=<?= $_GET["arr"] ?>" method="post" novalidate>
      <h2> <?= $idArray->question ?> </h2>
      <?php if($voteErr) : ?>
        <div class="alert alert-danger mb-2" role="alert">
          <?= $voteErr; ?>
        </div>
      <?php endif ?>
      <?php if($voteSuccess) :?>
        <div class="alert alert-success mb-2" role="alert">
          Voting is successful!
        </div>
      <?php endif ?>     
      <?php if($idArray->isMultiple):?>
        <div class="alert alert-primary" role="alert">
          Multiple selection is allowed!
        </div>
      <?php endif ?>
      <?php foreach ($idArray->options as $key => $p) : ?>
          <?php if(strlen(trim($p))):?>
            <div class="form-check">
              <input class="form-check-input" id="option_<?= $key  ?>" name="options[]" value="<?= $p ?>" type=<?= $idArray->isMultiple === "true" ? "checkbox" : "radio" ?>>
              <label class="form-check-label" for="option_<?= $key  ?>">
                <?= $p ?>
              </label>
            </div>
            <?php endif ?>
      <?php endforeach ?>

      <input type="submit" class="btn btn-primary mt-4" value="Submit" name="Submit">
     

    </form>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
</body>

</html>