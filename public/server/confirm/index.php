<?php
namespace Firebase;

use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;
use Mailer\Mailer;
require '../../../vendor/autoload.php';

$config = require '../../../config/config.php';
$liqpayPK = $config['LIQPAY_PRIVATE_KEY'];

$serviceAccount = ServiceAccount::fromJsonFile('./../../../config/printlab-cda25-firebase-adminsdk-u4q60-8ae915f183.json');

$mailer = new Mailer();

    if((isset($_POST['data'])&& isset($_POST['signature'])) || (isset($_POST['order'])&& $_POST['order'])) {
        $firebase = (new Factory)
            ->withServiceAccount($serviceAccount)
            ->create();

        $db = $firebase->getDatabase();


        if(isset($_POST['data'])&& isset($_POST['signature'])) {

            $data = $_POST['data'];
            $signature = $_POST['signature'];

            $sign = base64_encode(sha1(
                $liqpayPK.
                $data .
                $liqpayPK
                , 1));

            if($sign===$signature) {

            $payData = json_decode(base64_decode($data), true);
                $updates = [
                    'orders/' . $payData['order_id'] . '/pay_status' => $payData['status'],
                    'orders/' . $payData['order_id'] . '/dateUpdate' => date("Y-m-d H:i:s"),
                    'versionAdmin'=>md5(time())
                ];

                $db->getReference()// this is the root reference
                ->update($updates);
            }
        }

        if (isset($sign) || isset($_POST['order'])&& $_POST['order']) {

            if(isset($_POST['order_id'])|| (isset($payData['status'])&&$payData['status']=='success')) {
                $order = isset($_POST['order_id'])?$_POST['order_id']:$payData['order_id'];
                $reference = $db->getReference('orders/' . $order);
                $value = $reference->getValue();

                $subject = 'Заказ №' . $value['orderId'];

                $storeMessage = $mailer->getTemplate($value);

                if(isset($sign)) {
                    $mailer->send_mail($value['user']['email'], $subject, $storeMessage, $value['user']['name'], $config['mail_user'], $config['mail_password']);
                    $mailer->send_mail('zakaz@okprint.com.ua', $subject, 'Заказ оплачен', 'admin', $config['mail_user'], $config['mail_password']);
                }elseif(isset($_POST['moneyTransfer'])&& $_POST['moneyTransfer']){
                    $mailer->send_mail($value['user']['email'], $subject, $storeMessage, $value['user']['name'], $config['mail_user'], $config['mail_password']);
                    $mailer->send_mail('zakaz@okprint.com.ua', $subject, 'Поступил заказ на наклейки', 'admin', $config['mail_user'], $config['mail_password']);
                }elseif (isset($_POST['design'])&& $_POST['design']){
                    $mailer->send_mail($value['user']['email'], $subject, 'Ваш заказ принят, с вами свяжется менеджер', $value['user']['name'], $config['mail_user'], $config['mail_password']);
                    $mailer->send_mail('zakaz@okprint.com.ua', $subject, 'Поступил заказ на дизайн наклеек', 'admin', $config['mail_user'], $config['mail_password']);
                }elseif (isset($_POST['payment'])&& $_POST['payment']){
                    $mailer->send_mail($value['user']['email'], $subject, 'Ваш заказ принят, ожидаем подтверждения оплаты', $value['user']['name'], $config['mail_user'], $config['mail_password']);
                    if(isset($_POST['liqPay'])&& $_POST['liqPay']) {
                        $mailer->send_mail('zakaz@okprint.com.ua', $subject, 'Поступил заказ на печать наклеек, ожидаем оплату через liqPay', 'admin', $config['mail_user'], $config['mail_password']);
                    }else{
                        $mailer->send_mail('zakaz@okprint.com.ua', $subject, 'Поступил заказ на печать наклеек, оплата по безналичному расчету', 'admin', $config['mail_user'], $config['mail_password']);
                    }
                }
            }

        }
    }elseif (isset($_POST['question'])&& $_POST['question']){
        $subject = 'Обратная связь';

        $message = '
        <html>
        <head>
          <title>Обратная связь</title>
        </head>
        <body>
          <div><b>Имя:</b>'.$_POST['name'].'</div>
          <div><b>Телефон:</b>'.$_POST['phone'].'</div>
          <div><b>Вопрос:</b>'.$_POST['message'].'</div>
        </body>
        </html>
        ';

        $mailer->send_mail('zakaz@okprint.com.ua', $subject, $message, 'admin', $config['mail_user'], $config['mail_password']);
    }