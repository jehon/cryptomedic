<?php

namespace Cryptomedic\Lib;

define('MODEL_TO_DB', array(
    "Bill"             => "bills",
    "ClubFoot"         => "club_feet",
    "OtherConsult"     => "other_consults",
    "Patient"          => "patients",
    "Picture"          => "pictures",
    "Appointment"      => "appointments",
    "RicketConsult"    => "ricket_consults",
    "Surgery"          => "surgeries",
    "Payment"          => "payments",
));

/****************************/
/**** Dynamic references ****/
/****************************/

// // Dynamic examiner names
    // $list = [];
    // $examiners = DB::select("SELECT username, `name`, codage, inExaminerList FROM users");
    // foreach($examiners as $examiner) {
    //   $ec = References::withCode($examiner->name, $examiner->codage);
    //   if ($examiner->inExaminerList > 0) {
    //     $list[] = $ec;
    //   }
    // }
    // References::$lists["Examiner"] = References::buildValueList($list);
