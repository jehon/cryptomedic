
INSERT INTO appointments(created_at, updated_at, lastuser, patient_id, `Date`, ExaminerName, NextAppointment, NextCenter)
SELECT c.created_at, c.updated_at, c.lastuser, c.patient_id, c.Date, c.ExaminerName, c.NextAppointment, c.NextCenter
FROM ricket_consults AS c
WHERE c.NextAppointment IS NOT NULL OR c.NextCenter IS NOT NULL;

INSERT INTO appointments(created_at, updated_at, lastuser, patient_id, `Date`, ExaminerName, NextAppointment, NextCenter)
SELECT c.created_at, c.updated_at, c.lastuser, c.patient_id, c.Date, c.ExaminerName, c.NextAppointment, c.NextCenter
FROM nonricket_consults AS c
WHERE c.NextAppointment IS NOT NULL OR c.NextCenter IS NOT NULL;

INSERT INTO appointments(created_at, updated_at, lastuser, patient_id, `Date`, ExaminerName, NextAppointment, NextCenter)
SELECT c.created_at, c.updated_at, c.lastuser, c.patient_id, c.Date, c.ExaminerName, c.NextAppointment, c.NextCenter
FROM club_foots AS c
WHERE c.NextAppointment IS NOT NULL OR c.NextCenter IS NOT NULL;

ALTER TABLE `ricket_consults`
  DROP `Nextappointment`,
  DROP `NextCenter`;

ALTER TABLE `nonricket_consults`
  DROP `Nextappointment`,
  DROP `NextCenter`;

ALTER TABLE `club_foots`
  DROP `Nextappointment`,
  DROP `NextCenter`;
