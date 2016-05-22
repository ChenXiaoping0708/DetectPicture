<?php
$fn = (isset($_SERVER['HTTP_X_FILENAME']) ? $_SERVER['HTTP_X_FILENAME'] : false);
$s=new SaeStorage();
$img=new SaeImage();
$img=file_get_contents('php://input');
if(strpos($fn,'.jpg')==true)
$name= 'detpic'.time().'.jpg'; 
else $name= 'detpic'.time().'.png'; 
$s->write('picture',$name,$img);
echo $name;
?>