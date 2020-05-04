<?php
$phone = $_GET['phone'];
$denied_chars = ['-', ' ', '(', ')', '-'];
$phone = str_replace($denied_chars, '', $phone);
echo file_get_contents('http://77.222.152.121:88/call.php?key=tTBSNAmh5EJ6GqCLyz2uDEpzqQ&phone='.substr($phone, -10).'&servise=printlab');