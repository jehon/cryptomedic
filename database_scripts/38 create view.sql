DROP VIEW IF EXISTS consults;

CREATE VIEW consults AS 
    (
        select 'club_foots' as source,         id, created_at, updated_at, lastuser, patient_id, Date, ExaminerName, Center, TreatmentEvaluation, TreatmentFinished, Nextappointment, NextCenter FROM club_foots
    ) UNION (
        select 'nonricket_consults' as source, id, created_at, updated_at, lastuser, patient_id, Date, ExaminerName, Center, TreatmentEvaluation, TreatmentFinished, Nextappointment, NextCenter FROM nonricket_consults
    ) UNION (
        select 'ricket_consults' as source,    id, created_at, updated_at, lastuser, patient_id, Date, ExaminerName, Center, TreatmentEvaluation, TreatmentFinished, Nextappointment, NextCenter FROM ricket_consults
    );
    