DELETE FROM sync_computers
  WHERE
    updated_at IS NOT NULL
    AND updated_at < DATE_ADD(NOW(), INTERVAL - 6 MONTH)
  ;
