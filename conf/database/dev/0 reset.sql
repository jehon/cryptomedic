USE mysql;

-- ---------------------------------------
-- Schema
-- ---------------------------------------
DROP SCHEMA IF EXISTS cryptomedic;

CREATE SCHEMA cryptomedic;

-- ---------------------------------------
-- Users
-- ---------------------------------------
-- CREATE USER IF NOT EXISTS 'phpmyadmin' IDENTIFIED BY 'phpmyadmin'";
-- GRANT ALL PRIVILEGES ON *.* TO phpmyadmin";
CREATE USER IF NOT EXISTS 'mysql_cryptomedic_username' IDENTIFIED BY 'password';

SET
  PASSWORD FOR mysql_cryptomedic_username = PASSWORD ('mysql_cryptomedic_password');

GRANT ALL PRIVILEGES ON cryptomedic.* TO mysql_cryptomedic_username;

FLUSH PRIVILEGES;

--  Mysql 5.7, 7.0:
-- 	ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';
--  	ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
