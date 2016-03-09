CREATE TRIGGER bills_deleted AFTER DELETE ON bills
FOR EACH ROW
INSERT INTO deleted(entity_type, entity_id) VALUE('bills', OLD.id);

CREATE TRIGGER club_foots_deleted AFTER DELETE ON club_foots
FOR EACH ROW
INSERT INTO deleted(entity_type, entity_id) VALUE('club_foots', OLD.id);

CREATE TRIGGER other_consults_deleted AFTER DELETE ON other_consults
FOR EACH ROW
INSERT INTO deleted(entity_type, entity_id) VALUE('other_consults', OLD.id);

CREATE TRIGGER orthopedic_devices_deleted AFTER DELETE ON orthopedic_devices
FOR EACH ROW
INSERT INTO deleted(entity_type, entity_id) VALUE('orthopedic_devices', OLD.id);

CREATE TRIGGER patients_deleted AFTER DELETE ON patients
FOR EACH ROW
INSERT INTO deleted(entity_type, entity_id) VALUE('patients', OLD.id);

CREATE TRIGGER pictures_deleted AFTER DELETE ON pictures
FOR EACH ROW
INSERT INTO deleted(entity_type, entity_id) VALUE('pictures', OLD.id);

CREATE TRIGGER ricket_consults_deleted AFTER DELETE ON ricket_consults
FOR EACH ROW
INSERT INTO deleted(entity_type, entity_id) VALUE('ricket_consults', OLD.id);

CREATE TRIGGER surgeries_deleted AFTER DELETE ON surgeries
FOR EACH ROW
INSERT INTO deleted(entity_type, entity_id) VALUE('surgeries', OLD.id);

CREATE TRIGGER surgery_followups_deleted AFTER DELETE ON surgery_followups
FOR EACH ROW
INSERT INTO deleted(entity_type, entity_id) VALUE('surgery_followups', OLD.id);
