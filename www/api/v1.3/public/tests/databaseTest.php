<?php
use PHPUnit\Framework\TestCase;

use Cryptomedic\Lib\Database;
use Cryptomedic\Lib\Cache;

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
        
        Cache::generate();
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

    public function testProtections() {
        $sql = Database::buildSetStatement('test', [ 'id' => '1', 'test_id' => '2', 'test1' => 'test_1' ]);
        $this->assertMatchesRegularExpression("/id = '1'/", $sql);
        $this->assertMatchesRegularExpression("/test_id = '2'/", $sql);
    }

    public function testDoubleInsert() {
        $res = Database::insert('test', [ 'id' => '1', 'test_id' => '2', 'test1' => 'test_1' ]);
        $this->assertTrue($res);

        try {
            $res = Database::insert('test', [ 'id' => '1', 'test_id' => '2', 'test1' => 'test_1' ]);
            $this->assertFail(true, 'duplicate insert should throw');
        } catch (Exception $e) {
            $this->assertTrue(true, 'exception was thrown');
        }
    }

    // public function testCRUD() {
    //     $res = Database::insert('test', [ 'id' => '2', 'test_id' => '2', 'test1' => 'test_1' ]);
    //     $this->assertTrue($res);
    // }
}
