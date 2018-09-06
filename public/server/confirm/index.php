<?php
namespace Firebase;

use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;
use Mailer\Mailer;
require '../../../vendor/autoload.php';

$config = require '../../../config/config.php';
$liqpay = $config['LIQPAY_PRIVATE_KEY'];

$serviceAccount = ServiceAccount::fromJsonFile(__DIR__ . '/../../../config/catchoftheday-62fd3-firebase-adminsdk-jvr2p-a4c205546c.json');

    if((isset($_POST['data'])&& isset($_POST['signature'])) || (isset($_POST['moneyTransfer'])&& $_POST['moneyTransfer'])) {
        $firebase = (new Factory)
            ->withServiceAccount($serviceAccount)
            ->create();

        $db = $firebase->getDatabase();
    }

    if(isset($_POST['data'])&& isset($_POST['signature'])) {

        $data = $_POST['data'];
        $signature = $_POST['signature'];

        $sign = base64_encode(sha1(
            $liqpay['LIQPAY_PRIVATE_KEY'] .
            $data .
            $liqpay['LIQPAY_PRIVATE_KEY']
            , 1));

        if($sign===$signature) {
            $updates = [
                'orders/' . $_POST['order_id'] . '/status' => $_POST['status'],
                'orders/' . $_POST['order_id'] . '/dateUpdate' => date("Y-m-d H:i:s")
            ];

            $db->getReference()// this is the root reference
            ->update($updates);
        }
    }

    if (isset($sign) || isset($_POST['moneyTransfer'])&& $_POST['moneyTransfer']) {


        $reference = $db->getReference('orders/' . $_POST['order_id']);
        $value = $reference->getValue();

        $subject = 'Заказ №' . $value['orderId'];

        $mailer = new Mailer();
        $storeMessage = $mailer->getTemplate($value);
        $mailer->send_mail('romanrimskiy@gmail.com', $subject, $storeMessage, $value['user']['name'], $config['mail_user'], $config['mail_password']);

    }