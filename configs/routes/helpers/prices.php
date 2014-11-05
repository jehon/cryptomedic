<?php

function getPriceForDate($date) {
	global $server;

	return $server->getDatabase()->query("
			SELECT * FROM prices
			WHERE (datefrom is null || datefrom < :date)
				AND (dateto is null || dateto >= :date)
		", array('date' => $date));
}