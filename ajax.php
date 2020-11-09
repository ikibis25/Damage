<?php

$first_name=$_POST['first_name'];
$phone_number=$_POST['phone_number'];
$email=$_POST['email'];
$message=$_POST['message'];
$choice=$_POST['choice'];



$to = "support@templatebundle.net";
$subject = "My subject";
$txt = "Hello Admin: Usser Name: ".$first_name." Phone: ".$phone_number." email ".$email." message: ".$message." service: ".$choice."";
$headers = "From: webmaster@example.com";

echo mail($to,$subject,$txt,$headers);
?>