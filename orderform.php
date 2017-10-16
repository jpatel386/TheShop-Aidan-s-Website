<?php
    $user = $_GET["user"];
    $startdate = $_GET["date"];
    echo $startdate;
    $link = mysql_connect('localhost','cl25-admin-zj2','test123')
                 or die('Error connecting to MySQL server.');
    mysql_select_db("cl25-admin-zj2", $link);
    $resultbefore = mysql_query("Delete from `schedule`", $link);
    $result = mysql_query("select * from `Availability` where ScheduleForWeek = '1' and shiftDate > '$startdate' order by shiftDate, shift  ASC ", $link);
    while ($row1 = mysql_fetch_array($result)){
        $result1 = mysql_query("INSERT INTO `schedule` (shiftdate, Username,shift) VALUES ('$row1[shiftDate]', '$row1[userid]','$row1[shift]')", $link);    
    }
        $result = mysql_query("select * from `login` where not emptype ='Shop Chair'", $link);
        while ($row2 = mysql_fetch_array($result)){
            $resultemails = mysql_query("select * from `schedule` where Username ='$row2[Username]'", $link);
            $name = $row2[FullName];
            $email = $row2[email];
            $recipient = $email;
            $subject = "Schedule for The Shop @ Aidan's";
            if (mysql_num_rows ($resultemails) >0){
                $email_content = "Hi, $row2[FullName]\n";
                $email_content .= "\nYour work schedule for upcoming week is : \n\n";
                while ($row3 = mysql_fetch_array($resultemails)){
                    $dateform =date("d/m/Y", strtotime($row3[shiftdate]));
					if($row3[shift] != "a" && $row3[shift] != "e" && $row3[shift] != "t"){
						$strt=substr($row3[shift],0,8);
						$end=substr($row3[shift],12,8);
						$t1=date('g:i A', strtotime($strt));
						$t2=date('g:i A', strtotime($end));						
					}
                    if ($row3[shift] == "a"){
                        $email_content .= "$dateform - Afternoon \n";
                    }
                    else if ($row3[shift] == "e"){
                        $email_content .= "$dateform - Evening \n";
                    }
                    else if ($row3[shift] == "t"){
                        $email_content .= "$dateform \n";	
                    }
					else{
						$email_content .= "$dateform - $t1 To $t2\n";
					}
                }
                $email_content .= "\nThanks,\nShop Chair\n";
            }
            else {
                $email_content = "Hi $row2[FullName], you are not scheduled to work in the upcoming week.";
            }
            
            $email_headers = "From: theshopataidans@gmail.com";
            mail($recipient, $subject, $email_content, $email_headers);
        }
    header("Location: http://79.170.44.107/theshopataidans.com/Scheduler.php?success=11&user=$user");

?>