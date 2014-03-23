CREATE TABLE `archive_numeric` (
	`date` DATETIME NOT NULL,
	`source_id` SMALLINT(10) UNSIGNED NOT NULL COLLATE 'utf8_unicode_ci',
	`value` FLOAT NOT NULL,
	PRIMARY KEY (`date`, `source_id`),
	INDEX `name` (`source_id`)
)
COLLATE='utf8_unicode_ci'
ENGINE=InnoDB;

CREATE TABLE `archive_bool` (
	`date` DATETIME NOT NULL,
	`source_id` SMALLINT(10) UNSIGNED NOT NULL COLLATE 'utf8_unicode_ci',
	`value` TINYINT(1) NOT NULL,
	`prev_value` TINYINT(1) NOT NULL,
	PRIMARY KEY (`date`, `source_id`),
	INDEX `name` (`source_id`)
)
COLLATE='utf8_unicode_ci'
ENGINE=InnoDB;
