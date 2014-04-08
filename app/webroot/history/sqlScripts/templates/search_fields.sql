-- about utf8
SELECT CONCAT("ALTER TABLE ", table_name, " CHANGE `", column_name, "` `", column_name, "` ", DATA_TYPE, "( ", CHARACTER_MAXIMUM_LENGTH,  " ) CHARACTER SET utf8 COLLATE utf8_general_ci ", IF(IS_NULLABLE, "NOT", ""), " NULL DEFAULT ", IF(COLUMN_DEFAULT is NULL, "NULL", "''"), ";") 
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'amd_chakaria' AND `CHARACTER_SET_NAME` NOT LIKE 'utf8';

-- old column
SELECT concat("ALTER TABLE ", table_name, " DROP ", column_name, ";")
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'amd_chakaria' AND `COLUMN_NAME` LIKE 'old_%'

-- change default
-- about utf8
SELECT CONCAT("ALTER TABLE ", table_name, " CHANGE `", column_name, "` `", column_name, "` ",
              "INT( 11 ) ",
              " NOT NULL DEFAULT 0", ";")
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = 'amd_chakaria'
      AND `TABLE_NAME` = 'bills'
      AND (`DATA_TYPE` = 'int' OR `DATA_TYPE` = 'tinyint')
      AND  ((`COLUMN_NAME` LIKE 'work%')
            OR (`COLUMN_NAME` LIKE 'consult%')
            OR (`COLUMN_NAME` LIKE 'surgical%')
            OR (`COLUMN_NAME` LIKE 'other%')
      )

      -- AND `IS_NULLABLE`
      -- AND `CHARACTER_SET_NAME` NOT LIKE 'utf8';
