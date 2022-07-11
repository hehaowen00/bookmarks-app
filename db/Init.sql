CREATE TABLE IF NOT EXISTS `bookmarks`.`users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(64) NOT NULL,
    `password` TEXT NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `bookmarks`.`collections` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `name` VARCHAR(255) UNIQUE NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `user_fk` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `bookmarks`.`bookmarks` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `list_id` INT NOT NULL,
    `url` TEXT UNIQUE NOT NULL,
    `title` TEXT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
      ON DELETE CASCADE,
    FOREIGN KEY (`list_id`) REFERENCES `collections` (`id`)
      ON DELETE CASCADE
);
