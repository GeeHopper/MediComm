<?php
  require_once "config.php";
  session_start();

  if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
  }

?>
<!DOCTYPE HTML>
<html lang="en" dir="ltr">

    <head>
    <meta charset="utf-8">
    <title></title>
    <link rel="stylesheet" href="css/myprofile.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">
    </head>

    <body>

    </body>

</html>