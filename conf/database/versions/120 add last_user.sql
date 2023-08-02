
ALTER TABLE `server_stats`
    ADD `last_user`VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL after updated_at; 

ALTER TABLE `settings`
    ADD `last_user`VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL after updated_at; 
