
-- If updated_at is null, greatest(created_at, updated_at) is null and sync does not work
ALTER TABLE `bills` CHANGE `updated_at` `updated_at` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00';
ALTER TABLE `club_foots` CHANGE `updated_at` `updated_at` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00';
ALTER TABLE `deleteds` CHANGE `updated_at` `updated_at` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00';
ALTER TABLE `nonricket_consults` CHANGE `updated_at` `updated_at` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00';
ALTER TABLE `patients` CHANGE `updated_at` `updated_at` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00';
ALTER TABLE `pictures` CHANGE `updated_at` `updated_at` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00';
ALTER TABLE `prices` CHANGE `updated_at` `updated_at` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00';
ALTER TABLE `rendez_vous` CHANGE `updated_at` `updated_at` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00';
ALTER TABLE `ricket_consults` CHANGE `updated_at` `updated_at` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00';
ALTER TABLE `settings` CHANGE `updated_at` `updated_at` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00';
ALTER TABLE `surgeries` CHANGE `updated_at` `updated_at` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00';
ALTER TABLE `sync_computers` CHANGE `updated_at` `updated_at` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00';
ALTER TABLE `sync_keys` CHANGE `updated_at` `updated_at` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00';
ALTER TABLE `users` CHANGE `updated_at` `updated_at` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00';

-- Other fix
ALTER TABLE `settings` CHANGE `created_at` `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
