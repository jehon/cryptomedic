
ALTER TABLE `users` CHANGE `password` `password` VARCHAR(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL;
ALTER TABLE `users` CHANGE `remember_token` `remember_token` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL;

