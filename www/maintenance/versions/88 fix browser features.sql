ALTER TABLE `browser_features`
CHANGE `browser_uuid` `browser_uuid` VARCHAR(125) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL AFTER `uid`;

ALTER TABLE `browser_features`
CHANGE `uid` `id` INT(10) NOT NULL AUTO_INCREMENT;

ALTER TABLE `browser_features`
DROP INDEX `uid`,
ADD UNIQUE `id` (`id`) USING BTREE;

ALTER TABLE `browser_features`
ADD UNIQUE `browser_uuid` (`browser_uuid`);
