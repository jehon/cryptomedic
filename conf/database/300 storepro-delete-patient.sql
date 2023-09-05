
DROP PROCEDURE IF EXISTS DeletePatient ;

CREATE PROCEDURE DeletePatient (IN pEntryYear VARCHAR(10),
                               IN pEntryOrder VARCHAR(10))
proc: BEGIN
  DECLARE patientId INT(16)  @@
  DECLARE delSQL VARCHAR(65000)  @@
  DECLARE c INT(16)  @@
  DECLARE n INT(16)  @@
  DECLARE tn VARCHAR(255)  @@

  SELECT id INTO patientId
    FROM patients
    WHERE entry_year = pEntryYear AND entry_order = pEntryOrder  @@

  IF patientId IS NULL THEN
    LEAVE proc  @@
  END IF  @@

  DROP TEMPORARY TABLE IF EXISTS deletePatientTempTable  @@
  CREATE TEMPORARY TABLE deletePatientTempTable
    SELECT DISTINCT c.TABLE_NAME
      FROM `information_schema`.`COLUMNS` AS c
      LEFT JOIN `information_schema`.`TABLES` AS t
      ON (c.TABLE_NAME = t.TABLE_NAME AND c.TABLE_SCHEMA = t.TABLE_SCHEMA)
      WHERE t.TABLE_SCHEMA = 'cryptomedic' AND c.COLUMN_NAME = 'patient_id'
      AND c.TABLE_NAME IS NOT NULL
      AND t.TABLE_TYPE = 'BASE TABLE' @@

  SELECT count(*) INTO n FROM deletePatientTempTable  @@
  SET c = 1  @@

  WHILE c <= n DO
    SELECT TABLE_NAME INTO tn FROM deletePatientTempTable LIMIT 1 OFFSET c  @@

    SET @deletePatientSQL = CONCAT("DELETE FROM `", tn, "` WHERE patient_id = ", patientId)  @@
    PREPARE deletePatientStmt FROM @deletePatientSQL  @@
    EXECUTE deletePatientStmt  @@
    DEALLOCATE PREPARE deletePatientStmt  @@

    SET c = c + 1  @@
  END WHILE  @@

  DELETE FROM patients WHERE id = patientId  @@

  DROP TEMPORARY TABLE IF EXISTS deletePatientTempTable  @@
END;
