ALTER TABLE  `surgeries` CHANGE  `Date`  `Date` DATE NULL DEFAULT NULL ;

ALTER TABLE  `surgery_followups` CHANGE  `Date`  `Date` DATE NOT NULL DEFAULT  '0000-00-00';
ALTER TABLE  `surgeries` CHANGE  `Date`  `Date` DATE NOT NULL DEFAULT  '0000-00-00';
ALTER TABLE  `ricket_consults` CHANGE  `Date`  `Date` DATE NOT NULL DEFAULT  '0000-00-00';
ALTER TABLE  `pictures` CHANGE  `Date`  `Date` DATE NOT NULL DEFAULT  '0000-00-00';
ALTER TABLE  `orthopedic_devices` CHANGE  `Date`  `Date` DATE NOT NULL DEFAULT  '0000-00-00';
ALTER TABLE  `nonricket_consults` CHANGE  `Date`  `Date` DATE NOT NULL DEFAULT  '0000-00-00';
ALTER TABLE  `club_foots` CHANGE  `Date`  `Date` DATE NOT NULL DEFAULT  '0000-00-00';
ALTER TABLE  `bills` CHANGE  `Date`  `Date` DATE NOT NULL DEFAULT  '0000-00-00';
