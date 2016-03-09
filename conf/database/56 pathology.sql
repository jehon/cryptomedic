
ALTER TABLE `patients` ADD `Pathology` VARCHAR(20) NULL DEFAULT NULL AFTER `Union_`, ADD INDEX (`Pathology`) ;

UPDATE `patients`
  SET Pathology = 'Ricket'
  WHERE Pathology is NULL and pathology_Ricket > 0;

UPDATE `patients`
  SET Pathology = 'ClubFoot'
  WHERE Pathology is NULL and pathology_Clubfoot > 0;

UPDATE `patients`
  SET Pathology = 'Other'
  WHERE Pathology is NULL and pathology_other > 0;

UPDATE `patients`
  SET Pathology = 'Adult Physio'
  WHERE Pathology is NULL and pathology_Adult > 0;

UPDATE `patients`
  SET Pathology = 'Cerebral Palsy'
  WHERE Pathology is NULL and pathology_CP > 0;

UPDATE `patients`
  SET Pathology = 'Polio'
  WHERE Pathology is NULL and pathology_Polio > 0;

UPDATE `patients`
  SET Pathology = 'Burn retraction'
  WHERE Pathology is NULL and pathology_Burn > 0;

UPDATE `patients`
  SET Pathology = 'Congenital'
  WHERE Pathology is NULL and pathology_Congenital > 0;

UPDATE `patients`
  SET Pathology = 'Other'
  WHERE Pathology is NULL;
