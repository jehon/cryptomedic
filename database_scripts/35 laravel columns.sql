ALTER TABLE `bills` 
	ADD `created_at` TIMESTAMP NOT NULL AFTER `created`, 
	ADD `updated_at` TIMESTAMP NOT NULL AFTER `created_at`;
	
ALTER TABLE `club_foots` 
	ADD `created_at` TIMESTAMP NOT NULL AFTER `created`, 
	ADD `updated_at` TIMESTAMP NOT NULL AFTER `created_at`;
	
ALTER TABLE `deleted` 
	ADD `created_at` TIMESTAMP NOT NULL AFTER `modified`, 
	ADD `updated_at` TIMESTAMP NOT NULL AFTER `created_at`;
	
ALTER TABLE `nonricket_consults` 
	ADD `created_at` TIMESTAMP NOT NULL AFTER `created`, 
	ADD `updated_at` TIMESTAMP NOT NULL AFTER `created_at`;
	
ALTER TABLE `patients` 
	ADD `created_at` TIMESTAMP NOT NULL AFTER `created`, 
	ADD `updated_at` TIMESTAMP NOT NULL AFTER `created_at`;

ALTER TABLE `pictures` 
	ADD `created_at` TIMESTAMP NOT NULL AFTER `created`, 
	ADD `updated_at` TIMESTAMP NOT NULL AFTER `created_at`;

ALTER TABLE `prices` 
	ADD `created_at` TIMESTAMP NOT NULL AFTER `created`, 
	ADD `updated_at` TIMESTAMP NOT NULL AFTER `created_at`;

ALTER TABLE `ricket_consults` 
	ADD `created_at` TIMESTAMP NOT NULL AFTER `created`, 
	ADD `updated_at` TIMESTAMP NOT NULL AFTER `created_at`;

ALTER TABLE `settings` 
	ADD `created_at` TIMESTAMP NOT NULL AFTER `modified`, 
	ADD `updated_at` TIMESTAMP NOT NULL AFTER `created_at`;

ALTER TABLE `surgeries` 
	ADD `created_at` TIMESTAMP NOT NULL AFTER `created`, 
	ADD `updated_at` TIMESTAMP NOT NULL AFTER `created_at`;

ALTER TABLE `users` 
	ADD `created_at` TIMESTAMP NOT NULL AFTER `created`, 
	ADD `updated_at` TIMESTAMP NOT NULL AFTER `created_at`;
