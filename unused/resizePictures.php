<?php 
	die("TODO: Not implemented");
	
	if (!defined("REST_LOADED")) { 
	        throw new Exception("Ca va pas la tete?"); 
	}
?>

<table class='reporting' style='width: 100%'>
<tr>
	<th>#</th>
	<th>Filename</th>
	<th>Size</th>
	<th>status</th>
	<th>?</th>
	<th>Work number</th>
</tr>
<?php
	$it = 0;
	$if = 0;
	foreach(MyFiles::glob($server->getConfig("pictures.storage") . "/*", false) as $filename) {
		$if++;
		echo "<tr><td>";
		echo $if;
		echo "</td><td>";
		echo $filename;
		echo "</td><td>";
		echo filesize($filename);
		echo "</td><td>";
		if (filesize($filename) < 200 * 1024) {
			echo "ok";
			echo "</td><td>";
			echo "</td><td>";
		} else {
			$it++;
			if ($it < 5) {
				// chrome-extension://mlilmganaobieaclflbciblffhaagnip/index.html#l=function.imagecopyresampled.html)
				
				// Get new dimensions
				list($width_orig, $height_orig) = getimagesize($filename);
				$schrink = sqrt(floatval($width_orig) * floatval($height_orig) / (200 * 1024));
				
				if ($schrink > 1) {
					echo floor($schrink*100) / 100;
					echo "</td><td>";
					$tname = pathinfo($filename, PATHINFO_DIRNAME) . DIRECTORY_SEPARATOR . pathinfo($filename, PATHINFO_FILENAME) . ".jpg";
						
					$width = $width_orig / $schrink;
					$height = $height_orig / $schrink;
					
					// Resample
					$image_p = imagecreatetruecolor(floor($width), floor($height));
					$image = imagecreatefromjpeg($filename);
					imagecopyresampled($image_p, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);

					// TODO: change in DB also: extension is changing --> so will be it in database !!!
					// TODO: build the name based on database (patient_id*date*picture_id)
					
					// Remove old one
					if (!unlink($filename)) {
						echo "problem when deleting";
					
					} else {
						echo "deleted";
					}
					echo "</td><td>";
					// Output
					$res = imagejpeg($image_p, $tname);
					
					echo ($res ? "ok" : "ko");
					$image_p = null;
					$image = null;
				} else {
					echo "No resampling possible: " . $schrink;
					echo "</td><td>";
					echo "</td><td>";
				}

			} else {
				echo "skipping";
				echo "</td><td>";
				echo "</td><td>";
			}
			echo "</td><td>";
			echo "[$it]";
		}
		echo "</td></tr>\n";	
	}
?>
</table>
