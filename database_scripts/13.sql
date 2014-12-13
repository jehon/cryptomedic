-- Restructuration of bills groups

ALTER TABLE `bills` CHANGE `consult_calcium_30x500mg` `medecine_calcium_30x500mg` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `bills` CHANGE `consult_group_physiotherapy` `other_group_physiotherapy` INT(11) NOT NULL DEFAULT '0';

ALTER TABLE `bills` CHANGE `consult_make_long_plaster` `other_make_long_plaster` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `bills` CHANGE `consult_make_short_plaster` `other_make_short_plaster` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `bills` CHANGE `consult_making_dressing` `other_making_dressing` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `bills` CHANGE `consult_making_plaster` `other_making_plaster` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `bills` CHANGE `consult_medecine` `medecine_medecine` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `bills` CHANGE `consult_nutritionalAdvice` `other_nutritionalAdvice` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `bills` CHANGE `consult_nutritionalSupport` `other_nutritionalSupport` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `bills` CHANGE `consult_Other_consultation_care` `other_Other_consultation_care` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `bills` CHANGE `consult_physiotherapy` `other_physiotherapy` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `bills` CHANGE `consult_vitamineD` `medecine_vitamineD` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `bills` CHANGE `consult_X_Ray` `other_X_Ray` INT(11) NOT NULL DEFAULT '0';






























































ALTER TABLE `prices` CHANGE `consult_calcium_30x500mg` `medecine_calcium_30x500mg` INT(11) NULL DEFAULT '-1';





ALTER TABLE `prices` CHANGE `consult_group_physiotherapy` `other_group_physiotherapy` INT(11) NULL DEFAULT '-1';

ALTER TABLE `prices` CHANGE `consult_make_long_plaster` `other_make_long_plaster` INT(11) NULL DEFAULT '-1';
ALTER TABLE `prices` CHANGE `consult_make_short_plaster` `other_make_short_plaster` INT(11) NULL DEFAULT '-1';
ALTER TABLE `prices` CHANGE `consult_making_dressing` `other_making_dressing` INT(11) NULL DEFAULT '-1';
ALTER TABLE `prices` CHANGE `consult_making_plaster` `other_making_plaster` INT(11) NULL DEFAULT '-1';
ALTER TABLE `prices` CHANGE `consult_medecine` `medecine_medecine` INT(11) NULL DEFAULT '-1';
ALTER TABLE `prices` CHANGE `consult_nutritionalAdvice` `other_nutritionalAdvice` INT(11) NULL DEFAULT '-1';
ALTER TABLE `prices` CHANGE `consult_nutritionalSupport` `other_nutritionalSupport` INT(11) NULL DEFAULT '-1';
ALTER TABLE `prices` CHANGE `consult_Other_consultation_care` `other_Other_consultation_care` INT(11) NULL DEFAULT '-1';
ALTER TABLE `prices` CHANGE `consult_physiotherapy` `other_physiotherapy` INT(11) NULL DEFAULT '-1';
ALTER TABLE `prices` CHANGE `consult_vitamineD` `medecine_vitamineD` INT(11) NULL DEFAULT '-1';
ALTER TABLE `prices` CHANGE `consult_X_Ray` `other_X_Ray` INT(11) NULL DEFAULT '-1';






























































