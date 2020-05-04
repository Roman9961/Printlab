<?php


$phone = $_GET['phone'];
echo file_get_contents('http://77.222.152.121:88?key=tTBSNAmh5EJ6GqCLyz2uDEpzqQ&phone='.substr($phone, -10).'&servise=printlab');