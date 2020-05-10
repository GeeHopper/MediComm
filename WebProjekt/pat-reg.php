<?php
// Include config file
require_once "config.php";
 
// Define variables and initialize with empty values
$username = $password = $confirm_password = "";
$username_err = $password_err = $confirm_password_err = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
 
    // Validate username
    if(empty(trim($_POST["username"]))){
        $username_err = "Please enter a username.";
    } else{
        // Prepare a select statement
        $sql = "SELECT id FROM users WHERE username = ?";
        
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);
            
            // Set parameters
            $param_username = trim($_POST["username"]);
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                /* store result */
                mysqli_stmt_store_result($stmt);
                
                if(mysqli_stmt_num_rows($stmt) == 1){
                    $username_err = "This username is already taken.";
                } else{
                    $username = trim($_POST["username"]);
                }
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }

            // Close statement
            mysqli_stmt_close($stmt);
        }
    }
    
    // Validate password
    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter a password.";     
    } elseif(strlen(trim($_POST["password"])) < 6){
        $password_err = "Password must have atleast 6 characters.";
    } else{
        $password = trim($_POST["password"]);
    }
    
    // Validate confirm password
    if(empty(trim($_POST["confirm_password"]))){
        $confirm_password_err = "Please confirm password.";     
    } else{
        $confirm_password = trim($_POST["confirm_password"]);
        if(empty($password_err) && ($password != $confirm_password)){
            $confirm_password_err = "Password did not match.";
        }
    }

    if(empty(trim($_POST["firstname"]))){
      $firstname_err = "Please enter a first name.";     
    } else{
      $firstname = trim($_POST["firstname"]);
    }

    if(empty(trim($_POST["lastname"]))){
      $lastname_err = "Please enter a last name.";     
    } else{
      $lastname = trim($_POST["lastname"]);
    }

    if(empty(trim($_POST["profilepic"]))){
      $profilepic_err = "Please submit a Profile Picture.";     
    } else{
      $profilepic = trim($_POST["profilepic"]);
    }

    if(empty(trim($_POST["address"]))){
      $address_err = "Please enter an address.";     
    } else{
      $address = trim($_POST["address"]);
    }
    
    // Check input errors before inserting in database
    if(empty($username_err) && empty($password_err) && empty($confirm_password_err) && empty($firstname_err) && empty($lastname_err) && empty($address_err)){
        
        // Prepare an insert statement
        $sql = "INSERT INTO users (username, password, firstname, lastname, address, profilepic) VALUES (?, ?, ?, ?, ?, ?)";
         
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "ssssss", $param_username, $param_password, $param_profilepic, $param_firstname, $param_lastname, $param_address);
            
            // Set parameters
            $param_profilepic = $profilepic;
            $param_username = $username;
            $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash
            $param_firstname = $firstname;
            $param_lastname = $lastname;
            $param_address = $address;

            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Redirect to login page
                header("location: login.php");
            } else{
                echo "Something went wrong. Please try again later.";
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
  <link rel="stylesheet" href="css/pat-reg.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">

</head>

<body>

  <div class="title">
    Registrieren
  </div>


  <div id="pat-reg">
    <img class="pat-reg" src="images/pat.png" alt="pat-reg" height="500"></a>
  </div>


  <div class="bg-right"></div>

  <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
        

    <div class="vorName">
      <div class="input_field">
        <input value="<?php echo $username; ?>" name="firstname" type="text" placeholder="Vorname" class="input">
        <i class="name"></i>
      </div>

    </div>

    <div class="nachName">
      <div class="input_field">
        <input type="text" placeholder="Nachname" class="input" name="lastname">
        <i class="name"></i>
      </div>
    </div>

    <div class="mail">
      <div class="input_field">
        <input type="text" placeholder="Email" class="input" name="username">
        <i class="mail"></i>
      </div>
    </div>

    <div class="pass">
      <div class="input_field">
        <input value="<?php echo $password; ?>" name="password" type="password" placeholder="Passwort" class="input">
        <i class="enlock"></i>
      </div>
    </div>

    <div class="pass-w">
      <div class="input_field">
        <input name="confirm_password" type="password" placeholder="Passwort wiederholen" class="input" value="<?php echo $confirm_password; ?>">
        <i class="enlock"></i>
      </div>
    </div>

    <div class="anschrift">
      <div class="input_field">
        <input type="text" placeholder="Anschrift" class="input" name="address">
        <i class="anschrift"></i>
      </div>
    </div>

    <div class="telefon">
      <div class="input_field">
        <input type="text" placeholder="Telefon" class="input" name="profilepic">
        <i class="telefon"></i>
      </div>
    </div>

    <div class="kk">
      <div class="input_field">
        <input list="kk" placeholder="Krankenkasse" class="input">
        <datalist id="kk">
          <option value="AOK">
          <option value="Knappschaft">
          <option value="Innungskrankenkasse ">
          <option value="DAK Gesundheit">
          <option value=" BARMER">
        </datalist>
      </div>
    </div>

    <div class="verNr">
      <div class="input_field">
        <input type="text" placeholder="Versichertennummer" class="input">
        <i class="verNr"></i>
      </div>
    </div>


    <!--<div class="form">
      <div class="btn">
        <a href="button">Registrieren</a>
      </div>
    </div>-->
      <input type="submit" class="btn btn-primary" value="Submit">
      <input type="reset" class="btn btn-default" value="Reset">
            
    </div>
  </form>



</body>

</html>
