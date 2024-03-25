ALTER TABLE `prices`
ADD `social_level_threshold_1` INT UNSIGNED NOT NULL AFTER `social_level_percentage_0`,
ADD `social_level_threshold_2` INT UNSIGNED NOT NULL AFTER `social_level_threshold_1`,
ADD `social_level_threshold_3` INT UNSIGNED NOT NULL AFTER `social_level_threshold_2`,
ADD `social_level_threshold_4` INT UNSIGNED NOT NULL AFTER `social_level_threshold_3`;

UPDATE prices
SET
  social_level_threshold_1 = 300,
  social_level_threshold_2 = 500,
  social_level_threshold_3 = 1500,
  social_level_threshold_4 = 3000;
