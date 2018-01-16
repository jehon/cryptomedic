<?php
require_once(__DIR__ . "/vendor/autoload.php");

function getParameter($name, $default = "") {
	if (array_key_exists($name, $_REQUEST)) {
		return $_REQUEST[$name];
	} else {
		return $default;
	}
}

$bug = [];
$bug['username']           = getParameter("username");
$bug['email']              = getParameter("email");
$bug['url']                = getParameter("url");
$bug['description']        = getParameter("description");
$bug['computer_id']        = getParameter("computer_id");
$bug['screenshot']         = getParameter("screenshot");
$bug['browser_useragent']  = getParameter("browser_useragent");
$bug['browser_state']      = getParameter("browser_state");

use PHPMailer\PHPMailer\PHPMailer;

$mail = new PHPMailer();

// Set PHPMailer to use the sendmail transport
$mail->isSendmail();
$mail->setFrom('noreply@cryptomedic.org', 'Bug report');
$mail->addAddress('marielineetjean+cryptomedic@gmail.com', 'Cryptomedic Maintainer');
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Bug report';
$mail->Body    = <<<EOMAIL
  <style>
  	table {
		border-collapse: collapse;
		}

		table, th, td {
		    border: 1px solid black;
		}
  </style>
	<table>
			<cols>
				<col width='200px'/>
				<col/>
			</cols>
			<tr>
				<td>URL</td>
				<td>{$bug['url']}</td>
			</tr>
			<tr>
				<td>Username</td>
				<td>${bug['username']}</td>
			</tr>
			<tr>
				<td>Email</td>
				<td>${bug['email']}</td>
			</tr>
			<tr>
				<td>Description</td>
				<td><pre>${bug['description']}</pre></td>
			</tr>
			<tr>
				<td>Browser User-Agent</td>
				<td>${bug['browser_useragent']}</td>
			</tr>
		</table>
EOMAIL;

$mail->AddStringAttachment($bug['browser_state'], "browser_state.json");
$mail->AddStringAttachment($bug['browser_console'], "browser_console.json");


$img = $_REQUEST['screenshot'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$fileData = base64_decode($img);
$mail->AddStringAttachment($fileData, "screenshot.png");

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}
