<html>
<?php

if (!defined("REST_LOADED")) die("Ca va pas la tête?");

class StorageCreateError extends HttpInternalError {};
class StorageNotAllowed extends HttpNotFound {};

$type = $request->routeConsumeNext();
$id = $request->routeConsumeNext();

$fileDB = $server->getDatabase()->getTable($type);

$storage = $server->getConfig($type . ".storage");
$uri = $server->getConfig($type . ".url");

if (!$fileDB->isColumn("file")) throw new StorageNotAllowed("No 'file' column in table $type");

$rec = $fileDB->rowGet($id);

$maxUploadSizeMb = min(
		(int) ini_get('upload_max_filesize'), 
		(int) (ini_get('post_max_size') * 0.90), 
		(int) (ini_get('memory_limit') * 0.5)
	);

// if (array_key_exists('maxSize', $upload))
// 	$maxUploadSizeMb = min($maxUploadSizeMb, $upload['maxSize']);

if (!$rec['file']) {
	if (count($_FILES) == 1) {
		if (!array_key_exists('fileContent', $_FILES)) throw new HttpInvalidData("file['fileContent'] not received");

		$fileContent = $_FILES['fileContent'];
		if ($fileContent['size'] < 1) throw new HttpInvalidData("File is empty or file was too big");

		if (strrpos($fileContent['name'], '.')) {
			$ext = substr($fileContent['name'], strrpos($fileContent['name'], '.') + 1);
		} else {
			$ext = "png";
		}
		$tname = $id . "." . $ext;
		$tfile = $storage . DIRECTORY_SEPARATOR . $tname;
		debugHeader("SAVING-FILE", $tfile);

		if (file_exists($tfile)) {
			var_dump("ok, that's it: $tfile");
			throw new StorageCreateError("Moving uploaded file: already exists");
		}

		if (!move_uploaded_file($fileContent['tmp_name'], $tfile)) {
			throw new StorageCreateError("Moving uploaded file");
		}

		$data = array('id' => $id, 'file' => $tname, 'OriginalName' => $fileContent['name']);

		$fileDB->rowUpdate($data);

		$rec['file'] = $tname;
		$response->ok();
	} else {
		?>
			<form enctype="multipart/form-data" method="post">
				<input type="file" name="fileContent">
				<input type="submit" value="Send">
			</form>
			<i>Max upload size: <?php echo $maxUploadSizeMb; ?>Mb</i><br>
		<?php
		throw new HttpAlreadyDone("no files");
	}
}

if ($rec['file']) {
	$filepath = $storage . DIRECTORY_SEPARATOR . $rec['file'];
	if (file_exists($filepath) && $rec['file'] && $storage) {
		echo "<img width='100%' src='" . $uri . "/" . $rec['file'] . "'>";
	} else {
		echo "File has dissapeared from the system: " . $rec['file'];
	}
	$response->ok();
}
