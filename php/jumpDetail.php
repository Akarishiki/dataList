<?php

require "conn.php";
$key = $_POST["hashValue"];
$result = mysql_query("select * from pics where sid = '$key'");
$datalist = array();
for($i=0;$i<mysql_num_rows($result);$i++){
    $datalist[$i] = mysql_fetch_array($result,MYSQL_ASSOC);
}

echo (json_encode($datalist));