-- appointment
INSERT INTO
  `patients` (
    `id`,
    `created_at`,
    `updated_at`,
    `last_user`,
    `entry_year`,
    `entry_order`,
    `name`,
    `sex`,
    `year_of_birth`,
    `phone`,
    `address_comments`,
    `address_district`,
    `address_upazilla`,
    `address_union`,
    `pathology`,
    `comments`
  )
VALUES
  (
    '102',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    'test',
    '2010',
    '1',
    'test appointment',
    NULL,
    NULL,
    '',
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    NULL
  );

INSERT INTO
  `appointments` (
    `id`,
    `created_at`,
    `updated_at`,
    `last_user`,
    `patient_id`,
    `date`,
    `center`,
    `purpose`
  )
VALUES
  (
    '101',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    'test-appointment',
    '102',
    '2024-01-02',
    NULL,
    'test data'
  );
