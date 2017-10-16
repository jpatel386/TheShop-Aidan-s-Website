<?php
date_default_timezone_set('GMT');
        $hour = date("H");
        $min = date("i");
        if ($hour > 13  && $hour < 16){
            header("Location: http://theshopataidans.com/order.html");
        }
        elseif($hour >19 && $hour < 24 ){
            header("Location: http://theshopataidans.com/order.html");
        }
        else{
            header("Location: http://theshopataidans.com/closed.html");
        }
        

?>