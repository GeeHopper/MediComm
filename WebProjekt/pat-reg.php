<?php
// Include config file
require_once "config.php";
 
// Define variables and initialize with empty values
$username = $password = $confirm_password = $firstname = $profilepic = $lastname = $address = $insurednumber = $healthinsurance = $agreement = "";
$username_err = $password_err = $confirm_password_err = $firstname_err = $lastname_err = $address_err = $insurednumber_err = $healthinsurance = $agreement_err = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
 
    // Validate username
    /*if(empty(trim($_POST["username"]))){
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
            if(mysqli_stmt_execute($stmt)){*/
                /* store result */
                /*mysqli_stmt_store_result($stmt);
                
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
    }*/
    
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

    if(empty(trim($_POST["insurednumber"]))){
      $insurednumber_err = "Please enter an insured number.";     
    } else{
      $insurednumber = trim($_POST["insurednumber"]);
    }

    if(empty(trim($_POST["healthinsurance"]))){
      $healthinsurance_err = "Please enter a health insurance.";     
    } else{
      $healthinsurance = trim($_POST["healthinsurance"]);
    }

    if(!isset($_POST["agreement"])){
      $agreement_err = "Please accept the User agreement.";     
    } else{
      $agreement = trim($_POST["agreement"]);
    }
    
    // Check input errors before inserting in database
    if(empty($username_err) && empty($password_err) && empty($confirm_password_err) && empty($firstname_err) && empty($lastname_err) && empty($address_err) && empty($insurednumber_err) && empty($healthinsurance_err) && empty($agreement_err)){
        
        // Prepare an insert statement
        $sql = "INSERT INTO users (password, profilepic, firstname, lastname, address) VALUES (?, ?, ?, ?, ?)";
        $sql1 = "INSERT INTO patients (insurednumber, healthinsurance) VALUES (?, ?)";
        $sql2 = "INSERT INTO user_types (type) VALUES ('patient')";
        

        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "sssss", $param_password, $param_firstname, $param_lastname, $param_address, $param_profilepic);
            
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
                //header("location: login.php");
            } else{
                echo "<h1>ERROR</h1>";
            }

            // Close statement
            mysqli_stmt_close($stmt);
        }

        if($stmt1 = mysqli_prepare($link, $sql1)){
          // Bind variables to the prepared statement as parameters
          mysqli_stmt_bind_param($stmt1, "ss", $param_insurednumber, $param_healthinsurance);
          
          // Set parameters
          $param_insurednumber = $insurednumber;
          $param_healthinsurance = $healthinsurance;
          
          // Attempt to execute the prepared statement
          if(mysqli_stmt_execute($stmt1)){
              // Redirect to login page
              //header("location: login.php");
          } else{
              echo "Something went wrong. Please try again later.1";
          }

          // Close statement
          mysqli_stmt_close($stmt1);
        }

        if($stmt2 = mysqli_prepare($link, $sql2)){
          // Bind variables to the prepared statement as parameters
          
          // Attempt to execute the prepared statement
          if(mysqli_stmt_execute($stmt2)){
              // Redirect to login page
              header("location: login.php");
          } else{
              echo "Something went wrong. Please try again later.2";
          }

          // Close statement
          mysqli_stmt_close($stmt2);
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

    <div class="profilepic">
      <div class="input_field">
        <input value="<?php echo $profilepic; ?>" name="profilepic" type="text" placeholder="Pic" class="input">
        <i class="enlock"></i>
      </div>

    </div>

    <div class="kk">
      <div class="input_field">
        <input list="kk" placeholder="Krankenkasse" class="input" name="healthinsurance">
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
        <input type="text" placeholder="Versichertennummer" class="input" name="insurednumber">
        <i class="verNr"></i>
      </div>
    </div>

    <div id="agreement">
      <input type="checkbox" name="agreement">Please accept the <a href="res/DSGVO">License and User Agreement</a>
    </div>


    <!--<div class="form">
      <div class="btn">
        <a href="button">Registrieren</a>
      </div>
    </div>-->
    
    <input type="submit" class="btn btn-primary" value="Submit">
      
  </form>



</body>

</html>
