CREATE TABLE `payments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`stripePaymentIntentId` varchar(100) NOT NULL,
	`productName` varchar(200),
	`amountCents` int,
	`currency` varchar(10),
	`status` varchar(50) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `payments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`stripeSubscriptionId` varchar(100) NOT NULL,
	`stripePriceId` varchar(100) NOT NULL,
	`status` varchar(50) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `stripeCustomerId` varchar(100);