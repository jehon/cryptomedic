update other_consults
set
  TreatmentEvaluation = 1
where
  TreatmentEvaluation = 0;

update club_feet
set
  TreatmentEvaluation = 1
where
  TreatmentEvaluation = 0;

update ricket_consults
set
  TreatmentEvaluation = 1
where
  TreatmentEvaluation = 0;
