
UPDATE `users` SET `inExaminerList` = '1' WHERE `users`.`username` = "murshed";
UPDATE `users` SET `inExaminerList` = '1' WHERE `users`.`username` = "thierry";

INSERT INTO `users` (`lastuser`, `username`, `name`, `codage`, `group`, `inExaminerList`) VALUES ('jehon', 'ershad', 'Ershad', 'Ers', 'cdc', '1');

INSERT INTO `users` (`lastuser`, `username`, `name`, `codage`, `group`, `inExaminerList`) VALUES ('jehon', 'shetou', 'Shetou', 'She', 'cdc', '1');

UPDATE `users` SET codage = "MUR" WHERE `username` = "murshed";
UPDATE `users` SET codage = "JH"  WHERE `username` = "jehon";
UPDATE `users` SET codage = "TCA" WHERE `username` = "thierry";
