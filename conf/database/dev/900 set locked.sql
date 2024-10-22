UPDATE appointments
SET
  updated_at = NOW()
WHERE
  id = 102;

UPDATE surgeries
SET
  updated_at = NOW()
WHERE
  id = 103;

UPDATE consult_clubfeet
SET
  updated_at = NOW()
WHERE
  id = 106;
