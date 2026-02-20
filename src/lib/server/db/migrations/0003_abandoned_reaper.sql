ALTER TABLE `post` ADD `slug` text DEFAULT '' NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `post_slug_unique` ON `post` (`slug`);