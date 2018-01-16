
UPDATE `users` SET `inExaminerList` = '1' WHERE `users`.`username` = "murshed";
UPDATE `users` SET `inExaminerList` = '1' WHERE `users`.`username` = "thierry";

INSERT INTO `users` (`id`, `created_at`, `updated_at`, `lastuser`, `username`, `name`, `password`, `email`, `codage`, `group`, `inExaminerList`, `notes`, `last_login`, `remember_token`) VALUES (NULL, NULL, '1980-01-01 00:00:00.000000', 'jehon', 'ershad', 'Ershad', NULL, NULL, 'ERS', 'cdc', '1', NULL, NULL, NULL);

UPDATE `users` SET codage = "MUR" WHERE `username` = "murshed";
UPDATE `users` SET codage = "JH"  WHERE `username` = "jehon";
UPDATE `users` SET codage = "TCA" WHERE `username` = "thierry";
