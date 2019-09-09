<?php
require "conn.php";

$username = $_POST["username"];
$password = ($_POST["password"]);
if(isset($_POST["username"]) && isset($_POST["password"])){
   $result = mysql_query("select * from userlist where username='$username' and password='$password'");
   if(mysql_fetch_array($result,MYSQL_ASSOC)){
       echo "true";
   }else{
       echo "false";
   };
};