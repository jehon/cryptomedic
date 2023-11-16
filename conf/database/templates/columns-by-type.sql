select
  col.table_schema as database_name,
  col.table_name,
  col.ordinal_position as column_id,
  col.column_name,
  col.data_type,
  col.datetime_precision,
  col.column_default
from
  information_schema.columns col
  join information_schema.tables tab on tab.table_schema = col.table_schema
  and tab.table_name = col.table_name
  and tab.table_type = 'BASE TABLE'
where
  col.data_type = 'timestamp'
  and col.table_schema = 'cryptomedic'
order by
  col.table_schema,
  col.table_name,
  col.ordinal_position
