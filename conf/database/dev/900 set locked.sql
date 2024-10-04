UPDATE appointments
SET
  updated_at = NOW()
WHERE
  id = 101;

UPDATE surgeries
SET
  updated_at = NOW()
WHERE
  id = 103;
