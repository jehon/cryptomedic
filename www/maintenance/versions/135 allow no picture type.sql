-- Allow empty type
ALTER TABLE `pictures`
CHANGE `type` `type` VARCHAR(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL;
