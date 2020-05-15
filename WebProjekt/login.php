<?php
// Initialize the session
session_start();
 
// Check if the user is already logged in, if yes then redirect him to welcome page
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    header("location: index.php");
    exit;
}
 
// Include config file
require_once "config.php";
 
// Define variables and initialize with empty values
$username = $password = "";
$username_err = $password_err = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
 
    // Check if username is empty
    if(empty(trim($_POST["username"]))){
        $username_err = "Please enter username.";
    } else{
        $username = trim($_POST["username"]);
    }
    
    // Check if password is empty
    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter your password.";
    } else{
        $password = trim($_POST["password"]);
    }
    
    // Validate credentials
    if(empty($username_err) && empty($password_err)){
        // Prepare a select statement
        $sql = "SELECT id, mail, password FROM users WHERE mail = ?";
        
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);
            
            // Set parameters
            $param_username = $username;
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Store result
                mysqli_stmt_store_result($stmt);
                
                // Check if username exists, if yes then verify password
                if(mysqli_stmt_num_rows($stmt) == 1){                    
                    // Bind result variables
                    mysqli_stmt_bind_result($stmt, $id, $username, $hashed_password);
                    if(mysqli_stmt_fetch($stmt)){
                        if(password_verify($password, $hashed_password)){
                            // Password is correct, so start a new session
                            session_start();
                            
                            // Store data in session variables
                            $_SESSION["loggedin"] = true;
                            $_SESSION["id"] = $id;
                            $_SESSION["mail"] = $mysqli->query("SELECT mail FROM users WHERE id = ' $id '")->fetch_object()->mail;
                            $_SESSION["firstname"] = $link->query("SELECT firstname FROM users WHERE id = ' $id '")->fetch_object()->firstname;     
                            $_SESSION["lastname"] = $link->query("SELECT lastname FROM users WHERE id = ' $id '")->fetch_object()->lastname;
                            $_SESSION["address"] = $link->query("SELECT firstname FROM users WHERE id = ' $id '")->fetch_object()->firstname;
                                                        
                            //$_SESSION["firstname"] = "lol";
                            // Redirect user to welcome page
                            header("location: index.php");
                        } else{
                            // Display an error message if password is not valid
                            $password_err = "The password you entered was not valid.";
                        }
                    }
                } else{
                    // Display an error message if username doesn't exist
                    $username_err = "No account found with that username.";
                }
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }

            // Close statement
            mysqli_stmt_close($stmt);
        }
    }
    
    // Close connection
    mysqli_close($link);
}
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <title></title>
  <link rel="stylesheet" href="css/login.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">
</head>

<body>

  <!-- TODO:

 1. passwort hashen
 2. datenschutzerklärung check
 3. bescheibung vor doc und pat buttons
 4. neue seite nach registrierung und login
 5. hintergrundbild für die blauen felder (auf der Login seite)
 6. logo einfügen oberhalb der seite
 -->

  <div id="top-cut">

    <div id="logImg">
      <img class="logImg" src="images/login.png" alt="logImg" height="600"></a>
    </div>

    <div class="title">
      Login
    </div>
    <div class="no-acc">
      <p>No Account? <a href="file:///Users/zulfiyecakmak/Desktop/WebProjekt-test/reg.html">Signup!</a></p>

    </div>

    <div id="middleOne">
      <p class="kurzBeschreibung">Beschreibung was die App bietet</p>
    </div>

    <div id="middleTwo">
      <div class="iconTermin">
        <i class="far fa-calendar-check"></i>
        <div class="iconDoc">
          <i class="fas fa-user-md"></i>
        </div>
        <div class="iconNote">
          <i class="far fa-sticky-note"></i>
        </div>
        <div class="iconFolder">
          <i class="far fa-folder"></i>
        </div>
        <div class="iconMessage">
          <i class="far fa-envelope"></i>
        </div>
      </div>

      <p class="termin-title">Termine vereinbaren</p>
      <p class="doc-title">Kommunizieren </p>
      <p class="note-title">Ihre Notizen </p>
      <p class="folder-title">Ihre Gesundheitsakte </p>
      <p class="message-title">Austausch von Nachrichten</p>
    </div>

    <div id="middleThree">
      WERBUNG MIT SCREENSHOTS
    </div>

    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
      <div class="form">
        <div class="input_field">
          <input type="text" placeholder="Email" name="username" class="input" value="<?php echo $username; ?>" required>
          
          <!--<input type="text" placeholder="Email" class="input">-->
          <i class="mail"></i>
        </div>

        <div class="input_field">
          <input type="password" placeholder="Passwort" name="password" class="input" required>
          <i class="enlock"></i>
        </div>



        <div class="btn">
          <button type="submit" value="Login">Login</button>
          
        </div>
      </div>
    </form>



</body>

</html>
