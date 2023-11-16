ALTER TABLE `bills` ADD `workshop_other` INT (11) NOT NULL DEFAULT '0' AFTER `workshop_Extension_brace_-_AFO`;

ALTER TABLE `prices` ADD `workshop_other` INT (11) NOT NULL DEFAULT '-1' AFTER `workshop_Extension_brace_-_AFO`;

UPDATE prices
SET
  workshop_other = 0
WHERE
  id = (
    SELECT
      MAX(id)
    FROM
      (
        SELECT
          id
        FROM
          prices
      ) t
  );
