<?php
namespace Backup;

use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;
require '/var/www/okprint/stikers.okprint.com.ua/vendor/autoload.php';

$serviceAccount = ServiceAccount::fromJsonFile('/var/www/okprint/stikers.okprint.com.ua/config/printlab-cda25-firebase-adminsdk-u4q60-8ae915f183.json');

$filename = date('Y-m-d H-i-s').'.json';
$backup_dir = '/var/www/okprint/stikers.okprint.com.ua/backups/';

if(!is_dir($backup_dir)){
    mkdir($backup_dir);
}
$file_location = $backup_dir.$filename;

$firebase = (new Factory)
    ->withServiceAccount($serviceAccount)
    ->create();

$db = $firebase->getDatabase();

$reference = $db->getReference('/');
$data = $reference->getValue();
$data = json_encode($data);

$backup_file = fopen($file_location, 'wb');
fwrite($backup_file, $data);
fclose($backup_file);
echo 'Backup file \'' . $filename . '\' successfully has been created.';