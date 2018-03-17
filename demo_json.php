<?php
    
    $json_string = $_POST["json"];
    $user = $_POST["user"];
    
    echo "$user";
    $fd = fopen($user.".json","a+");

    fputs($fd, $json_string);	

    fclose($fd);

?>