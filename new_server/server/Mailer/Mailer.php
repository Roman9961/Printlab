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
        if($to=='zakaz@okprint.com.ua') {
            $mail->addCC('cv@okprint.com.ua', 'Владимир');
        }
        $mail->Subject = $subject;
        $mail->Body    = $message;
        if($mail->send()){
            echo json_encode(array('info' => 'success', 'msg' => __SUCCESS_MESSAGE__));
        } else {
            echo json_encode(array('info' => 'error', 'msg' => __ERROR_MESSAGE__));
        }
    }

    public function getTemplate($params){
        $trans =array(
           'white'=>'белая',
            'transparent'=>'прозрачная',
            'simple'=>'Простой',
            'hard'=>'Сложный',
            'rectangle'=>'Прямоугольная',
            'star'=>'"Звезда"',
            'circle'=>'"Круг"',
            'ellipse'=>'"Эллипс"',
            'radius100'=>'"Радиус 10мм"',
            'radius50'=>'"Радиус 5мм"',
            'radius35'=>'"Радиус 3,5мм"',
            'chopped'=>'"Рубленый"',
            'cloud'=>'"Облако"',
            'accent'=>'"Акцент"',
            'matt'=>'Матовая',
            'gloss'=>'Глянцевая'
        );
        $message = file_get_contents('../../mail.html');
        $message = str_replace('%order%', $params['orderId'], $message);
        $message = str_replace('%price%', $params['calcProp']['price'], $message);
        $message = str_replace('%quantity%', $params['calcProp']['quantity'], $message);
        $message = str_replace('%sizes%', $params['calcProp']['height'].'x'.$params['calcProp']['width'], $message);
        $message = str_replace('%basis%', $params['calcProp']['basis'].'('.$trans[$params['calcProp']['basis_param']].')', $message);
        $message = str_replace('%cut_form%', $trans[$params['calcProp']['cut_form']], $message);
        if($params['calcProp']['lamination']) {
            $message = str_replace('%lamination%', $trans[$params['calcProp']['lamination']], $message);
        }else{
            $message = str_replace('%lamination%', '-', $message);
        }
        return $message;
    }
}



