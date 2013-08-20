<?php 
	$this->kdm->reportFileName("patient-report-" . $this->data['Patient']['entryyear'] . "-" . $this->data['Patient']['entryorder']);
	$this->kdm->reportBegin();
	
	$data = $this->data;
	
	$this->kdm->reportHeader("Patient file");
	$this->kdm->reportLine(array_keys($data['Patient']));
	$this->kdm->reportLine($this->kdm->textualizeObject($data['Patient']));
	unset($data['Patient']);
	
	foreach($data as $model => $list) {
		if (is_array($list)) {
			if (count($list) > 0) {
				$this->kdm->reportHeader("$model files");
				$this->kdm->reportLine(array_keys($list[0]));
				foreach($list as $i => $value) {
					$this->kdm->reportLine($this->kdm->textualizeObject($value));
				}
				$this->kdm->reportHeader("***");
			}
		}
	}
	$this->kdm->reportEnd();

	if ($this->kdm->format == "") {
        ?>
            <div>
                Hello. You are viewing this file, and why not...<br>
                But you are not supposed to.<br>
                Please click on this link: <a href='#read'>here</a>
            </div>
            <script>
                console.log("going to read (from details in patient.ctp)");
                if (window.location.hash == "")
                    window.location.hash = "#read";
            </script>
        <?
	}
?>