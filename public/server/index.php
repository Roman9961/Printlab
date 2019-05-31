<?php
/**
 * Created by PhpStorm.
 * User: webintern
 * Date: 28.11.18
 * Time: 10:39
 */

$data = '<oper>cmt</oper>
        <wait>0</wait>
        <test>1</test>
        <payment id="">
            <prop name="sd" value="11.08.2013" />
            <prop name="ed" value="11.09.2013" />
            <prop name="card" value="5168742060221193" />
        </payment>';

$sign=sha1(md5($data.'3A90E5J0f6OUIfqN1Qu59gYrjDgDblfL'));
$sign = '';
$xml = '<?xml version="1.0" encoding="UTF-8"?>
            <request version="1.0">
                <merchant>
                    <id>75482</id>
                    <signature>'.$sign.'</signature>
                </merchant>
                <data>
                '.$data.'
                </data>
            </request>';

die($sign);
$url = "https://api.privatbank.ua/p24api/rest_fiz";

//setting the curl parameters.
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
// Following line is compulsary to add as it is:
curl_setopt($ch, CURLOPT_POSTFIELDS,
    "xmlRequest=" . $xml);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 300);
$data = curl_exec($ch);
curl_close($ch);

//convert the XML result into array
$array_data = json_decode(json_encode(simplexml_load_string($data)), true);

print_r('<pre>');
print_r($array_data);
print_r('</pre>');

//$orders = new SimpleXMLElement($xml);
//echo '<pre>';
//print_r(json_encode($orders->data->info->statements) );
//foreach ($orders->data->info->statements->statement as $character) {
//    print_r($character);
//}
