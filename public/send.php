<?php
require_once __DIR__ .'/vendor/autoload.php';

define('APPLICATION_NAME', 'Gmail API PHP Quickstart');
define('CREDENTIALS_PATH', '~/.credentials/gmail-php-quickstart.json');
define('CLIENT_SECRET_PATH', __DIR__ . '/client_secret.json');
// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/gmail-php-quickstart.json
define('SCOPES', Google_Service_Gmail::MAIL_GOOGLE_COM);

date_default_timezone_set('Europe/Helsinki'); // Prevent DateTime tz exception
//if (php_sapi_name() != 'cli') {
//    throw new Exception('This application must be run on the command line.');
//}

/**
 * Returns an authorized API client.
 * @return Google_Client the authorized client object
 */
function getClient() {
    $client = new Google_Client();
    $client->setApplicationName(APPLICATION_NAME);
    $client->setScopes(SCOPES);
    $client->setAuthConfig(CLIENT_SECRET_PATH);
    $client->setAccessType('offline');

    // Load previously authorized credentials from a file.

    $credentialsPath = expandHomeDirectory(CREDENTIALS_PATH);
    if (file_exists($credentialsPath)) {
        $accessToken = json_decode(file_get_contents($credentialsPath), true);
    } else {
        // Request authorization from the user.
        $authUrl = $client->createAuthUrl();
        printf("Open the following link in your browser:\n%s\n", $authUrl);
        print 'Enter verification code: ';
        $authCode = trim(fgets(STDIN));

        // Exchange authorization code for an access token.
        $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);

        // Store the credentials to disk.
        if(!file_exists(dirname($credentialsPath))) {
            mkdir(dirname($credentialsPath), 0700, true);
        }
        file_put_contents($credentialsPath, json_encode($accessToken));
        printf("Credentials saved to %s\n", $credentialsPath);
    }
    $client->setAccessToken($accessToken);

    // Refresh the token if it's expired.
    if ($client->isAccessTokenExpired()) {
        $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
        file_put_contents($credentialsPath, json_encode($client->getAccessToken()));
    }
    return $client;
}

/**
 * Expands the home directory alias '~' to the full path.
 * @param string $path the path to expand.
 * @return string the expanded path.
 */
function expandHomeDirectory($path) {
    $homeDirectory = getenv('HOME');
    if (empty($homeDirectory)) {
        $homeDirectory = getenv('HOMEDRIVE') . getenv('HOMEPATH');
    }
    return str_replace('~', realpath($homeDirectory), $path);
}
try {
    $client = getClient();
    $service = new Google_Service_Gmail($client);

    $raw_message = "from:romanrimskiy234324@gmail.com\r\n";
    $raw_message .= "To:" . $_POST['email'] . "\r\n";
    $raw_message .= "Subject: Api\r\n";
//
//// Set the right MIME & Content type
    $raw_message .= "MIME-Version: 1.0\r\n";
    $raw_message .= "Content-Type: text/html; charset=utf-8\r\n";
    $raw_message .= 'Content-Transfer-Encoding: quoted-printable' . "\r\n\r\n";
    $raw_message .= $_POST['name'] . $_POST['phone'] . $_POST['comment'];

    $mime = rtrim(strtr(base64_encode($raw_message), '+/', '-_'), '=');
    $message = new Google_Service_Gmail_Message();
    $message->setRaw($mime);
//var_dump($service->users->getProfile('me'));die;

    $response = $service->users_messages->send('me', $message);
    echo(json_encode($_POST));
}
catch (Exception $e){
    $liqPayLink = [];
    $liqPayLink['liqPayLink']= true;
    echo(json_encode($liqPayLink));
}
