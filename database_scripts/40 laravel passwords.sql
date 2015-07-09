
-- move old password out of the way
ALTER TABLE `users` CHANGE `password` `old_password` CHAR(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

-- create new password field
ALTER TABLE `users` ADD `password` VARCHAR(60) NOT NULL AFTER `name`;

-- not used, but necessary
ALTER TABLE `users` ADD `remember_token` VARCHAR(255) NOT NULL ; 

UPDATE users SET password = old_password WHERE password = "";
