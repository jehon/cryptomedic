
ALTER TABLE `surgeries` CHANGE `ReportSideR` `report_side_right` TINYINT(1) NULL DEFAULT NULL;
ALTER TABLE `surgeries` CHANGE `ReportSideL` `report_side_left` TINYINT(1) NULL DEFAULT NULL;

-- To handle:
--
--    club_feet <= check after
--    ricket_consults <= check after
--
