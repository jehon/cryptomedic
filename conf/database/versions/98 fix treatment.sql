UPDATE other_consults
SET
  TreatmentEvaluation = 1
WHERE
  TreatmentEvaluation = 0;

UPDATE club_feet
SET
  TreatmentEvaluation = 1
WHERE
  TreatmentEvaluation = 0;

UPDATE ricket_consults
SET
  TreatmentEvaluation = 1
WHERE
  TreatmentEvaluation = 0;
