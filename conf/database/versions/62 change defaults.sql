
SET SQL_MODE='ALLOW_INVALID_DATES';

ALTER TABLE `users` CHANGE `updated_at` `updated_at` TIMESTAMP NULL;
ALTER TABLE `patients` CHANGE `updated_at` `updated_at` TIMESTAMP NULL;

ALTER TABLE `appointments`
  CHANGE `updated_at` `updated_at` TIMESTAMP NULL,
  CHANGE `Date` `Date` DATE NULL;

ALTER TABLE `bills`
  CHANGE `updated_at` `updated_at` TIMESTAMP NULL,
  CHANGE `Date` `Date` DATE NULL;

ALTER TABLE `club_feet`
  CHANGE `updated_at` `updated_at` TIMESTAMP NULL,
  CHANGE `Date` `Date` DATE NULL;

ALTER TABLE `other_consults`
  CHANGE `updated_at` `updated_at` TIMESTAMP NULL,
  CHANGE `Date` `Date` DATE NULL;

ALTER TABLE `patients`
  CHANGE `updated_at` `updated_at` TIMESTAMP NULL;

ALTER TABLE `pictures`
  CHANGE `updated_at` `updated_at` TIMESTAMP NULL,
  CHANGE `Date` `Date` DATE NULL;

ALTER TABLE `prices`
  CHANGE `updated_at` `updated_at` TIMESTAMP NULL;

ALTER TABLE `ricket_consults`
  CHANGE `updated_at` `updated_at` TIMESTAMP NULL,
  CHANGE `Date` `Date` DATE NULL;

ALTER TABLE `settings`
  CHANGE `updated_at` `updated_at` TIMESTAMP NULL;

ALTER TABLE `surgeries`
  CHANGE `updated_at` `updated_at` TIMESTAMP NULL,
  CHANGE `Date` `Date` DATE NULL;

ALTER TABLE `sync_computers`
  CHANGE `updated_at` `updated_at` TIMESTAMP NULL;

ALTER TABLE `sync_keys`
  CHANGE `updated_at` `updated_at` TIMESTAMP NULL;


UPDATE `appointments` SET created_at = '1980-01-01' Where created_at = '0000-00-00 00:00:00';
UPDATE `appointments` SET updated_at = NULL Where updated_at = '0000-00-00 00:00:00';
UPDATE `appointments` SET Date = NULL Where Date = '0000-00-00 00:00:00';

UPDATE `bills` SET created_at = '1980-01-01' Where created_at = '0000-00-00 00:00:00';
UPDATE `bills` SET updated_at = NULL Where updated_at = '0000-00-00 00:00:00';
UPDATE `bills` SET Date = NULL Where Date = '0000-00-00 00:00:00';

UPDATE `club_feet` SET created_at = '1980-01-01' Where created_at = '0000-00-00 00:00:00';
UPDATE `club_feet` SET updated_at = NULL Where updated_at = '0000-00-00 00:00:00';
UPDATE `club_feet` SET Date = NULL Where Date = '0000-00-00 00:00:00';

UPDATE `other_consults` SET created_at = '1980-01-01' Where created_at = '0000-00-00 00:00:00';
UPDATE `other_consults` SET updated_at = NULL Where updated_at = '0000-00-00 00:00:00';
UPDATE `other_consults` SET Date = NULL Where Date = '0000-00-00 00:00:00';

UPDATE `patients` SET created_at = '1980-01-01' Where created_at = '0000-00-00 00:00:00';
UPDATE `patients` SET updated_at = NULL Where updated_at = '0000-00-00 00:00:00';

UPDATE `pictures` SET created_at = '1980-01-01' Where created_at = '0000-00-00 00:00:00';
UPDATE `pictures` SET updated_at = NULL Where updated_at = '0000-00-00 00:00:00';
UPDATE `pictures` SET Date = NULL Where Date = '0000-00-00 00:00:00';

UPDATE `prices` SET created_at = '1980-01-01' Where created_at = '0000-00-00 00:00:00';
UPDATE `prices` SET updated_at = NULL Where updated_at = '0000-00-00 00:00:00';

UPDATE `ricket_consults` SET created_at = '1980-01-01' Where created_at = '0000-00-00 00:00:00';
UPDATE `ricket_consults` SET updated_at = NULL Where updated_at = '0000-00-00 00:00:00';
UPDATE `ricket_consults` SET Date = NULL Where Date = '0000-00-00 00:00:00';

UPDATE `settings` SET created_at = '1980-01-01' Where created_at = '0000-00-00 00:00:00';
UPDATE `settings` SET updated_at = NULL Where updated_at = '0000-00-00 00:00:00';

UPDATE `surgeries` SET created_at = '1980-01-01' Where created_at = '0000-00-00 00:00:00';
UPDATE `surgeries` SET updated_at = NULL Where updated_at = '0000-00-00 00:00:00';
UPDATE `surgeries` SET Date = NULL Where Date = '0000-00-00';

UPDATE `sync_computers` SET created_at = '1980-01-01' Where created_at = '0000-00-00 00:00:00';
UPDATE `sync_computers` SET updated_at = NULL Where updated_at = '0000-00-00 00:00:00';

UPDATE `sync_keys` SET created_at = '1980-01-01' Where created_at = '0000-00-00 00:00:00';
UPDATE `sync_keys` SET updated_at = NULL Where updated_at = '0000-00-00 00:00:00';
