<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

class FCMController extends Controller
{
    public static function send($device = '', $title = '', $message = '')
    {
        $convert_device = '["' . $device . '"]';
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://fcm.googleapis.com/fcm/send',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => '{
  "registration_ids": ' . $convert_device . ',
  "notification": {
      "title":"' . $title . '",
      "body":"' . $message . '"
  }
}',
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
                'Authorization: key=AAAA9ZOyalw:APA91bH_QpeZ0sfpeMvo89IS9KsYIsVQlD7TqHgPCLQBKFnq4yz5jnqgdRyU3V3rFrTWbnGJaZOM7oFMcxxiBhwSODf1WDGSXPxpFQISiPxABeeK3lcsO3okyB_zCCBbiFyIj8yYSb9n'
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);

        echo $response;
    }
}
