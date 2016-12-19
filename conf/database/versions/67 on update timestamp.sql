
ALTER TABLE `appointments`
  CHANGE `created_at` `created_at` TIMESTAMP NULL DEFAULT NULL,
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `bills`
  CHANGE `created_at` `created_at` TIMESTAMP NULL DEFAULT NULL,
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `club_feet`
  CHANGE `created_at` `created_at` TIMESTAMP NULL DEFAULT NULL,
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `deleteds`
  CHANGE `created_at` `created_at` TIMESTAMP NULL DEFAULT NULL,
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `other_consults`
  CHANGE `created_at` `created_at` TIMESTAMP NULL DEFAULT NULL,
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `patients`
  CHANGE `created_at` `created_at` TIMESTAMP NULL DEFAULT NULL,
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `pictures`
  CHANGE `created_at` `created_at` TIMESTAMP NULL DEFAULT NULL,
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `prices`
  CHANGE `created_at` `created_at` TIMESTAMP NULL DEFAULT NULL,
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `ricket_consults`
  CHANGE `created_at` `created_at` TIMESTAMP NULL DEFAULT NULL,
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `settings`
  CHANGE `created_at` `created_at` TIMESTAMP NULL DEFAULT NULL,
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `surgeries`
  CHANGE `created_at` `created_at` TIMESTAMP NULL DEFAULT NULL,
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `sync_computers`
  CHANGE `created_at` `created_at` TIMESTAMP NULL DEFAULT NULL,
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `sync_keys`
  CHANGE `created_at` `created_at` TIMESTAMP NULL DEFAULT NULL,
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `users`
  CHANGE `created_at` `created_at` TIMESTAMP NULL DEFAULT NULL,
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';
