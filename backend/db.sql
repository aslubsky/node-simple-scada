CREATE TABLE `values_archive` (
	`date` DATETIME NOT NULL,
	`source_id` SMALLINT(10) UNSIGNED NOT NULL COLLATE 'utf8_unicode_ci',
	`value` FLOAT NOT NULL,
	PRIMARY KEY (`date`, `source_id`),
	INDEX `name` (`source_id`)
)
COLLATE='utf8_unicode_ci'
ENGINE=InnoDB;
