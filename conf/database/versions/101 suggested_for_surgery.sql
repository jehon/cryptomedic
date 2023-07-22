
ALTER TABLE `club_feet`
    ADD `suggestedForSurgery` TINYINT(1) UNSIGNED NOT NULL DEFAULT '0' AFTER `Comments`;

ALTER TABLE `other_consults`
    ADD `suggestedForSurgery` TINYINT(1) UNSIGNED NOT NULL DEFAULT '0' AFTER `Comments`;

ALTER TABLE `ricket_consults`
    ADD `suggestedForSurgery` TINYINT(1) UNSIGNED NOT NULL DEFAULT '0' AFTER `Comments`;


UPDATE `ricket_consults` 
    SET suggestedForSurgery = 1
    WHERE Surgery is not null and surgery > ""

ALTER TABLE `ricket_consults` 
    DROP `Surgery`;
