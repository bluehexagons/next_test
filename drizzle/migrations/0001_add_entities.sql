CREATE TABLE `entities` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`kind` text NOT NULL,
	`count` integer DEFAULT 0 NOT NULL,
	`created_time` integer NOT NULL,
	`modified_time` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `entities_user_id_kind_unique` ON `entities` (`user_id`,`kind`);
