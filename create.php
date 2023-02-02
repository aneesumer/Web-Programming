<?php
include('init.php');
include('admin_auth.php');
include('polls.php');

$options = null;
$successMsg = false;
$optionsErr = $questionErr = $deadlineErr = $createdAtErr = '';

if (isset($_POST["Submit"])) {

  $question = $_POST["question"];
  $options = $_POST["options"];
  $deadline = $_POST["deadline"];
  $createdAt = $_POST["createdAt"];
  $isMultiple = isset($_POST["isMultiple"]);

  if(strlen(trim($question)) == 0 ) {
    $questionErr = 'The Question field is required!';
    $hasError = true;
  }

  if(strlen(trim($deadline)) == 0 ) {
    $deadlineErr = 'The Deadline field is required!';
    $hasError = true;
  }
 
  if(strlen(trim($createdAt)) == 0 ) {
    $createdAtErr = 'The Creation Time field is required!';
    $hasError = true;
  }
  $emptyOptions = array_filter($options, function($value) {
    return !strlen(trim($value));
  });

  if(sizeof($emptyOptions) > 1) {
    $optionsErr = 'You must add at least 2 options!';
    $hasError = true;
  }

  if(!$hasError) {

    $numberOfPolls = count($polls);
    $lastId = intval(str_replace('poll', '', $polls['poll'.$numberOfPolls]['id']));
    $options = $answers = [];

    foreach($_POST['options'] as $option) {
      $t = [
      $option => 0,
      ];
      array_push($options, $option);
      $answers[$option] = 0;
    }

    $newPoll = [
      'id' => 'poll' . $lastId + 1,
      'question' => $_POST['question'],
      'question' => $_POST['question'],
      'isMultiple' => $_POST['isMultiple'] ?? false,
      'createdAt' => $_POST['createdAt'],
      'deadline' => $_POST['deadline'],
      'voted' => [],
      'options' => $options,
      'answers' => $answers,
    ];  

    $polls['poll' . ($lastId + 1)] = $newPoll;

    file_put_contents('polls.json', json_encode($polls));

    $successMsg = "The poll has been created successfully!";
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
    <h1>Polling Home Page</h1>
    <p>Here you can create your own poll!</p>

    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="index.php">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Poll creation</li>
      </ol>
    </nav>
    <hr />
    <?php if($successMsg) :?>
        <div class="alert alert-success mb-2" role="alert">
          <?= $successMsg ?>
        </div>
      <?php endif ?>  
    <form action="create.php" method="post" novalidate class="mb-5">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Question</label>
        <input type="text" class="form-control" value="<?php echo strlen($hasError) ? $question : "" ?>"  name="question" id="exampleInputEmail1" aria-describedby="emailHelp">
        <?php if(strlen($questionErr)) :?>
          <div class="alert alert-danger mt-2" role="alert">
            <?= $questionErr;?>
          </div>
        <?php endif ?>
      </div>
      <div class="form-check">
        <input class="form-check-input" id="isMultiple" name="isMultiple" value="true" type="checkbox">
        <label class="form-check-label" for="isMultiple">
          Users can select multiple options </label>
      </div>
      <?php for ($i = 1; $i <= 3; $i++) : ?>
        <div class="mb-3">
          <label for="option_<?= $i ?>" class="form-label">Option # <?= $i ?></label>
          <input type="text" class="form-control" name="options[]" id="option_<?= $i ?>" aria-describedby="emailHelp">
          <?php if(strlen($optionsErr)) :?>
            <div class="alert alert-danger mt-2" role="alert">
              <?= $optionsErr;?>
            </div>
          <?php endif ?>
        </div>
      <?php endfor ?>

      <div class="mb-3">
        <label for="deadline" class="form-label">Deadline</label>
        <input type="date" class="form-control" value="<?php echo strlen($hasError) ? $deadline : "" ?>" name="deadline" id="deadline" aria-describedby="emailHelp">
        <?php if(strlen($deadlineErr)) :?>
          <div class="alert alert-danger mt-2" role="alert">
            <?= $deadlineErr;?>
          </div>
        <?php endif ?>
      </div>

      <div class="mb-3">
        <label for="createdAt" class="form-label">Creation Time</label>
        <input type="date" class="form-control" value="<?php echo strlen($hasError) ? $createdAt : "" ?>" name="createdAt" id="createdAt" aria-describedby="emailHelp">
        <?php if(strlen($createdAtErr)) :?>
          <div class="alert alert-danger mt-2" role="alert">
            <?= $createdAtErr;?>
          </div>
        <?php endif ?>
      </div>

      <input type="submit" class="btn btn-primary" value="Submit" name="Submit">
    </form>
  </div>
</body>

</html>