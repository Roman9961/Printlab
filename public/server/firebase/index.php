<?php

use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;

require '../../../vendor/autoload.php';

$liqpay = require __DIR__.'/config.php';

if(isset($_POST['data'])&& isset($_POST['signature'])) {

    $data = $_POST['data'];
    $signature = $_POST['signature'];

    $sign = base64_encode(sha1(
        $liqpay['LIQPAY_PRIVATE_KEY'] .
        $data .
        $liqpay['LIQPAY_PRIVATE_KEY']
        , 1));

    if($sign===$signature) {

        $serviceAccount = ServiceAccount::fromJsonFile(__DIR__ . '/catchoftheday-62fd3-firebase-adminsdk-jvr2p-a4c205546c.json');

        $firebase = (new Factory)
            ->withServiceAccount($serviceAccount)
            ->create();

        $db = $firebase->getDatabase();
        $updates = [
            'orders/' . $_POST['order_id'] . '/status' => $_POST['status'],
            'orders/' . $_POST['order_id'] . '/dateUpdate' => date("Y-m-d H:i:s")
        ];

        $db->getReference()// this is the root reference
        ->update($updates);
    }
}