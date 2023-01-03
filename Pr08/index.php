<!-- EXE 1 -->

<?php
function factorial ($i) {
  $s = 1;
  while ($i > 0) {
    $s *= $i;
    $i--;
  }

  return $s;
}

function factorial_rec($i) {
  if ($i == 0) return 1;
  return $i * factorial_rec($i - 1);
}

echo factorial(5) . "<br>" . factorial_rec(5);   
?>


<!-- EXE 2 -->

<?php
for($i = 1; $i <7; $i++) {
    echo "<h$i> Hello World </h$i>";
  }

?>


<!-- EXE 3 -->

<?php
$arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
print_r(array_map(function ($e) {return $e * $e;} , array_filter($arr, function ($i) {
  return $i % 2 == 0; })))

?>


<!-- EXE 4 -->

<?php
function array_every ($array, $func) {
  $bool = true;
  foreach($array as $elem) {
    $bool = $bool && $func($elem);
  }

  return $bool;
}


echo (array_every([1, 2, 3, 4, 5], function ($i) {
  return $i % 2 == 0;}))
?>

<!-- EXE 5 -->

<?php
$errors = ["Not Found", "Service Unavailable", "Forbidden"]; ?>

<ul>
<?php foreach ($errors as $err) { ?>
  <li>
    <?php echo $err ?>
  </li>
<?php } ?>
</ul>

<!-- EXE 6 -->

<?php

$bank = [
  ["questions" => "Whats your name?",
  "answers" =>  ["a" => "Anees", "b" => "Umer", "c" => "Ali"],
  "correct" => "a"  ]
  ,

  ["questions" => "Whats your age?",
  "answers" =>  ["a" => "18", "b" => "20", "c" => "22"],
  "correct" => "c"  ]
  ]
?>

<form>
  <?php foreach($bank as $elem) : ?>
     <p> Question :</p> <?php $elem["questions"] ?>
      <?php foreach ($elem["answers"] as $opt => $ans) : ?>
        <input type="radio" value= <?=$ans ?> name = <?= $ans ?> <?= $opt == $elem["correct"] ? "checked"  : ""  ?> disabled> <?=$ans ?>  
        <?php endforeach ?>
  <?php endforeach?>
</form>

<!-- EXE 7 -->

<?php
  $students = [
    ["Name" => "Anees" , "Neptun" => "ASNSI" , "Dob" => "1999", "Gender" => "male"],
    ["Name" => "Ali" , "Neptun" => "AYUDI" , "Dob" => "1965", "Gender" => "male"],
    ["Name" => "Alina" , "Neptun" => "XSERY" , "Dob" => "1995", "Gender" => "female"],
    ["Name" => "Jacklin" , "Neptun" => "UROXD" , "Dob" => "1992", "Gender" => "female"],
  ]

?>

<table style="border: solid 2px black">
  <?php foreach($students as $student) :?>
    <tr >
      <?php
        foreach ($student as $key => $val) :?>
      <td style="border: solid 2px black">
        <?= $key?>
      </td>
      <td style="border: solid 2px black">
        <?=$val?>
      </td>
      <?php endforeach ?>
    </tr>
    <?php endforeach ?>
    <?php 
  ?>
</table>

<h3>Oldest Student</h3> <br>
<?php
  $oldest = $students[0]["Dob"];
  foreach ($students as $student) {
      if ($oldest > $student["Dob"] ) {
      $oldest = $student["Dob"];
      $name = $student["Name"];
      }
    }

  echo $name. "<br>";

if ($oldest < 1970)
  echo "true believer of lifelong learning. <br>" ;
?>

<h3> Females Present</h3>

<?php
$females = false;
foreach ($students as $student) {
    if ("female" == $student["Gender"] ) {
    $females = $females || true;
    }
  }

if ($females)
  echo "True" . "<br>";
else
  echo "False" . "<br>";
?>


<?php
$boys = 0;
$girls = 0;

foreach ($students as $student) {
  if ("female" == $student["Gender"] ) {
  $girls = $girls + 1;
  } else
    $boys = $boys + 1;
}
?>

<div class="w3-bar w3-green">
  <div clasms="w3-bar-item"><?= $boys ?></div>
  <div class="w3-bar-item"><?= $girls ?></div>
</div>
