CREATE TABLE IF NOT EXISTS `db_users` (
   `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `parent_id` int(11) unsigned NOT NULL DEFAULT '0',
   `password` varchar(255) not null,
   `serial_num` varchar(255) not null,
   PRIMARY KEY (`user_id`)
 ) AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="user table for login and regist";

CREATE TABLE IF NOT EXISTS `db_stores` (
   `store_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `store_serial_num` varchar(255) not null,
   `user_id` int(11) unsigned NOT NULL,
   `name` varchar(255) not null ,
   `shopkeeper` varchar(255) not null,
   `addr` varchar(255) not null ,
   `phone` varchar(255) not null,
   PRIMARY KEY (`store_id`)
 ) AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="store table";

CREATE TABLE IF NOT EXISTS `db_stores_application` (
   `application_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `user_id` int(11) unsigned NOT NULL,
   `name` varchar(255) not null ,
   `shopkeeper` varchar(255) not null,
   `phone` varchar(255) not null,
   `addr` varchar(255) not null ,
   `authenticated_status` enum('processing','reject','approve') not null default 'processing',
   PRIMARY KEY (`application_id`)
 ) AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="store application table";

CREATE TABLE IF NOT EXISTS `db_user_invited_link` (
   `link_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `user_id` int(11) unsigned NOT NULL,
   `invited_id`  int(11) unsigned NOT NULL,
   `time` timestamp not null default CURRENT_TIMESTAMP,
   PRIMARY KEY (`link_id`)
 ) AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `db_oauth_login` (
   `login_id` int(11) unsigned not null AUTO_INCREMENT,
   `oauth_id` varchar(255) NOT NULL,
   `user_id` int(11) unsigned NOT NULL,
   `oauth_name` varchar(255) not null,
   `oauth_access_token` varchar(255) not null,
   `oauth_expires` varchar(255) not null,
   `is_subcribe` boolean not null ,
   `is_subscribe_show` boolean not null default 1,
   `is_point_send` boolean not null default 0,
   PRIMARY KEY (`login_id`),
   FOREIGN KEY (user_id) references db_users(user_id) on delete cascade on update cascade
 ) AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `db_user_profiles`(
   `profile_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `user_id` int(11) unsigned NOT NULL,
   `image` varchar(255) NOT NULL default '',
   `email` varchar(255) NOT NULL default '',
   `phone` varchar(32) NOT NULL DEFAULT '',
   `name` varchar(255) NOT NULL DEFAULT'',
   `nick_name` varchar(255) NOT NULL DEFAULT'',
   `login_count` smallint(5) NOT NULL DEFAULT 0,
   `regist_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,    #  regist time
   `is_active` boolean NOT NULL DEFAULT '1', #  1 for active ,0 for disable
   `ip_addr` varchar(255) not null default '',
   PRIMARY KEY (`profile_id`),
   index(`user_id`),
   FOREIGN KEY (user_id) references db_users(user_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="user_profile";

CREATE TABLE IF NOT EXISTS `db_user_product_trace_link` (
  `product_id` int(11) unsigned NOT NULL,
  `user_id` int(11) unsigned NOT NULL,
  `timestamp` timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  `count` int(11) unsigned not null default 1,
  PRIMARY KEY (`product_id`,`user_id`),
  FOREIGN KEY (`product_id`) REFERENCES `db_products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `db_users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `db_roles`(
   `role_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `role` varchar(255) NOT NULL ,
   `parent_id` int(11) NOT NULL default '0',
   `is_active` boolean NOT NULL DEFAULT '1',
   `is_in_list` boolean not null default '1',
   PRIMARY KEY(`role_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="role table";

CREATE TABLE IF NOT EXISTS `db_user_role_link`(
   `user_id` int(11) unsigned NOT NULL,
   `role_id` int(11) unsigned NOT NULL,
   PRIMARY KEY(`role_id`,`user_id`),
   FOREIGN KEY (user_id) references db_users(user_id) on delete cascade on update cascade,
   FOREIGN KEY (role_id) references db_roles(role_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="user role link table";
CREATE TABLE IF NOT EXISTS `db_permissions`(
   `permission_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `permission` varchar(255) NOT NULL,
   `tag` VARCHAR(255) NOT NULL DEFAULT '',
   `name` varchar(255) NOT NULL,
   `is_active` boolean NOT NULL DEFAULT '1',
   PRIMARY KEY(`permission_id`)
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="permission table";

CREATE TABLE IF NOT EXISTS `db_role_permission_link`(
   `role_id` int(11) unsigned NOT NULL,
   `permission_id` int(11) unsigned NOT NULL,
   PRIMARY KEY(`role_id`,`permission_id`),
   FOREIGN KEY (permission_id) references db_permissions(permission_id) on delete cascade on update cascade,
   FOREIGN KEY (role_id) references db_roles(role_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="user role link table";

CREATE TABLE IF NOT EXISTS `db_login_history`(
   `history_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `user_id` int(11) unsigned NOT NULL ,
   `login_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP , #   latest login time
   `login_ip` varchar(255) NOT NULL DEFAULT '',
   PRIMARY KEY (`history_id`),
   index(`user_id`),
   FOREIGN KEY (user_id) references db_users(user_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="user login history";

CREATE TABLE IF NOT EXISTS `db_deliver_addrs`(
   `deliverAddr_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `user_id` int(11) unsigned NOT NULL ,
   `name` varchar(255) NOT NULL COMMENT 'receiver name',
   `phone` varchar(32) NOT NULL DEFAULT '',
   `country` varchar(32) NOT NULL DEFAULT '',
   `state` varchar(32) NOT NULL DEFAULT '',
   `city` varchar(32) NOT NULL DEFAULT '',
   `region` varchar(32) NOT NULL DEFAULT '',
   `addr_detail` varchar(255) NOT NULL DEFAULT'',
   `zipCode` varchar(32) NOT NULL DEFAULT '',
   `is_default` boolean NOT NULL COMMENT '1:is default, 0:not' DEFAULT 0,
   PRIMARY KEY(`deliverAddr_id`),
   index(`user_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="deliver address";



CREATE TABLE IF NOT EXISTS `db_financial_account`(
   `account_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `user_id` int(11) unsigned NOT NULL,
   `balance` decimal(20,2) NOT NULL DEFAULT '0.00' COMMENT 'available balance',
   `commission_money` decimal(20,2) NOT NULL DEFAULT '0.00' COMMENT 'commission balance',
   `cash_coupon` decimal(20,2) NOT NULL DEFAULT '0.00' COMMENT 'coupon balance',
   `points` int(11) not null default 0,
   PRIMARY KEY(`account_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="financial account table";

CREATE TABLE IF NOT EXISTS `db_banks`(
   `bank_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `bank` varchar(25) NOT NULL,
   `is_active` boolean not null default 1,
   PRIMARY KEY(`bank_id`)
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="banks table";

CREATE TABLE IF NOT EXISTS `db_withdraw`(
   `withdraw_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `withdraw_serialNum` varchar(255) NOT NULL DEFAULT '' COMMENT 'withdraw serial number',
   `account_id` int(11) unsigned NOT NULL,
   `account_type` tinyint NOT NULL ,
   `account_num` varchar(255) NOT NULL default '',
   `name` VARCHAR(255) not null default '',
   `bank` varchar(255) not null default '',
   `money` decimal(20,2) NOT NULL DEFAULT 0.00,
   `handling_charge` decimal(20,2) NOT NULL DEFAULT 0.00,
   `apply_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `deal_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
   `operator` varchar(255) NOT NULL DEFAULT '',
   `remittance_num` varchar(255) NOT NULL DEFAULT '',
   `evidence_url` varchar(255) NOT NULL DEFAULT '',
   `reject_reason` varchar(255) NOT NULL DEFAULT '',
   `status` tinyint NOT NULL DEFAULT '1' COMMENT '1check pending 2:success 3:reject',
   PRIMARY KEY(`withdraw_id`)
   index(`account_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="withdraw table";

CREATE TABLE IF NOT EXISTS `db_balance_log`(
   `log_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `account_id` int(11) unsigned not null,
   `payment_serial_num` varchar(255) not null default '',
   `title` varchar(255) NOT NULL DEFAULT '' COMMENT 'log title for trade descrition',
   `operator` varchar(255) NOT NULL DEFAULT '',
   `type` tinyint unsigned NOT NULL COMMENT '1:recharge , 2:withdraw ,3:payment ,4:point,5:comission',
   `money` decimal(20,3) NOT NULL,
   `balance` decimal(20,3) NOT NULL,
   `time` timestamp not null default CURRENT_TIMESTAMP,
   `note` varchar(255) NOT NULL DEFAULT '',
   `is_in` boolean not null,
   PRIMARY KEY(`log_id`)
   Index(`log_id`,`type`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="balance log table";

CREATE TABLE IF NOT EXISTS `db_products` (
   `product_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `is_active` boolean NOT NULL DEFAULT '0',#   1 for active ,0 for disable
   `timestamp` timestamp not null DEFAULT CURRENT_TIMESTAMP, # create time
   `market_price` decimal(20,2) NOT null DEFAULT 0.00, #
   `price` decimal(20,2) NOT null DEFAULT 0.00, #
   `title` varchar(255) NOT NULL DEFAULT '', #  product's title
   `description` varchar(255) NOT NULL DEFAULT '', #  url of product's desc
   `is_cash_coupon` boolean not null default 0,
   PRIMARY KEY (`product_id`)
 ) AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="product info";

 CREATE TABLE IF NOT EXISTS `db_product_images_link`(
   `link_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `product_id` int(11) unsigned NOT NULL ,
   `image_url` varchar(255) NOT NULL DEFAULT '',
   `is_master` boolean NOT NULL DEFAULT '0',
   PRIMARY KEY(`link_id`),
   FOREIGN KEY (product_id) references db_products(product_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="association table for product and it's image";

 CREATE TABLE IF NOT EXISTS `db_products_categories_link`(
	`product_id` int(11) unsigned NOT NULL,
	`category_id` int(11) unsigned NOT NULL,
    `is_primary` boolean NOT NULL DEFAULT 0,
	PRIMARY KEY (`product_id`,`category_id`),
   index(`product_id`),
   FOREIGN KEY (product_id) references db_products(product_id) on delete cascade on update cascade,
   FOREIGN KEY (category_id) references db_categories(category_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="association table for product and system defined categories";

 CREATE TABLE IF NOT EXISTS `db_categories`(
   `category_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `category`  varchar(255) NOT NULL,
   `parent_id` int(11) unsigned NOT NULL DEFAULT 0,
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `weight` int(11) unsigned NOT NULL DEFAULT 0,
   PRIMARY KEY (`category_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="all categories defined by system";

CREATE TABLE IF NOT EXISTS `db_terms`(
   `term_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `product_id` int(11) unsigned not null ,
   `current_term` int(11) unsigned not null,
   `product_title` varchar(255) NOT NULL default '',
   `product_image` varchar(255) NOT NULL default '',
   `product_price` decimal(20,2) NOT NULL default 0.00,
   `total_amount` int(11) unsigned NOT NULL DEFAULT 0,
   `current_amount` int(11) unsigned NOT NULL DEFAULT 0,
   `lucky_num` int(11) unsigned NOT NULL default 0,
   `lucky_order` int(11) unsigned NOT NULL default 0,
   `start_time` timestamp not null default CURRENT_TIMESTAMP,
   `full_time` timestamp not null default '0000-00-00 00:00:00',
   `open_time` timestamp not null default '0000-00-00 00:00:00',
   `status` enum('running','openning','opened') not null default 'running',
   `is_quick` boolean not null default 0,
   `money_limit` int(11) not null default 1,
   `caipiao_term` varchar(255) not null default '',
   `coupon_id` int(11) unsigned NOT NULL default 0,
   `is_allow_auto` boolean not null default 1,
   `is_point` boolean not null default 0,
   `point` int(11) not null default 0,
   PRIMARY KEY (`term_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;

CREATE TABLE IF NOT EXISTS `db_cash_coupons`(
   `coupon_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `coupon_number` varchar(255) not null default '',
   `money` decimal(20,2) NOT NULL default 0.00,
   `duobao_money` decimal(20,2) NOT NULL default 0.00,
   `create_time` timestamp not null default CURRENT_TIMESTAMP,
   `is_active` boolean not null default 1,
   `url` varchar(255) not null default '';
   PRIMARY KEY (`coupon_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;

CREATE TABLE IF NOT EXISTS `db_store_coupon_link`(
   `coupon_id` int(11) unsigned NOT NULL,
   `store_id` int(11) unsigned NOT NULL,
   PRIMARY KEY (`coupon_id`,`store_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;

CREATE TABLE IF NOT EXISTS `db_user_show_list`(
   `show_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `user_id`  int(11) unsigned NOT NULL,
   `product_title` varchar(255) NOT NULL default '',
   `product_image` varchar(255) NOT NULL default '',
   `product_price` decimal(20,2) NOT NULL default 0.00,
   `product_id` int(11) unsigned not null,
   `order_id` int(11) unsigned NOT NULL DEFAULT 0,
   `title` varchar(255) not null default '',
   `time` timestamp not null default CURRENT_TIMESTAMP,
   `is_active` boolean not null default 1,
   `ip_addr` varchar(255) not null default '',
   PRIMARY KEY (`show_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;

CREATE TABLE IF NOT EXISTS `db_user_show_image_link`(
   `link_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `show_id` int(11) unsigned NOT NULL,
   `image_url`  varchar(255) NOT NULL,
   PRIMARY KEY (`link_id`),
   FOREIGN KEY (show_id) references db_user_show_list(show_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;

CREATE TABLE IF NOT EXISTS `db_cart_items`(
   `item_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `user_id` int(11) unsigned NOT NULL ,
   `product_id` int(11) unsigned NOT NULL,
   `term_id` int(11) unsigned NOT NULL ,
   `amount` smallint(8) NOT NULL DEFAULT 0,
   `image_url` varchar(255) not null default '',
   `title` varchar(255) not null default '',
   `timestamp` timestamp not null default CURRENT_TIMESTAMP,
   `money_limit` int(11) not null default 1,
   PRIMARY KEY(`item_id`),
   index(`user_id`,`product_id`),
   FOREIGN KEY (user_id) references db_users(user_id) on delete cascade on update cascade,
   FOREIGN KEY (product_id) references db_products(product_id) on delete cascade on update cascade,
   FOREIGN KEY (term_id) references db_terms(term_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="cart product association table";

 CREATE TABLE IF NOT EXISTS `db_orders`(
   `order_id` int(11) unsigned NOT NULL AUTO_INCREMENT ,
   `order_serialNum` varchar(255) NOT NULL DEFAULT '' COMMENT 'order serial number',
   `product_title` varchar(255) NOT NULL default '',
   `product_image` varchar(255) NOT NULL default '',
   `product_price` decimal(20,2) NOT NULL default 0.00,
   `term_id` int(11) unsigned NOT NULL ,
   `user_id` int(11) unsigned NOT NULL ,
   `addr` varchar(255) NOT NULL default '',
   `name` varchar(255) NOT NULL default '',
   `phone` varchar(255) NOT NULL default '',
   `payment_order_id` int(11) unsigned NOT NULL DEFAULT 0,
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'time that order created',
   `pay_time` timestamp NOT NULL COMMENT 'time that buyer pays the order',
   `total_price` decimal(20,2) NOT NULL COMMENT 'total price',
   `is_paid` boolean not null default 0,
   `is_lucky_order` boolean not null default 0,
   `ip_addr` varchar(255) not null default '',
   `is_active` boolean not null default 1,
   `is_auto_buy` boolean not null default 0,
   `is_point` boolean not null default 0,
   PRIMARY KEY (`order_id`),
   index(`order_serialNum`)
)AUTO_INCREMENT=1 ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT="order main table";

 CREATE TABLE IF NOT EXISTS `db_del_orders`(
   `order_id` int(11) unsigned NOT NULL AUTO_INCREMENT ,
   `order_serialNum` varchar(255) NOT NULL DEFAULT '' COMMENT 'order serial number',
   `product_title` varchar(255) NOT NULL default '',
   `product_image` varchar(255) NOT NULL default '',
   `product_price` decimal(20,2) NOT NULL default 0.00,
   `term_id` int(11) unsigned NOT NULL ,
   `user_id` int(11) unsigned NOT NULL ,
   `addr` varchar(255) NOT NULL default '',
   `name` varchar(255) NOT NULL default '',
   `phone` varchar(255) NOT NULL default '',
   `payment_order_id` int(11) unsigned NOT NULL DEFAULT 0,
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'time that order created',
   `pay_time` timestamp NOT NULL COMMENT 'time that buyer pays the order',
   `total_price` decimal(20,2) NOT NULL COMMENT 'total price',
   `is_paid` boolean not null default 0,
   `is_lucky_order` boolean not null default 0,
   `ip_addr` varchar(255) not null default '',
   `is_active` boolean not null default 1,
   PRIMARY KEY (`order_id`),
   index(`order_serialNum`)
)AUTO_INCREMENT=1 ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT="order main table";

 CREATE TABLE IF NOT EXISTS `db_order_numbers`(
   `number_id` int(11) unsigned NOT NULL AUTO_INCREMENT ,
   `order_id` int(11) unsigned NOT NULL ,
   `term_id` int(11) unsigned NOT NULL ,
   `user_id` int(11) unsigned NOT NULL ,
   `number` int(11) unsigned not null,
   `is_lucky_number` boolean not null default 0,
   `time` timestamp not null default DEFAULT CURRENT_TIMESTAMP,
   `time_sufix` varchar(255) not null default '',
   `rank` int(11) unsigned not null default 0,
   index (`user_id`,`is_lucky_number`,`number`),
   PRIMARY KEY(`number_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB DEFAULT CHARSET=utf8;

 CREATE TABLE IF NOT EXISTS `db_payment_orders`(
   `payment_order_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `user_id` int(11) unsigned NOT NULL,
   `payment_id` int(11) unsigned NOT NULL DEFAULT  0,
   `payment_serial_num` varchar(255) NOT NULL,
   `transaction_id` varchar(255) NOT NULL DEFAULT '',
   `money` decimal(20,2) NOT NULL DEFAULT '0.00',
   `transaction_type` enum('payment','recharge') not null,
   `is_completed` boolean NOT NULL DEFAULT '0' COMMENT '1:completed 0:not completed',
   `is_active` boolean NOT NULL DEFAULT '1',
   `timestamp` timestamp not null default CURRENT_TIMESTAMP,
   `complete_time` timestamp not null default '0000-00-00 00:00:00',
   PRIMARY KEY (`payment_order_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="payment order table";

  CREATE TABLE IF NOT EXISTS `db_del_payment_orders`(
   `payment_order_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `user_id` int(11) unsigned NOT NULL,
   `payment_id` int(11) unsigned NOT NULL DEFAULT  0,
   `payment_serial_num` varchar(255) NOT NULL,
   `transaction_id` varchar(255) NOT NULL DEFAULT '',
   `money` decimal(20,2) NOT NULL DEFAULT '0.00',
   `transaction_type` enum('payment','recharge') not null,
   `is_completed` boolean NOT NULL DEFAULT '0' COMMENT '1:completed 0:not completed',
   `is_active` boolean NOT NULL DEFAULT '1',
   `timestamp` timestamp not null default CURRENT_TIMESTAMP,
   `complete_time` timestamp not null default '0000-00-00 00:00:00',
   PRIMARY KEY (`payment_order_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="payment order table";


 CREATE TABLE IF NOT EXISTS `db_payments`(
   `payment_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `payment` varchar(255) NOT NULL COMMENT 'payment name',
   `unit` varchar(255) not null default '',
   `platform` varchar(255) not null default '',
   `is_online` boolean not NULL ,
   `is_active` boolean NOT NULL DEFAULT '1' COMMENT '1 active , 0 unable',
   `strategy_class_name` varchar(255) not  NULL,
   PRIMARY KEY (`payment_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="payment table";

 CREATE TABLE IF NOT EXISTS `db_announcements`(
   `message_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `title`  varchar(255) NOT NULL,
   `message_url` varchar(255) NOT NULL DEFAULT '',
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `read_count` int(11) NOT NULL DEFAULT 0,
   `is_for_all` boolean not null default 0,
   PRIMARY KEY(`message_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="global internal message";

CREATE TABLE IF NOT EXISTS `db_announcement_user_link`(
   `message_id` int(11) unsigned NOT NULL,
   `user_id` int(11) unsigned NOT NULL ,
   PRIMARY KEY(`message_id`,`user_id`)
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="internal message";

CREATE TABLE IF NOT EXISTS `db_announcement_receiver`(
   `message_id` int(11) unsigned NOT NULL,
   `receiver_id` int(11) unsigned NOT NULL,
   `is_delete` boolean NOT NULL DEFAULT 0,
   `is_shift_delete` boolean NOT NULL DEFAULT 0,
   `is_marked` boolean NOT NULL DEFAULT 0 COMMENT 'is marked by receiver or not',
   `is_read` boolean NOT NULL DEFAULT 0 COMMENT '0:unread 1:read',
   FOREIGN KEY (message_id) references db_announcements(message_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="global internal message link";

CREATE TABLE IF NOT EXISTS `db_countries`(
   `country_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `country_code` varchar(255) NOT NULL,
   `country` varchar(255) NOT NULL ,
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `is_active` boolean not null default 1,
   PRIMARY KEY (`country_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `db_states`(
   `state_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `country_id` int(11) unsigned NOT NULL,
   `state` varchar(255) NOT NULL ,
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `is_active` boolean not null default 1,
   PRIMARY KEY (`state_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `db_cities`(
   `city_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `state_id` int(11) unsigned NOT NULL,
   `city` varchar(255) NOT NULL ,
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `is_active` boolean not null default 1,

   PRIMARY KEY (`city_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `db_regions`(
   `region_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `city_id` int(11) unsigned NOT NULL,
   `region` varchar(255) NOT NULL ,
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `is_active` boolean not null default 1,
   PRIMARY KEY (`region_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `db_term_groups` (
  `group_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `group_name` varchar(255) NOT NULL,
  `tag` varchar(255) not null default '',
  `display_type` varchar(255) not null default '',
  `is_active` boolean not null default 1,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `db_term_group_links` (
  `group_id` int(11) unsigned NOT NULL,
  `term_id` int(11) unsigned NOT NULL,
  `position` int(11) unsigned NOT NULL default 0,
  PRIMARY KEY (`group_id`,`term_id`),
  FOREIGN KEY (`group_id`) REFERENCES `db_term_groups` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`term_id`) REFERENCES `db_terms` (`term_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `db_caipiao` (
  `term_id` varchar(255)  NOT NULL,
  `open_code` varchar(255)  NOT NULL default '',
  `open_time` timestamp not null,
  `is_open` boolean not null default 0,
  PRIMARY KEY (`term_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `db_vars` (
  `var_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `platform` varchar(255)  NOT NULL default '',
  `name` varchar(255)  NOT NULL default '',
  `value` varchar(255) not null default '',
  `storage_time` timestamp not null,
  PRIMARY KEY (`var_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `db_table_rows` (
  `row_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `table_name` varchar(255)  NOT NULL default '',
  `rows` int(11) unsigned NOT NULL,
  PRIMARY KEY (`row_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `db_auto_buy_count` (
  `term_id` int(11) unsigned NOT NULL,
  `count` int(11) unsigned NOT NULL,
  PRIMARY KEY (`term_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `db_auto_buy_schedule` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `money_limit` int(11) unsigned NOT NULL,
  `pre_time` timestamp not null,
  `next_time` timestamp not null,
  `is_allow_auto` boolean not null,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `db_choujiang` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `time` timestamp not null default CURRENT_TIMESTAMP,
  `result` varchar(255) not null default '',
  `tag` varchar(255) not null default '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `db_point_signin` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `time` timestamp not null default CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




alter table db_terms add is_point boolean not null default 0; 
alter table db_terms add code varchar(255) not null default ''; 
alter table db_orders add is_point boolean not null default 0;
alter table db_terms add point int(11) not null default 0;
alter table db_payment_orders  add is_point boolean not null default 0;
insert into db_payments (payment,unit,platform,is_online,strategy_class_name) values ('积分支付','UCLee','WAP',1,'PointPaymentStrategy');
alter table db_oauth_login add is_point_send boolean not null default 0;
CREATE TABLE IF NOT EXISTS `db_point_signin` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `time` timestamp not null default CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
update db_products set is_active=1 where 1;