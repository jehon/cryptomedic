USE mysql;

-- ---------------------------------------
-- Schema
-- ---------------------------------------
--
DROP DATABASE IF EXISTS cryptomedic;

CREATE DATABASE cryptomedic;

-- ---------------------------------------
-- Users
-- ---------------------------------------
--
CREATE USER IF NOT EXISTS 'mysql_cryptomedic_username' IDENTIFIED BY 'mysql_cryptomedic_password';

GRANT ALL PRIVILEGES ON cryptomedic.* TO mysql_cryptomedic_username;

FLUSH PRIVILEGES;
