<?php

/*error_reporting(-1);
ini_set('display_errors', 'On');
set_error_handler("var_dump");*/

/*If (isset ($_POST[submit])){*/
 $name=$_POST['name'];
 $tab=$_POST['tab'];
 $email=$_POST['email'];
 $bread=$_POST['bread'];
 $fav=$_POST['fav'];
 $ingred=$_POST['ingred'];
 $other=$_POST['other'];
 $spec=$_POST['spec'];
 
$to = "shoporders@st-aidans.com, $email";

$email_subject = "Shop Order from $name";
$email_body = "Your order:\n\n\n\nName: $name\n\nEmail: $email\n\nTab: $tab\n\nToastie:\n$bread,\n\n$fav,\n\n$ingred,\n\nAnything Else:\n\n$other,\n\n$spec";
$email_body = wordwrap($email_body, 150, "\r\n");
$headers = "From: noreply@shoporders.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@shopmessages.com.
$headers .= "Reply-To: $email";   
if(mail($to,$email_subject,$email_body,$headers)){
    
}
else{
    echo 'fail';
}

header("Location: http://www.theshopataidans.com/confirmation.html");
return true;
 ?>