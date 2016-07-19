<?php

	require_once(__DIR__ . "/../vendor/autoload.php");

	// require(__DIR__ . "/../config.php");
  // global $myconfig;

	// \Jehon\Maintenance\TryCatch::run();

	// $db = new \Jehon\Maintenance\Database(
	//  	"mysql:host=" . $myconfig['database']['host'] . ";dbname=" . $myconfig['database']['schema'],
	// 	$myconfig['database']['username'],
	// 	$myconfig['database']['password'],
	// 	[ PDO::MYSQL_ATTR_INIT_COMMAND  => "SET CHARACTER SET 'utf8'" ]
	// );

	// \Jehon\Maintenance\BugReporting::record($db, "http://www.cryptomedic.org/cryptomedic/maintenance/bug_view.php");

	require 'PHPMailerAutoload.php';

	$mail = new PHPMailer();

	// Set PHPMailer to use the sendmail transport
	$mail->isSendmail();
	// //$mail->SMTPDebug = 3;                               // Enable verbose debug output

	// $mail->isSMTP();                                      // Set mailer to use SMTP
	// $mail->Host = 'smtp1.example.com;smtp2.example.com';  // Specify main and backup SMTP servers
	// $mail->SMTPAuth = true;                               // Enable SMTP authentication
	// $mail->Username = 'user@example.com';                 // SMTP username
	// $mail->Password = 'secret';                           // SMTP password
	// $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
	// $mail->Port = 587;                                    // TCP port to connect to

	$mail->setFrom('noreply@cryptomedic.org', 'Bug report');
	$mail->addAddress('marielineetjean+cryptomedic@gmail.com', 'Cryptomedic Maintainer');
	// $mail->addReplyTo('info@example.com', 'Information');
	// $mail->addCC('cc@example.com');

	// $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
	// $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
	$mail->isHTML(true);                                  // Set email format to HTML

	$mail->Subject = 'Bug report';
	$mail->Body    = 'This is the HTML message body <b>in bold!</b>'
  								// . 'Your <b>HTML</b> with an embedded Image: <img src="cid:my-attach"> Here is an image!'
  								;

  // $mail->AddEmbeddedImage("rocks.png", "my-attach", "rocks.png");
  // $mail->AddAttachment('something.zip'); // this is a regular attachment (Not inline)

	// if(!$mail->send()) {
	//     echo 'Message could not be sent.';
	//     echo 'Mailer Error: ' . $mail->ErrorInfo;
	// } else {
	//     echo 'Message has been sent';
	// }
