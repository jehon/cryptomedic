ALTER TABLE `surgeries`
CHANGE `ReportSurgeon` `report_surgeon` VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `surgeries`
CHANGE `FollowUpComplication` `follow_up_complication` MEDIUMTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE `surgeries`
CHANGE `ReportDiagnostic` `report_diagnostic` VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;
