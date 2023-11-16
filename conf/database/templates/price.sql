-- add fields
ALTER TABLE `bills` ADD `other_physiotherapy_child` INT (11) NOT NULL DEFAULT '0' AFTER `other_group_physiotherapy`;

ALTER TABLE `prices` ADD `other_physiotherapy_child` INT (11) NOT NULL DEFAULT '-1' AFTER `other_group_physiotherapy`;

-- modification to prices elements
UPDATE `prices`
SET
  other_physiotherapy_child = 100;

WHERE
  dateto is NULL;
