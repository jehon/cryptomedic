-- Fix error about last_login

ALTER TABLE `users` ADD `last_login` TIMESTAMP NULL DEFAULT NULL ;
