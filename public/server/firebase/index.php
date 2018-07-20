<?php

use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;

require '../../../vendor/autoload.php';

$serviceAccount = ServiceAccount::fromJsonFile(__DIR__.'/catchoftheday-62fd3-firebase-adminsdk-jvr2p-a4c205546c.json');

$firebase = (new Factory)
    ->withServiceAccount($serviceAccount)
    ->create();

$db = $firebase->getDatabase();
$updates = [
    'orders/'.$_POST['order_id'].'/status' => $_POST['status'],
    'orders/'.$_POST['order_id'].'/dateUpdate' => date("Y-m-d H:i:s")
];

$db->getReference() // this is the root reference
->update($updates);