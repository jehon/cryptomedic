
# Create the consult view

CREATE OR REPLACE
  SQL SECURITY INVOKER
  VIEW consults
  AS
    (
      SELECT 'ricket_consult' as type,
      id, created_at, updated_at, patient_id,
      Date, ExaminerName, Center,
      Weightkg, Heightcm, Brachialcircumferencecm,
      TreatmentEvaluation, TreatmentFinished, Comments
      FROM ricket_consults)
   UNION
    (
      SELECT 'club_foots' as type,
      id, created_at, updated_at, patient_id,
      Date, ExaminerName, Center,
      Weightkg, Heightcm, Brachialcircumferencecm,
      TreatmentEvaluation, TreatmentFinished, Comments
      FROM club_foots
    )
   UNION
    (
      SELECT 'other_consult' as type,
      id, created_at, updated_at, patient_id,
      Date, ExaminerName, Center,
      Weightkg, Heightcm, Brachialcircumferencecm,
      TreatmentEvaluation, TreatmentFinished, Comments
      FROM other_consults
    )
