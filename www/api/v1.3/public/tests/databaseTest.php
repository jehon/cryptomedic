<?php
use PHPUnit\Framework\TestCase;

use Cryptomedic\Lib\Database;

class DatabaseTest extends TestCase {
    protected function setUp(): void {
        self::tearDown();

        Database::exec(<<<EOSQL
CREATE TABLE `test` (
    `id` INT(10) unsigned NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `lastuser` varchar(50) NOT NULL,
    `test_id` INT NOT NULL,
    `test1` VARCHAR(128) NOT NULL,
    `test2` VARCHAR(128) NULL,
    `test_boolean` INT(1) NOT NULL DEFAULT 0,
    UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8       
EOSQL);

    }


    protected function tearDown(): void {
        Database::exec('DROP TABLE IF EXISTS test');
    }

    public function testSelectAsArray() {
        $res = Database::selectAsArray('SHOW DATABASES;', 'Database');
        $this->assertArrayHasKey('cryptomedic', $res);

        $res = Database::selectAsArray('SHOW TABLES;', 'Tables_in_cryptomedic');
        $this->assertArrayHasKey('users', $res);
    }

    // public function testCRUD() {
    // }
}