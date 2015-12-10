<?php 

/**
* Sends transactional emails
*/
class MailManager
{
    
    // Send email
    public static function send($subject, $html)
    {

        $appName = Config::get('app.app_name');
        $from = Config::get('mail.from');
        $to = array(
            array(
                'email' => 'info@stoller.com.br',
                'name' => 'Stoller'
            )
        );

        $message = array(
            'subject' => $appName . ' - ' . $subject,
            'html' => $html,
            'from_email' => $from['address'],
            'from_name' => $from['name'],
            'to' => $to
        );

        $response = Email::messages()->send($message);      

        return $response;
    }
}