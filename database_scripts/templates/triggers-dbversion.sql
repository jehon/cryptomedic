CREATE TRIGGER vers_labels_update AFTER UPDATE ON labels
FOR EACH ROW
UPDATE settings SET settings.value = CURRENT_TIMESTAMP() WHERE id = 'version';

CREATE TRIGGER vers_labels_insert AFTER INSERT ON labels
FOR EACH ROW
UPDATE settings SET settings.value = CURRENT_TIMESTAMP() WHERE id = 'version';

CREATE TRIGGER vers_labels_delete AFTER DELETE ON labels
FOR EACH ROW
UPDATE settings SET settings.value = CURRENT_TIMESTAMP() WHERE id = 'version';

CREATE TRIGGER vers_prices_update AFTER UPDATE ON prices
FOR EACH ROW
UPDATE settings SET settings.value = CURRENT_TIMESTAMP() WHERE id = 'version';

CREATE TRIGGER vers_prices_insert AFTER INSERT ON prices
FOR EACH ROW
UPDATE settings SET settings.value = CURRENT_TIMESTAMP() WHERE id = 'version';

CREATE TRIGGER vers_prices_delete AFTER DELETE ON prices
FOR EACH ROW
UPDATE settings SET settings.value = CURRENT_TIMESTAMP() WHERE id = 'version';
