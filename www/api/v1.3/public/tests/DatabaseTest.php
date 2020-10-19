<?php

use PHPUnit\Framework\TestCase;

use Cryptomedic\Lib\Database;
use Cryptomedic\Lib\DatabaseQueryException; // From Database
use Cryptomedic\Lib\DatabaseUndefinedException; // From Database

use Cryptomedic\Lib\CacheManager;

function createTestTable() {
    Database::exec(<<<EOSQL
DROP TABLE IF EXISTS test
EOSQL);

    Database::exec(<<<EOSQL
CREATE TABLE `test` (
    `id` INT(10) unsigned NOT NULL AUTO_INCREMENT,
    `created_at` timestamp NULL DEFAULT NULL,
    `lastuser` varchar(50) NOT NULL,
    `test_id` INT NOT NULL,
    `test_unique` VARCHAR(128) NOT NULL,
    `test2` VARCHAR(128) NULL,
    `test_boolean` INT(1) NOT NULL DEFAULT 0,
    UNIQUE KEY `id` (`id`),
    UNIQUE KEY `test_unique` (`test_unique`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
EOSQL);

    CacheManager::generate();
}

class DatabaseTest extends TestCase {
    protected function setUp(): void {
        Database::startTransaction();
    }

    protected function tearDown(): void {
        Database::cancelTransaction();
    }

    public function testStructureFunctions() {
        createTestTable();
        try {
            $res = Database::getDefinitionForTable('anything');
            $this->assertTrue(false, 'Should have thrown an DatabaseUndefinedException exception');
        } catch (DatabaseUndefinedException $e) {
            $this->assertTrue(true, 'Exception received');
        }

        try {
            $res = Database::getDefinitionForField('anything', 'id');
            $this->assertTrue(false, 'Should have thrown an DatabaseUndefinedException exception');
        } catch (DatabaseUndefinedException $e) {
            $this->assertTrue(true, 'Exception received');
        }

        try {
            $res = Database::getDefinitionForField('test', 'anything');
            $this->assertTrue(false, 'Should have thrown an DatabaseUndefinedException exception');
        } catch (DatabaseUndefinedException $e) {
            $this->assertTrue(true, 'Exception received');
        }
    }

    public function testSelectAsArray() {
        createTestTable();

        $res = Database::selectAsArray('SHOW DATABASES;', 'Database');
        $this->assertArrayHasKey('cryptomedic', $res);

        $res = Database::selectAsArray('SHOW TABLES;', 'Tables_in_cryptomedic');
        $this->assertArrayHasKey('users', $res);
    }

    public function testDoubleInsert() {
        createTestTable();

        Database::insert('test', ['id' => '1', 'test_id' => '2', 'test_unique' => 'test_1']);

        try {
            Database::insert('test', ['id' => '1', 'test_id' => '2', 'test_unique' => 'test_1']);
            $this->assertFalse(true, 'duplicate insert should throw');
        } catch (Exception $e) {
            $this->assertTrue(true, 'exception was thrown');
        }
    }

    public function testCRUD() {
        createTestTable();

        Database::insert('test', ['test_id' => '2', 'test_unique' => 'test_1']);

        $res = Database::selectInTable('test', 'test_id = 2');
        $this->assertEquals(sizeof($res), 1);
        $this->assertArrayHasKey("1", $res);
        $this->assertEquals($res[1]['test_id'], 2);

        $res = Database::selectIdInTable('test', 1);
        $this->assertEquals($res['test_id'], 2);

        try {
            Database::selectIdInTable('test', 1000);
            $this->assertFail(true, 'duplicate insert should throw');
        } catch (DatabaseQueryException $e) {
            $this->assertTrue(true, 'exception was thrown');
        }

        Database::insert('test', ['test_id' => '3', 'test_unique' => 'test_1'], true);
        $res = Database::selectIdInTable('test', 1);
        $this->assertEquals($res['test_id'], 2);
    }

    public function testProtections() {
        createTestTable();

        $sql = Database::buildSetStatement('test', ['id' => '1', 'test_id' => '2', 'test_unique' => 'test_1']);
        $this->assertMatchesRegularExpression("/id = '1'/", $sql);
        $this->assertMatchesRegularExpression("/test_id = '2'/", $sql);

        Database::insert('test', ['test_id' => '2', 'test_unique' => 'test_2', 'test_invalid_field' => 123]);
        $res = Database::selectInTable('test', "test_unique = 'test_2'");
        $this->assertEquals(sizeof($res), 1);
        $rec = array_pop($res);
        $this->assertEquals($rec['test_id'], '2');
    }
}
