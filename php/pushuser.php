<?php

require "conn.php";
$name = $_POST["username"];
$pw = $_POST["password"];
mysql_query("insert into userlist values(null,'$name','$pw')");
echo("$pw");
echo("$name");
