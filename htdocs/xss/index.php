<?php
$data=$_GET['params'];
$mycomment=$_GET['comment'];
$username=$_GET['username'];
$eventThreat=$_GET['eventThreat'];
$data=str_replace('ratwo','#',$data);
$data=str_replace('ratwoAnd','&',$data);
mysql_connect("localhost","root","");
mysql_select_db("xss");

$dt=date('Y-m-d');
$tm=date("H:i:s");

$str="insert into threat (url,user,date,time,comment,eventThreat) values('".$data."','".$username."','".$dt."','".$tm."','".$mycomment."','".$eventThreat."');";
mysql_query($str);
?>