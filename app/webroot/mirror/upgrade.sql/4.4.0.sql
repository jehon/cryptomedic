
-- Surgery.diagnostic = varchar
ALTER TABLE `surgeries` CHANGE `ReportDiagnostic` `ReportDiagnostic` VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;
