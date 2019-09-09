<?php

require "conn.php";
$key = $_POST["goods"];
// echo ($key);
$final = Array();
if($key!==null){
    for($k=0;$k<count($key);$k++){
        $result = mysql_query("select * from pics where sid = '$key[$k]'");
        $datalist = array();
        for($i=0;$i<mysql_num_rows($result);$i++){
            $datalist[$i] = mysql_fetch_array($result,MYSQL_ASSOC);
        }
        array_push($final,$datalist);
    };
    echo(json_encode($final));
};




