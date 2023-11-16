SELECT
  col.table_schema AS database_name,
  col.table_name,
  col.ordinal_position AS column_id,
  col.column_name,
  col.data_type,
  col.datetime_precision,
  col.column_default
FROM
  information_schema.columns col
  JOIN information_schema.tables tab ON tab.table_schema = col.table_schema
  AND tab.table_name = col.table_name
  AND tab.table_type = 'BASE TABLE'
WHERE
  col.data_type = 'timestamp'
  AND col.table_schema = 'cryptomedic'
ORDER BY
  col.table_schema,
  col.table_name,
  col.ordinal_position
