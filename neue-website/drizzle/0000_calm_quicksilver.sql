CREATE TABLE `administrators` (
	`user_id` text PRIMARY KEY NOT NULL,
	`slot` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `administrators_slot_unique` ON `administrators` (`slot`);--> statement-breakpoint
CREATE TABLE `images` (
	`id` text PRIMARY KEY NOT NULL,
	`storage_key` text,
	`source` text DEFAULT '' NOT NULL,
	`title` text NOT NULL,
	`alt` text NOT NULL,
	`category` text DEFAULT 'Praxis' NOT NULL,
	`person` text DEFAULT '' NOT NULL,
	`position` integer DEFAULT 0 NOT NULL,
	`published` integer DEFAULT 1 NOT NULL,
	`content_type` text DEFAULT 'image/jpeg' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `trainings` (
	`id` text PRIMARY KEY NOT NULL,
	`person` text NOT NULL,
	`category` text NOT NULL,
	`title` text NOT NULL,
	`provider` text DEFAULT '' NOT NULL,
	`location` text DEFAULT '' NOT NULL,
	`date` text DEFAULT '' NOT NULL,
	`end_date` text DEFAULT '' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`published` integer DEFAULT 1 NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
