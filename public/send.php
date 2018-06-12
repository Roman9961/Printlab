<?php
require 'vendor/phpmailer/phpmailer/PHPMailerAutoload.php';
require 'vendor/autoload.php';

function send_mail($to,$subject,$message,$name, $user, $password, $files){
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->IsHTML(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = $user;
    $mail->Password = $password;
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;
    $mail->setFrom('ordersafepet@gmail.com', 'SafePet');
    $mail->addAddress($to, $name);
    foreach ($files as $file ){
        $mail->AddAttachment('/home/webintern/websites/St/build/server/php/files/'.$file);
    }
    $mail->Subject = $subject;
    $mail->Body    = $message;
    if($mail->send()){
        foreach ($files as $file ){
            $filename = '/home/webintern/websites/St/build/server/php/files/'.$file;
            $thumbnail = '/home/webintern/websites/St/build/server/php/files/'.$file;
            if(file_exists($filename)){
                unlink($filename);
            }
            if(file_exists($thumbnail)){
                unlink($thumbnail);
            }
        }
        echo json_encode(array('info' => 'success', 'msg' => $_POST));
    }
}

send_mail('romanrimskiy@gmail.com','Order','mess','admin', 'e-mail', 'password', $_POST['user_files']);
