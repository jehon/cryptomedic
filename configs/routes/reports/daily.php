<?php

require_once(__DIR__ . "/../helpers/getFolder.php");
require_once(__DIR__ . "/../../amd_listings.php");
require_once(__DIR__ . "/../helpers/references.php");

$response->data = array();
$response->formParameters = array(
        "when" => array(
            "text" => "Enther the day",
            "type" => "date",
            "default" => date("Y-m-d")
            ),
        "who" => array(
            "text" => "Enter the physio",
            "default" => "2"
            ),
        "where" => array(
            "text" => "Enther the center",
            "default" => "200",
            "list" => buildLinkedList($amd_listing['Centers'])
            ),
    );

// TODOJH: set parameters
$day = $request->getParameter("when", "todojh");
$who = $request->getParameter("who", "todojh");
$where = $request->getParameter("where", "todojh");

$response->addLine();
$response->addCell("SARPV - AMD - KDM");

$response->addLine();
$response->addCell("Name of project: Ricktes in cox's Bazar", [ "colspan" => 5 ]);
$response->addCell("When");
$response->addCell($day);
$response->addCell("");

$response->addLine();
$response->addCell("SARPV, CHAKARIA DISABILITY CENTER, CHAKARIA, COX'S BAZAR", [ "colspan" => 5 ]);
$response->addCell("Who");
$response->addCell($who);
$response->addCell("");
$response->addCell("");
$response->addCell("Levels of the social level", [ "colspan" => 4 ]);

$response->addLine();
$response->addCell("Daily report of " . $day, [ "colspan" => 5 ]);
$response->addCell("Where");
$response->addCell(unreference("Bill", "Center", $where));
$response->addCell("");
$response->addCell("");
$response->addCell("todojh");        
$response->addCell("todojh");        
$response->addCell("todojh");        
$response->addCell("todojh");        

$response->addLine();
$response->addCell("");
$response->addCell("");
$response->addCell("");
$response->addCell("");
$response->addCell("Identity", [ "colspan" => 5 ]);
$response->addCell("SEL", [ "colspan" => 4 ]);
$response->addCell("Medical", [ "colspan" => 3 ]);
$response->addCell("Price", [ "colspan" => 6 ]);

$response->addLine();
$response->addCell("N#");
$response->addCell("Date");
$response->addCell("Physio");
$response->addCell("Place");
$response->addCell("Record n#");

$response->addCell("Patient name");
$response->addCell("Age");
$response->addCell("M/F");
$response->addCell("New/Old");
$response->addCell("Tk income");
$response->addCell("Nb pers");
$response->addCell("Tk per pers");
$response->addCell("SL");

$response->addCell("Diagno");
$response->addCell("Act");
$response->addCell("Trt");

$response->addCell("Consult");
$response->addCell("Medicine");
$response->addCell("Others");
$response->addCell("Full");
$response->addCell("Asked");
$response->addCell("Payed");
