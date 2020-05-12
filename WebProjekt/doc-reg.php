<?php
// Include config file
require_once "config.php";
 
// Define variables and initialize with empty values
$username = $password = $confirm_password = $firstname = $lastname = $address = $phone = $mail = $fax = $docnumber = $establishmentnumber = $field = "";
$username_err = $password_err = $confirm_password_err = $firstname_err = $lastname_err = $address_err = $phone_err = $mail_err = $fax_err = $docnumber_err = $establishmentnumber_err = $field_err = "";
 
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

    if(empty(trim($_POST["address"]))){
      $address_err = "Please enter an address.";     
    } else{
      $address = trim($_POST["address"]);
    }

    if(empty(trim($_POST["mail"]))){
      $mail_err = "Please enter an email.";     
    } else{
      $mail = trim($_POST["mail"]);
    }

    if(empty(trim($_POST["phone"]))){
      $phone_err = "Please enter a Phone number.";     
    } else{
      $phone = trim($_POST["phone"]);
    }

    if(empty(trim($_POST["fax"]))){
      $fax_err = "Please enter a fax.";     
    } else{
      $fax = trim($_POST["fax"]);
    }

    if(empty(trim($_POST["field"]))){
      $field_err = "Please enter a field.";     
    } else{
      $field = trim($_POST["field"]);
    }

    if(empty(trim($_POST["establishmentnumber"]))){
      $establishmentnumber_err = "Please enter an establishmentnumber.";     
    } else{
      $establishmentnumber = trim($_POST["establishmentnumber"]);
    }

    if(!isset($_POST["agreement"])){
      $agreement_err = "Please accept the User agreement.";     
    } else{
      $agreement = trim($_POST["agreement"]);
    }
    
    // Check input errors before inserting in database
    if(empty($username_err) && empty($password_err) && empty($confirm_password_err) && empty($firstname_err) && empty($lastname_err) && empty($address_err) && empty($phone_err) && empty($mail_err) && empty($agreement_err) && empty($establishmentnumber_err)  && empty($field_err)){
        
        // Prepare an insert statement
        $sql = "INSERT INTO users (mail, password, profilepic, firstname, lastname, address) VALUES (?, ?, ?, ?, ?, ?)";       

        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "ssssss", $param_mail, $param_password, $param_profilepic, $param_firstname, $param_lastname, $param_address);
            
            // Set parameters
            $param_mail = $mail;
            $param_profilepic = $firstname;
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
        
        $id = mysqli_insert_id($link); // or mysql_insert_id() if you're using old code
        $sql1 = "INSERT INTO doctors (id, phone, fax, url, docnumber, establishmentnumber, field) VALUES (?, ?, ?, ?, ?, ?, ?)";

        if($stmt1 = mysqli_prepare($link, $sql1)){
          // Bind variables to the prepared statement as parameters
          mysqli_stmt_bind_param($stmt1, "isssiss", $param_id, $param_phone, $param_fax, $param_url, $param_docnumber, $param_establishmentnumber, $param_field);
          
          $url = "ha";
          // Set parameters
          $param_id = $docnumber = $id;
          $param_phone = $phone;
          $param_fax = $fax;
          $param_url = $url;
          $param_docnumber = $docnumber;
          $param_establishmentnumber = $establishmentnumber;
          $param_field = $field;
          
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

        $sql2 = "INSERT INTO user_types (id, type) VALUES (?, 'doctor')";

        if($stmt2 = mysqli_prepare($link, $sql2)){
          // Bind variables to the prepared statement as parameters
          mysqli_stmt_bind_param($stmt2, "i", $param_id);
          
          $param_id = $id;

          // Attempt to execute the prepared statement
          if(mysqli_stmt_execute($stmt2)){
              // Redirect to login page
              //header("location: login.php");
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
  <link rel="stylesheet" href="css/doc-reg.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">

</head>

<body>



  <div class="title">
    Registrieren
  </div>


  <div id="doc-reg">
    <img class="doc-reg" src="images/doiic.png" alt="doc-reg"></a>
  </div>


  <div class="bg-right"></div>

  <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
    
    
    <div class="vorName">
      <div class="input_field">
        <input type="text" placeholder="Vorname" class="input" name="firstname">
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
        <input type="text" placeholder="Email" class="input" name="mail">
        <i class="mail"></i>
      </div>
    </div>

    <div class="pass">
      <div class="input_field">
        <input type="password" placeholder="Passwort" class="input" name="password">
        <i class="enlock"></i>
      </div>
    </div>

    <div class="pass-w">
      <div class="input_field">
        <input type="password" placeholder="Passwort wiederholen" class="input" name="confirm_password">
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
        <input type="text" placeholder="Telefon" class="input" name="phone">
        <i class="telefon"></i>
      </div>
    </div>

    <div class="fax">
      <div class="input_field">
        <input type="text" placeholder="Fax" class="input" name="fax">
        <i class="fax"></i>
      </div>
    </div>

    <div class="arztNr">
      <div class="input_field">
        <input type="text" placeholder="Arztnummer" class="input" name="docnumber">
        <i class="arztNr"></i>
      </div>
    </div>

    <div class="betriebsstättennummer">
      <div class="input_field">
        <input type="text" placeholder="Betriebsstättennummer " class="input" name="establishmentnumber">
        <i class="betriebsstättennummer "></i>
      </div>
    </div>

    <div class="field">
      <div class="input_field">
        <input type="text" placeholder="Fachrichtung" class="input" name="field">
        <i class="field "></i>
      </div>
    </div>

    <div id="agreement">
      <input type="checkbox" name="agreement">Please accept the <a href="res/DSGVO">License and User Agreement</a>
    </div>

    <input type="submit" id="submitbtn" value="Submit">

  </form>


</body>

</html>
