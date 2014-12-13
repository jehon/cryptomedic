
-- change other into checkbox

ALTER TABLE `patients` ADD `pathology_other2` TINYINT(1) NOT NULL DEFAULT '0' AFTER `pathology_other`;

update patients set pathology_other2 = 1 where trim(pathology_other) > "";

update patients set pathology_other = "" where trim(pathology_other) = "1";

update patients set pathology_other = "" where trim(pathology_other) = "X";

update patients set pathology_other = "" where trim(pathology_other) = "?";

update patients set historyofcomplaint = concat(pathology_other, "\n", historyofcomplaint)
    where trim(pathology_other) > "";

ALTER TABLE `patients` DROP `pathology_other`;

ALTER TABLE `patients` CHANGE `pathology_other2` `pathology_other` TINYINT(1) NOT NULL DEFAULT '0';
