<?php

	require_once(__DIR__ . "/../../vendor/autoload.php");

	function getParameter($name, $default = null) {
		if (array_key_exists($name, $_REQUEST)) {
			return $_REQUEST[$name];
		} else {
			if ($default === null) {
				throw new Exception("Could not get key $name");
			} else {
				return $default;
			}
		}
	}

	$bug = [];
	$bug['url']                = getParameter("url");
	$bug['username']           = getParameter("username");
	$bug['email']              = getParameter("email");
	$bug['description']        = getParameter("description");
	$bug['browser_useragent']  = getParameter("browser_useragent");
	$bug['browser_state']      = getParameter("browser_state");
	$bug['browser_console']    = getParameter("browser_console");
	$bug['screenshot']         = getParameter("screenshot");

	use \PHPMailer;

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
	// $mail->addCC($_REQUEST['email']);

	// $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
	// $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
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
				<tr>
					<td>Screenshot</td>
					<td>
						<img src='${bug['screenshot']}'>
  				</td>
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

 	// $bug['screenshot_raw']     = base64_decode(str_replace(' ', '+', $bug['screenshot']));

  // $mail->AddEmbeddedImage("screenshot.png", "my-attach", "rocks.png");
  // $mail->AddAttachment('something.zip'); // this is a regular attachment (Not inline)

	if(!$mail->send()) {
	    echo 'Message could not be sent.';
	    echo 'Mailer Error: ' . $mail->ErrorInfo;
	} else {
	    echo 'Message has been sent';
	}
