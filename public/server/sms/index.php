<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
$phone = $_POST['phone'];

$id = $_POST['id'];
$url = 'https://alphasms.ua/api/http.php?version=http&key='.$config['api_key'].'&command=send&from=Printlab&to='.$phone.'&message=Ваш заказ № '.$id.' готов.';

$options = array(

    CURLOPT_CUSTOMREQUEST  =>"GET",        //set request type post or get
    CURLOPT_POST           =>false,        //set to GET
    CURLOPT_RETURNTRANSFER => true,     // return web page
    CURLOPT_HEADER         => false,    // don't return headers
    CURLOPT_FOLLOWLOCATION => true,     // follow redirects
    CURLOPT_ENCODING       => "",       // handle all encodings
    CURLOPT_AUTOREFERER    => true,     // set referer on redirect
    CURLOPT_CONNECTTIMEOUT => 120,      // timeout on connect
    CURLOPT_TIMEOUT        => 120,      // timeout on response
    CURLOPT_MAXREDIRS      => 10,       // stop after 10 redirects
);

$ch      = curl_init( $url );
curl_setopt_array( $ch, $options );
$content = curl_exec( $ch );
$err     = curl_errno( $ch );
$errmsg  = curl_error( $ch );
$header  = curl_getinfo( $ch );
curl_close( $ch );

$header['errno']   = $err;
$header['errmsg']  = $errmsg;
$header['content'] = $content;
echo $header['content'];
return true;