
ALTER TABLE `browser_features`
    CHANGE `browser_uuid` `browser_uuid` VARCHAR(125) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL AFTER `uid`;

ALTER TABLE `cryptomedic`.`browser_features`
    ADD PRIMARY KEY (`browser_uuid`);

ALTER TABLE `browser_features`
    DROP INDEX `uid`;

ALTER TABLE `browser_features`
    DROP `uid`;
