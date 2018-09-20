<?php
namespace Mailer;

use PHPMailer;

$config =  require('../../../config/config.php');


//======================================================================
// Variables
//======================================================================


//E-mail address. Enter your email
define("__TO__", $config['mail_user']);

//Success message
define('__SUCCESS_MESSAGE__', "Your message has been sent. We will reply soon. Thank you!");

//Error message 
define('__ERROR_MESSAGE__', "Your message hasn't been sent. Please try again.");

//Messege when one or more fields are empty
define('__MESSAGE_EMPTY_FIELDS__', "Please fill out  all fields");


class Mailer{
    public function send_mail($to,$subject,$message,$name, $user, $password){
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
        $mail->setFrom('zakaz@okprint.com.ua', 'Stickers');
        $mail->addAddress($to, $name);
        $mail->Subject = $subject;
        $mail->Body    = $message;
        if($mail->send()){
            echo json_encode(array('info' => 'success', 'msg' => __SUCCESS_MESSAGE__));
        } else {
            echo json_encode(array('info' => 'error', 'msg' => __ERROR_MESSAGE__));
        }
    }

    public function getTemplate($params){
        $message = file_get_contents('../../mail.html');
        $message = str_replace('%price%', $params['calcProp']['price'], $message);
        return $message;
    }
}



