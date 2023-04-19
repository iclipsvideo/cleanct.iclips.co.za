<?php
    $errors = [];
    $msg = [];
    
    if ($_SERVER['REQUEST_METHOD'] == 'POST') 
    {
        $name = trim($_POST['name']);
        if (!$name) {
            $errors[] = 'Your name can not be empty.';    
        }
        
        $mobile = trim($_POST['mobile']);
        //eliminate every char except 0-9
        //if we have 10 digits left, it's probably valid. and make sure mobile starts with '0'
        if (strlen(preg_replace("/[^0-9]/", '', $mobile)) != 10 || substr($mobile, 0, 1) != "0") {
           $errors[] = 'Your mobile number is invalid. It should start with 0 and be 10 digits long';    
        }
        
        $service_type = $_POST['service_type'];
        if (!$service_type) {
            $errors[] = 'Your service is invalid. Choose a service.';
        }
        
        $comment = $_POST['comment'];
        if (!$errors) {
            $to      = 'info@iclips.co.za';
            
            $headers = "From: support@iclips.co.za\r\n";
            $headers .= "Reply-To: $from\r\n";
            $headers .= "CC: theronclintwilliam@gmail.com\r\n";
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
            
            $subject = "Quote Request";
            $message = "Name: $name<br/>Mobile: $mobile<br/>Service Type: $service_type<br/>Comment: $comment";
            
            // $sent = mail($to, $subject, $message, $headers);
            $sent = true;
            
            if ($sent) {
                $msg['errors'] = $errors;
                $msg['status'] = 'success';  
            } else {
                $errors[] = 'The mail method return false for accepting your message for email delivery. Review your input and correct any mistakes you might have made.';
                $msg['errors'] = $errors;
                $msg['status'] = 'Your message was not accepted for delivery.'; 
            }
        } else {
            $msg['errors'] = $errors;
            $msg['status'] = 'Invalid email message:';
        }
    } else {
        $errors[] = 'The request method should be post.';
        $msg['errors'] = $errors;
        $msg['status'] = 'Invalid email message:';
    }
    
    echo json_encode($msg);
?>