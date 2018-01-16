-- autoGenerateReference
DELETE FROM patients WHERE entryyear = 1998 and entryorder = 10000;

-- modifyBillTest: relock the file
UPDATE `bills` SET `updated_at` = '2014-01-01 00:00:00' WHERE `bills`.`id` = 2;

-- modifyPatientTest: delete sub files
DELETE FROM ricket_consults WHERE patient_id = 7;
DELETE FROM other_consults  WHERE patient_id = 7;
DELETE FROM club_feet       WHERE patient_id = 7;
DELETE FROM surgeries       WHERE patient_id = 7;
DELETE FROM appointments    WHERE patient_id = 7;
DELETE FROM pictures        WHERE patient_id = 7;

-- DELETE FROM bill_lines      WHERE (bill_id IN (SELECT id FROM bills WHERE patient_id = 7));
DELETE FROM payments        WHERE (bill_id IN (SELECT id FROM bills WHERE patient_id = 7));
DELETE FROM bills           WHERE patient_id = 7;

-- modifyPriceListsTest: delete generated price
DELETE FROM prices WHERE datefrom > '2016-01-04';
UPDATE prices SET dateto = NULL WHERE id = (SELECT * FROM (SELECT max(id) FROM prices) AS t);

-- ???
DELETE FROM users WHERE username = '' OR username IS NULL;
