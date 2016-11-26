
ALTER TABLE `appointments`
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `bills`
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `club_feet`
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `deleteds`
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `other_consults`
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `patients`
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `pictures`
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `prices`
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `ricket_consults`
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `settings`
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `surgeries`
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `sync_computers`
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `sync_keys`
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';

ALTER TABLE `users`
  CHANGE `updated_at` `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT '1980-1-1';
