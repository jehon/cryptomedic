--
-- From: Thierry 23/09/2021
--
--
-- Voici la liste :
-- -          Modifier l’item Thoracic Brace en Thoracic and scoliosis brace
-- Modifier et rajouter
-- -          compensation sole existe déjà il est à 400 takas il faudrait mettre:
-- -          Compensation sole 1 cm     -   400 tk
-- -          Compensation sole 2 cm     -   600 tk
-- -          Compensation sole 3 cm     -   800 tk
-- -          Compensation sole 4 cm     -   1000 tk
-- -          Compensation sole 5 cm     -   1200 tk
-- Rajouter :
-- AFO Walking (child)   _    3485 tk
-- AFO Night (child)     _     3485 tk
-- BAFO Walking (Child)  _  6940 tk
-- UHKAFO (Child) Night  _   4850 tk
ALTER TABLE `bills` ADD `workshop_thoracic_brace_and_scoliosis_brace` INT (11) NOT NULL DEFAULT '0' AFTER `workshop_thoracic_brace`,
ADD `workshop_Compensation_sole_1cm` INT (11) NOT NULL DEFAULT '0' AFTER `workshop_Compensation_sole`,
ADD `workshop_Compensation_sole_2cm` INT (11) NOT NULL DEFAULT '0' AFTER `workshop_Compensation_sole_1cm`,
ADD `workshop_Compensation_sole_3cm` INT (11) NOT NULL DEFAULT '0' AFTER `workshop_Compensation_sole_2cm`,
ADD `workshop_Compensation_sole_4cm` INT (11) NOT NULL DEFAULT '0' AFTER `workshop_Compensation_sole_3cm`,
ADD `workshop_Compensation_sole_5cm` INT (11) NOT NULL DEFAULT '0' AFTER `workshop_Compensation_sole_4cm`,
ADD `workshop_AFO_walking_child` INT (11) NOT NULL DEFAULT '0' AFTER `workshop_AFO_walking`,
ADD `workshop_AFO_night_child` INT (11) NOT NULL DEFAULT '0' AFTER `workshop_AFO_night`,
ADD `workshop_BAFO_walking_child` INT (11) NOT NULL DEFAULT '0' AFTER `workshop_BAFO_walking`,
ADD `workshop_UHKAFO_night_child` INT (11) NOT NULL DEFAULT '0' AFTER `workshop_UHKAFO_night`;

ALTER TABLE `prices` ADD `workshop_thoracic_brace_and_scoliosis_brace` INT (11) NOT NULL DEFAULT '-1' AFTER `workshop_thoracic_brace`,
ADD `workshop_Compensation_sole_1cm` INT (11) NOT NULL DEFAULT '-1' AFTER `workshop_Compensation_sole`,
ADD `workshop_Compensation_sole_2cm` INT (11) NOT NULL DEFAULT '-1' AFTER `workshop_Compensation_sole_1cm`,
ADD `workshop_Compensation_sole_3cm` INT (11) NOT NULL DEFAULT '-1' AFTER `workshop_Compensation_sole_2cm`,
ADD `workshop_Compensation_sole_4cm` INT (11) NOT NULL DEFAULT '-1' AFTER `workshop_Compensation_sole_3cm`,
ADD `workshop_Compensation_sole_5cm` INT (11) NOT NULL DEFAULT '-1' AFTER `workshop_Compensation_sole_4cm`,
ADD `workshop_AFO_walking_child` INT (11) NOT NULL DEFAULT '-1' AFTER `workshop_AFO_walking`,
ADD `workshop_AFO_night_child` INT (11) NOT NULL DEFAULT '-1' AFTER `workshop_AFO_night`,
ADD `workshop_BAFO_walking_child` INT (11) NOT NULL DEFAULT '-1' AFTER `workshop_BAFO_walking`,
ADD `workshop_UHKAFO_night_child` INT (11) NOT NULL DEFAULT '-1' AFTER `workshop_UHKAFO_night`;

UPDATE `prices`
SET
  workshop_thoracic_brace_and_scoliosis_brace = workshop_thoracic_brace,
  workshop_thoracic_brace = -1,
  workshop_Compensation_sole_1cm = 400,
  workshop_Compensation_sole_2cm = 600,
  workshop_Compensation_sole_3cm = 800,
  workshop_Compensation_sole_4cm = 1000,
  workshop_Compensation_sole_5cm = 1200,
  workshop_AFO_walking_child = 3485,
  workshop_AFO_night_child = 3485,
  workshop_BAFO_walking_child = 6940,
  workshop_UHKAFO_night_child = 4850
WHERE
  dateto IS NULL;
