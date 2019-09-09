<?php

require "conn.php";
$key = $_GET["class"];
$result = mysql_query("select * from pics where type = '$key'");
$datalist = array();
for($i=0;$i<mysql_num_rows($result);$i++){
    $datalist[$i] = mysql_fetch_array($result,MYSQL_ASSOC);
}

echo (json_encode($datalist));