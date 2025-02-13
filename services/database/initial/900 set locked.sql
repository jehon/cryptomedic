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

UPDATE club_feet
SET
  updated_at = NOW()
WHERE
  id = 106;

UPDATE pictures
SET
  updated_at = NOW()
WHERE
  id = 107;
