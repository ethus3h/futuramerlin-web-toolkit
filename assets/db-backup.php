<?php
$file = 'mytable.sql';
$result = mysql_query("SELECT * INTO OUTFILE '$file' FROM `##table##`");
header('Location :'.$file);
?>
