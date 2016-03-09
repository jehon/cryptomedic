CREATE TABLE `sync_keys` (
 `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `updated_at` timestamp NULL DEFAULT NULL,
 `computer` int(10) unsigned NOT NULL,
 `key` varchar(1028) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1
