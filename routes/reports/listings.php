<?php
	if ($request->routeIsEnded()) {
?>
<table>
    <thead>
        <tr>
            <td>Listing</td>
            <td>Value</td>
            <td>Reference</td>
            <td>English</td>
            <td>French</td>
    </thead>
    <tbody>
        <?php
            $labels = $server->getDatabase()->getTable("labels");
            foreach(References::$lists as $name => $l) {
                foreach($l as $i => $k) {
                    if ($i === "labels") continue;
                    echo "<tr>";
                    echo "<td>$name</td>";
                    echo "<td>$k</td>";
                    if (array_key_exists("labels", $l) && $l['labels']) {
                        $rec = $labels->rowGet($k);
                        if ($rec) {
                            echo "<td>{$rec['reference']}</td>";
                            echo "<td>{$rec['english']}</td>";
                            echo "<td>{$rec['french']}</td>";                            
                        } else {
                            echo "<td colspan=3>Label not found</td>";
                        }
                    } else {
                        echo "<td colspan=3>no labels</td>";
                    }
                    echo "</tr>\n";

                }
            }
        ?>
    </tbody>
</table>

<?php
	} else {
		// References::$lists["Districts"] = References::buildValueList([ "Chittagong", "Cox's Bazar", "~ Other ~" ]);
		
		$list = $request->routeGetNext();
		if (array_key_exists($list, References::$lists)) {
			$l = References::$lists[$list];
			var_dump($l);
			echo 'References::$lists["' . $list . '"] = References::buildValueList(["' . implode('", "', array_values($l)) . '"]);';
		} else {
			echo "List does not exists: $list";
		}
	}
	
    $response->ok();
