set foreign_key_checks=0;
###########################user_start#########################
CREATE TABLE IF NOT EXISTS `ck_users` (
   `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `parent_id` int(11) unsigned NOT NULL DEFAULT '0',
   `password` varchar(255) not null,
   PRIMARY KEY (`user_id`)
 ) AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="user table for login and regist";

CREATE TABLE IF NOT EXISTS `ck_oauth_login` (
   `login_id` int(11) unsigned not null AUTO_INCREMENT,
   `oauth_id` varchar(255) NOT NULL,
   `user_id` int(11) unsigned NOT NULL,
   `oauth_name` varchar(255) not null,
   `oauth_access_token` varchar(255) not null,
   `oauth_expires` varchar(255) not null,
   PRIMARY KEY (`login_id`),
   FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade
 ) AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_user_profiles`(
   `profile_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `user_id` int(11) unsigned NOT NULL,
   `identity_card` varchar(255) NOT NULL DEFAULT '',
   `image` varchar(255) NOT NULL default '',
   `email` varchar(128) not null DEFAULT '',
   `phone` varchar(32) NOT NULL DEFAULT '',
   `name` varchar(255) NOT NULL DEFAULT'',
   `gender` ENUM('male','female') NOT NULL , #
   `country` varchar(32) NOT NULL DEFAULT '',
   `state` varchar(32) NOT NULL DEFAULT '',
   `city` varchar(32) NOT NULL DEFAULT '',
   `region` varchar(32) NOT NULL DEFAULT '',
   `addr_detail` varchar(255) NOT NULL DEFAULT'',
   `zipCode` varchar(32) NOT NULL DEFAULT '',
   `login_count` smallint(5) NOT NULL DEFAULT 0,
   `regist_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,    #  regist time
   `is_active` boolean NOT NULL DEFAULT '1', #  1 for active ,0 for disable
   `is_forbidden` boolean NOT NULL DEFAULT '0',
   PRIMARY KEY (`profile_id`),
   index(`user_id`),
   FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="user_profile";


CREATE TABLE IF NOT EXISTS `ck_roles`(
   `role_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `role` varchar(255) NOT NULL ,
   `parent_id` int(11) NOT NULL default '0',
   `is_active` boolean NOT NULL DEFAULT '1',
   `is_in_list` boolean not null default '1',
   PRIMARY KEY(`role_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="role table";

CREATE TABLE IF NOT EXISTS `ck_user_role_link`(
   `user_id` int(11) unsigned NOT NULL,
   `role_id` int(11) unsigned NOT NULL,
   PRIMARY KEY(`role_id`,`user_id`),
   FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade,
   FOREIGN KEY (role_id) references ck_roles(role_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="user role link table";
CREATE TABLE IF NOT EXISTS `ck_permissions`(
   `permission_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `permission` varchar(255) NOT NULL,
   `tag` VARCHAR(255) NOT NULL DEFAULT '',
   `name` varchar(255) NOT NULL,
   `is_active` boolean NOT NULL DEFAULT '1',
   PRIMARY KEY(`permission_id`)
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="permission table";

CREATE TABLE IF NOT EXISTS `ck_role_permission_link`(
   `role_id` int(11) unsigned NOT NULL,
   `permission_id` int(11) unsigned NOT NULL,
   PRIMARY KEY(`role_id`,`permission_id`),
   FOREIGN KEY (permission_id) references ck_permissions(permission_id) on delete cascade on update cascade,
   FOREIGN KEY (role_id) references ck_roles(role_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="user role link table";


CREATE TABLE IF NOT EXISTS `ck_login_history`(
   `history_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `user_id` int(11) unsigned NOT NULL ,
   `login_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP , #   latest login time
   `login_ip` varchar(255) NOT NULL DEFAULT '',
   PRIMARY KEY (`history_id`),
   index(`user_id`),
   FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="user login history";

CREATE TABLE IF NOT EXISTS `ck_deliver_addrs`(
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

CREATE TABLE IF NOT EXISTS `ck_cart_items`(
   `item_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `user_id` int(11) unsigned NOT NULL ,
   `store_id` int(11) unsigned NOT NULL,
   `product_id` int(11) unsigned NOT NULL,
   `combination_id` int(11) unsigned NOT NULL,
   `amount` smallint(8) NOT NULL DEFAULT 0,
   `image_url` varchar(255) not null default '',
   `title` varchar(255) not null default '',
   `timestamp` timestamp not null default CURRENT_TIMESTAMP,
   PRIMARY KEY(`item_id`),
   index(`user_id`,`store_id`,`product_id`),
   FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade,
   FOREIGN KEY (store_id) references ck_stores(store_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="cart product association table";

CREATE TABLE IF NOT EXISTS `ck_favorite_products`(
   `user_id` int(11) unsigned NOT NULL,
   `product_id` int(11) unsigned NOT NULL,
   `title` varchar(255) NOT NULL DEFAULT '',
   `image_url` varchar(255),
   `price` decimal(20,2) NOT null DEFAULT 0.00,
   `create_time` timestamp NOT NULL,
   `lang` varchar(255) NOT NULL,
   PRIMARY KEY(`user_id`,`product_id`,`lang`),
   FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="user favorite goods";

CREATE TABLE IF NOT EXISTS `ck_favorite_stores`(
   `user_id` int(11) unsigned NOT NULL,
   `store_id` int(11) unsigned NOT NULL,
   `store_name` varchar(255) NOT NULL DEFAULT '',
   `store_logo` varchar(255) NOT NULL DEFAULT '',
   `create_time` timestamp NOT NULL default CURRENT_TIMESTAMP,
   FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="user favorite stores";

CREATE TABLE IF NOT EXISTS `ck_financial_account`(
   `account_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `user_id` int(11) unsigned NOT NULL,
   `pay_password` varchar(255) NOT NULL,
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `lock_time` timestamp NOT NULL DEFAULT '2038-01-01 00:00:00',
   `password_enter_count` smallint(8) NOT NULL DEFAULT 0,
   `is_active` boolean NOT NULL DEFAULT '1' COMMENT '1:active ,0:not active',
   `is_pass_modify` boolean NOT NULL DEFAULT 0,
   PRIMARY KEY(`account_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="financial account table";

CREATE TABLE IF NOT EXISTS `ck_safety_problem`(
   `problem_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `problem` varchar(255) NOT NULL,
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   PRIMARY KEY(`problem_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="safety problem set by system";

CREATE TABLE IF NOT EXISTS `ck_safety_problem_answer`(
   `problem_id` int(11) unsigned NOT NULL,
   `user_id` int(11) unsigned NOT NULL,
   `answer` varchar(255) NOT NULL,
   FOREIGN KEY (problem_id) references ck_safety_problem(problem_id) on delete cascade on update cascade,
   FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="financial safety problem and answer set by user";

CREATE TABLE IF NOT EXISTS `ck_financial_safety_problem_answer`(
   `problem_id` int(11) unsigned NOT NULL,
   `user_id` int(11) unsigned NOT NULL,
   `answer` varchar(255) NOT NULL,
   FOREIGN KEY (problem_id) references ck_safety_problem(problem_id) on delete cascade on update cascade,
   FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade,
   index(`user_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="financial safety problem and answer set by user";

CREATE TABLE IF NOT EXISTS `ck_account_balance`(
   `balance_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `account_id` int(11) unsigned NOT NULL,
   `balance` decimal(20,2) NOT NULL DEFAULT '0.00' COMMENT 'available balance',
   `frozen_money` decimal(20,2) NOT NULL DEFAULT '0.00',
   PRIMARY KEY(`balance_id`),
   unique(`account_id`),
   FOREIGN KEY (account_id) references ck_financial_account(account_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="account_balance table";

CREATE TABLE IF NOT EXISTS `ck_bill_balance`(
   `balance_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `account_id` int(11) unsigned NOT NULL,
   `balance` decimal(20,2) NOT NULL DEFAULT '0.00' COMMENT 'available balance',
   `frozen_money` decimal(20,2) NOT NULL DEFAULT '0.00',
   PRIMARY KEY(`balance_id`),
   unique(`account_id`),
   FOREIGN KEY (account_id) references ck_financial_account(account_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="account_balance table";

CREATE TABLE IF NOT EXISTS `ck_recharge`(
   `recharge_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `recharge_serialNum` varchar(255) NOT NULL DEFAULT '' COMMENT 'recharge serial number',
   `account_id` int(11) unsigned NOT NULL,
   `transaction_id` varchar(255) NOT NULL DEFAULT '',
   `payment_id` int(11) NOT NULL,
   `money` decimal(20,2) NOT NULL DEFAULT 0.00,
   `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `is_success` boolean NOT NULL COMMENT '1:success , 0:failed',
   PRIMARY KEY(`recharge_id`),
   FOREIGN KEY (account_id) references ck_financial_account(account_id) on delete cascade on update cascade,
   index(`account_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="recharge table";

CREATE TABLE IF NOT EXISTS `ck_withdraw`(
   `withdraw_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `withdraw_serialNum` varchar(255) NOT NULL DEFAULT '' COMMENT 'withdraw serial number',
   `account_id` int(11) unsigned NOT NULL,
   `currency_code` varchar(255) not null default '',
   `card_num` char(19) NOT NULL,
   `cardholder` varchar(255) NOT NULL DEFAULT '',
   `money` decimal(20,2) NOT NULL DEFAULT 0.00,
   `handling_charge` decimal(20,2) NOT NULL DEFAULT 0.00,
   `apply_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `deal_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
   `operator` varchar(255) NOT NULL DEFAULT '',
   `remittance_num` varchar(255) NOT NULL DEFAULT '',
   `evidence_url` varchar(255) NOT NULL DEFAULT '',
   `reject_reason` varchar(255) NOT NULL DEFAULT '',
   `status` tinyint NOT NULL DEFAULT '1' COMMENT '1check pending 2:success 3:reject',
   `pre_balance` decimal(20,2) NOT NULL default 0.00,
   PRIMARY KEY(`withdraw_id`),
   FOREIGN KEY (account_id) references ck_financial_account(account_id) on delete cascade on update cascade,
   index(`account_id`),
   index(`card_num`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="withdraw table";

CREATE TABLE IF NOT EXISTS `ck_bill_withdraw`(
   `withdraw_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `withdraw_serialNum` varchar(255) NOT NULL DEFAULT '' COMMENT 'withdraw serial number',
   `account_id` int(11) unsigned NOT NULL,
   `card_num` char(19) NOT NULL,
   `cardholder` varchar(255) NOT NULL DEFAULT '',
   `money` decimal(15,6) NOT NULL DEFAULT 0.00,
   `handling_charge` decimal(15,6) NOT NULL DEFAULT 0.00,
   `apply_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `deal_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
   `operator` varchar(255) NOT NULL DEFAULT '',
   `remittance_num` varchar(255) NOT NULL DEFAULT '',
   `evidence_url` varchar(255) NOT NULL DEFAULT '',
   `reject_reason` varchar(255) NOT NULL DEFAULT '',
   `status` tinyint NOT NULL DEFAULT '1' COMMENT '1check pending 2:approved 3:processing 4:success5:reject',
   PRIMARY KEY(`withdraw_id`),
   FOREIGN KEY (account_id) references ck_financial_account(account_id) on delete cascade on update cascade,
   index(`account_id`),
   index(`card_num`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="bill withdraw table";

CREATE TABLE IF NOT EXISTS `ck_currencies` (
  `currency_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `currency_code` varchar(10) NOT NULL,
  `symbol` varchar(30) NOT NULL,
  `exchange_rate` decimal(15,6) NOT NULL,
  `is_primary` boolean NOT NULL DEFAULT 0,
  PRIMARY KEY (`currency_id`),
  UNIQUE KEY `currency_code` (`currency_code`)
) AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="currencies table";


CREATE TABLE IF NOT EXISTS `ck_card_organizations`(
   `organization_code` varchar(255) NOT NULL,
   `organization` varchar(25) NOT NULL,
   `handling_charge` decimal(20,2) NOT NULL,
   PRIMARY KEY(`organization_code`)
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="card_organizations table";

CREATE TABLE IF NOT EXISTS `ck_banks`(
   `bank_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `bank` varchar(25) NOT NULL,
   `is_active` boolean not null default 1,
   PRIMARY KEY(`bank_id`)
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="banks table";


CREATE TABLE IF NOT EXISTS `ck_bank_cards`(
   `card_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `card_num` char(19) NOT NULL ,
   `card_type` enum('deposit_card','credit_card') NOT NULL DEFAULT 'deposit_card',
   `organization_code`  varchar(255) NOT NULL,
   `issuer` varchar(255) NOT NULL DEFAULT '',
   `cardholder` varchar(255) NOT NULL DEFAULT '',
   `expiration_date` date NOT NULL default '0000-00-00 00:00:00',
   `CSC` char(3) NOT NULL DEFAULT '',
   PRIMARY KEY(`card_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="cards table";

CREATE TABLE IF NOT EXISTS `ck_bank_card_user_link`(
   `card_id` int(11) unsigned NOT NULL,
   `user_id` int(11) unsigned NOT NULL,
   `account_id` int(11) unsigned NOT NULL,
   PRIMARY key(`user_id`,`card_id`),
   FOREIGN KEY (card_id) references ck_bank_cards(card_id) on delete cascade on update cascade,
   FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade,
   FOREIGN KEY (account_id) references ck_financial_account(account_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_balance_log`(
   `log_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `account_id` int(11) unsigned not null,
   `payment_serial_num` varchar(255) not null default '',
   `title` varchar(255) NOT NULL DEFAULT '' COMMENT 'log title for trade descrition',
   `operator` varchar(255) NOT NULL DEFAULT '',
   `type` tinyint unsigned NOT NULL COMMENT '1:recharge , 2:withdraw ,3:payment ,4:refund',
   `money` decimal(20,3) NOT NULL,
   `balance` decimal(20,3) NOT NULL,
   `time` timestamp not null default CURRENT_TIMESTAMP,
   `note` varchar(255) NOT NULL DEFAULT '',
   PRIMARY KEY(`log_id`),
    FOREIGN KEY (account_id) references ck_financial_account(account_id) on delete cascade on update cascade,
   Index(`log_id`,`type`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="balance log table";

###########################user_end#########################


###########################cat_type_spe_fea_brand_start#########################

CREATE TABLE IF NOT EXISTS `ck_categories`(
   `category_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `category`  varchar(255) NOT NULL,
   `parent_id` int(11) unsigned NOT NULL DEFAULT 0,
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `weight` int(11) unsigned NOT NULL DEFAULT 0,
   `lang` varchar(255) NOT NULL,
   PRIMARY KEY (`category_id`,`lang`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="all categories defined by system";

CREATE TABLE IF NOT EXISTS `ck_types`(
   `type_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `type` varchar(255) NOT NULL DEFAULT '',
   PRIMARY KEY (`type_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="product types table use to associate categories,features,specifications and brands";

CREATE TABLE IF NOT EXISTS `ck_categories_types`(
   `type_id` int(11) unsigned NOT NULL,
   `category_id` int(11) unsigned NOT NULL,
   PRIMARY KEY (`type_id`,`category_id`),
   FOREIGN KEY (type_id) references ck_types(type_id) on delete RESTRICT on update RESTRICT,
   FOREIGN KEY (category_id) references ck_categories(category_id) on delete RESTRICT on update RESTRICT
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="association table for category and product type";

CREATE TABLE IF NOT EXISTS `ck_features`(
   `feature_id` varchar(255)  NOT NULL ,
   `feature` varchar(255) NOT NULL DEFAULT '',
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `showType` ENUM('checkbox','select') NOT NULL,
   `is_necessary` boolean NOT NULL DEFAULT 1,
   `lang` varchar(255) NOT NULL,
   PRIMARY KEY (`feature_id`,`lang`)
)AUTO_INCREMENT=1 ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT="product features defined by system";
CREATE TABLE IF NOT EXISTS `ck_types_features_link`(
   `feature_id` varchar(255)  NOT NULL,
   `type_id` int(11) unsigned NOT NULL,
   PRIMARY KEY (`feature_id`,`type_id`),
   FOREIGN KEY (feature_id) references ck_features(feature_id) on delete cascade on update cascade,
   FOREIGN KEY (type_id) references ck_types(type_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="association table for types and product features";

CREATE TABLE IF NOT EXISTS `ck_feature_values`(
   `value_id` varchar(255)  NOT NULL,
   `feature_id` varchar(255)  NOT NULL,
   `value` varchar(255) NOT NULL DEFAULT '',
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `lang` varchar(255) NOT NULL,
   PRIMARY KEY (`value_id`,`lang`),
   FOREIGN KEY (feature_id) references ck_features(feature_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT="product feature values defined by system";
CREATE TABLE IF NOT EXISTS `ck_self_features`(
   `self_feature_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `self_feature` varchar(255) NOT NULL DEFAULT '',
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `lang` varchar(255) NOT NULL,
   PRIMARY KEY (`self_feature_id`,`lang`)
)AUTO_INCREMENT=1 ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT="product features defined by merchant";
CREATE TABLE IF NOT EXISTS `ck_self_feature_values`(
   `self_value_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `self_feature_id` int(11) unsigned NOT NULL,
   `self_value` varchar(255) NOT NULL DEFAULT '',
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `lang` varchar(255) NOT NULL,
   PRIMARY KEY (`self_value_id`,`lang`),
   FOREIGN KEY (self_feature_id) references ck_self_features(self_feature_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT="product feature values defined by  merchant";


CREATE TABLE IF NOT EXISTS `ck_specifications`(
   `specification_id` varchar(255)  NOT NULL,
   `specification` varchar(255) NOT NULL DEFAULT '',
   `showType` ENUM('checkbox','select') NOT NULL,
   `displayType` ENUM('horizontal','vertical') NOT NULL,
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `lang` varchar(255) NOT NULL,
   PRIMARY KEY(`specification_id`,`lang`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="product specifications defined by system";
CREATE TABLE IF NOT EXISTS `ck_types_specifications_link`(
   `specification_id` varchar(255)  NOT NULL,
   `type_id` int(11) unsigned NOT NULL,
   PRIMARY KEY (`specification_id`,`type_id`),
   FOREIGN KEY (specification_id) references ck_specifications(specification_id) on delete cascade on update cascade,
   FOREIGN KEY (type_id) references ck_types(type_id) on delete cascade on update cascade
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT="association table for types and product specifications";
CREATE TABLE IF NOT EXISTS `ck_specification_values`(
   `value_id` varchar(255) NOT NULL,
    `specification_id` varchar(255) NOT NULL ,
   `value` varchar(255) NOT NULL DEFAULT '',
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `lang` varchar(255) NOT NULL,
   `tag` varchar(255) not null default '',
   PRIMARY KEY (`value_id`,`lang`),
   FOREIGN KEY (specification_id) references ck_specifications(specification_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="specification value defined by system";
CREATE TABLE IF NOT EXISTS `ck_self_specification_values`(
   `specification_id` varchar(255)  NOT NULL ,
   `hash_code` varchar(255) NOT NULL ,
   `self_value` varchar(255) NOT NULL DEFAULT '',
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `lang` varchar(255) NOT NULL,
   PRIMARY KEY (`hash_code`,`lang`),
   FOREIGN KEY (specification_id) references ck_specifications(specification_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="specification value defined by by merchant";

CREATE TABLE IF NOT EXISTS `ck_brands`(
   `brand_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `brand` varchar(255) NOT NULL ,
   `image_url` varchar(255) NOT NULL DEFAULT '',
   PRIMARY KEY (`brand_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="brand defined by system";


CREATE TABLE IF NOT EXISTS `ck_types_brands_link`(
   `brand_id` int(11) unsigned NOT NULL,
   `type_id` int(11) unsigned NOT NULL,
   PRIMARY KEY (`brand_id`,`type_id`),
   FOREIGN KEY (brand_id) references ck_brands(brand_id) on delete cascade on update cascade,
   FOREIGN KEY (type_id) references ck_types(type_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="association table for types and brands";


###########################cat_type_spe_fea_brand_end#########################

###########################store_start#########################

CREATE TABLE IF NOT EXISTS `ck_stores`(
   `store_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `market_id` int(11) unsigned not null,
   `store_serial_num` varchar(255) NOT NULL ,
   `contract_num` varchar(255) NOT NULL DEFAULT '',
   `user_id`  int (11) unsigned NOT NULL,
   `store` varchar(255) NOT NULL DEFAULT '' unique,
   `is_authenticated` boolean NOT NULL DEFAULT '0',
   `authenticator` VARCHAR(255) NOT NULL DEFAULT '',
   `is_field_authenticated` boolean NOT NULL DEFAULT '0',
   `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `last_modify` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   `is_active` boolean NOT NULL DEFAULT '0',
   `is_in_blacklist` boolean not null default '0',
   `taobao_session` varchar(255) not null default '',
   `taobao_token` varchar(255) not null default '',
   `taobao_info_time` varchar(255) not null default '',
   `taobao_code` varchar(255) not null default '',
   `refresh_token` varchar(255) not null default '',
   `refresh_token_stauts` varchar(255) not null default '',
   `re_exires_in` int(11) unsigned not null default 0,
   `is_price_set` boolean not  null  default  0,
   `reduce_price` decimal(15,2) not null default  0,
   `sync_discount` double(7,2) not null default 50,
   `sync_failed_count` int(11) unsigned not null default 0,
   `is_traditional_store` boolean not null default 0,
   PRIMARY KEY (`store_id`),
   FOREIGN KEY (`user_id`) references ck_users(`user_id`) on delete cascade on update cascade,
   FOREIGN KEY (`market_id`) references ck_markets(`market_id`) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="stores in system";

CREATE TABLE IF NOT EXISTS `ck_store_profiles`(
   `profile_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `store_id` int(11) unsigned NOT NULL,
   `shopkeeper` varchar(255) NOT NULL default '' COMMENT 'shopkeeper name',
   `contact_email` varchar(128) NOT NULL DEFAULT '',
   `logo_url` varchar(255) NOT NULL DEFAULT '',
   `gender` ENUM('male','female') NOT NULL , #
   `phone` varchar(32) NOT NULL DEFAULT '',
   `country` varchar(32) NOT NULL DEFAULT '',
   `state` varchar(32) NOT NULL DEFAULT '',
   `city` varchar(32) NOT NULL DEFAULT '',
   `region` varchar(32) NOT NULL DEFAULT '',
   `market` varchar(255) NOT NULL DEFAULT '',
   `stalls` varchar(255) NOT NULL DEFAULT '',
   `floor` int(11) not null default 0,
   `addr_detail` varchar(255) NOT NULL DEFAULT'',
   `zipCode` varchar(32) NOT NULL DEFAULT '',
   `description` varchar(255) NOT NULL,
   PRIMARY KEY (`profile_id`),
   FOREIGN KEY (`store_id`) references ck_stores(`store_id`) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="stores profile";

CREATE TABLE IF NOT EXISTS `ck_authentication_applications`(
   `application_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `store_id` int(11) unsigned not null,
   `market_id` int(11) unsigned not null,
   `phone` varchar(32) NOT NULL DEFAULT '',
   `name`  varchar(255) NOT NULL,
   `type` ENUM('personal','company') not null,
   `store_name` varchar(255) NOT NULL,
   `stalls` varchar(255) NOT NULL,
   `floor` int(11) not null default 0,
   `id_card_num` varchar(255) not null default '',
   `id_card_front` varchar(255) not null default '',
   `id_card_rear` varchar(255) not null default '',
   `business_licence` varchar(255) not null default '',
   `reject_reason` varchar(255) not null default '',
   PRIMARY KEY(`application_id`),
   FOREIGN KEY (`store_id`) references ck_stores(`store_id`) on delete cascade on update cascade,
   FOREIGN KEY (`market_id`) references ck_markets(`market_id`) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="ck_authentication_applications";

CREATE TABLE IF NOT EXISTS `ck_market_manage_store_record`(
   `record_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `store_id` int(11) unsigned not null,
   `market_id` int(11) unsigned not null,
   `type` enum('blacklist','note') not null,
   `operator` varchar(255) not null ,
   `timestamp` timestamp not null default CURRENT_TIMESTAMP,
   `note` varchar(255) NOT NULL,
   PRIMARY KEY(`record_id`),
   FOREIGN KEY (`store_id`) references ck_stores(`store_id`) on delete cascade on update cascade,
   FOREIGN KEY (`market_id`) references ck_markets(`market_id`) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_return_addrs`(
   `returnAddr_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `store_id` int(11) unsigned NOT NULL ,
   `name` varchar(255) NOT NULL COMMENT 'receiver name',
   `phone` varchar(32) NOT NULL DEFAULT '',
   `country` varchar(32) NOT NULL DEFAULT '',
   `state` varchar(32) NOT NULL DEFAULT '',
   `city` varchar(32) NOT NULL DEFAULT '',
   `region` varchar(32) NOT NULL DEFAULT '',
   `addr_detail` varchar(255) NOT NULL DEFAULT'',
   `zipCode` varchar(32) NOT NULL DEFAULT '',
   `is_default` boolean NOT NULL COMMENT '1:is default, 0:not',
   PRIMARY KEY(`returnAddr_id`),
   FOREIGN KEY (`store_id`) references ck_stores(`store_id`) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="return address";



CREATE TABLE IF NOT EXISTS `ck_store_profiles`(
   `profile_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `store_id` int(11) unsigned NOT NULL,
   `shopkeeper` varchar(255) NOT NULL default '' COMMENT 'shopkeeper name',
   `contact_email` varchar(128) NOT NULL DEFAULT '',
   `logo_url` varchar(255) NOT NULL DEFAULT '',
   `gender` ENUM('male','female') NOT NULL , #
   `phone` varchar(32) NOT NULL DEFAULT '',
   `country` varchar(32) NOT NULL DEFAULT '',
   `state` varchar(32) NOT NULL DEFAULT '',
   `city` varchar(32) NOT NULL DEFAULT '',
   `region` varchar(32) NOT NULL DEFAULT '',
   `market` varchar(255) NOT NULL DEFAULT '',
   `stalls` varchar(255) NOT NULL DEFAULT '',
   `addr_detail` varchar(255) NOT NULL DEFAULT'',
   `zipCode` varchar(32) NOT NULL DEFAULT '',
   `description` varchar(255) NOT NULL,
   PRIMARY KEY (`profile_id`),
   FOREIGN KEY (`store_id`) references ck_stores(`store_id`) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="stores profile";

CREATE TABLE IF NOT EXISTS `ck_companies`(
   `company_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `store_id` int(11) unsigned NOT NULL,
   `company` varchar(255) NOT NULL DEFAULT '' COMMENT 'company_name',
   `registered_address` varchar(255) NOT NULL DEFAULT '',
   `registered_capital` varchar(255) NOT NULL DEFAULT '',
   `registered_date` varchar(255) NOT NULL DEFAULT '',
   `registered_code` varchar(255) NOT NULL DEFAULT '',
   `legal_person` varchar(255) NOT NULL DEFAULT '',
   `registered_institution` varchar(255) NOT NULL DEFAULT '',
   `enterprise_type` varchar(255) NOT NULL DEFAULT '',
   `term_of_business` varchar(255) NOT NULL DEFAULT '',
   `annual_inspection_time` varchar(255) not NULL DEFAULT '',
   `scale` varchar(32) NOT NULL DEFAULT '',
    PRIMARY KEY (`company_id`),
   FOREIGN KEY (`store_id`) references ck_stores(`store_id`) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="company profile";



CREATE TABLE IF NOT EXISTS `ck_store_top_images`(
   `store_id` int(11) unsigned NOT NULL ,
   `image_url` varchar(255) NOT NULL,
   FOREIGN KEY (`store_id`) references ck_stores(`store_id`) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="stores top image";

CREATE TABLE IF NOT EXISTS `ck_store_banners`(
   `banner_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `store_id` int(11) unsigned NOT NULL,
   `title` varchar(255) NOT NULL ,
   `image_url` varchar(255) NOT NULL,
   `url` varchar(255) NOT NULL DEFAULT '',
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `is_active` boolean NOT NULL default '1',
   PRIMARY KEY(`banner_id`),
   FOREIGN KEY (`store_id`) references ck_stores(`store_id`) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="stores homepage banner";

CREATE TABLE IF NOT EXISTS `ck_banners`(
   `banner_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `title` varchar(255) NOT NULL ,
   `image_url` varchar(255) NOT NULL,
   `url` varchar(255) NOT NULL DEFAULT '',
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `is_active` boolean NOT NULL default '1',
   PRIMARY KEY(`banner_id`)
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="system homepage banner";

CREATE TABLE IF NOT EXISTS `ck_image_zones`(
   `zone_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `user_id` int(11) unsigned NOT NULL,
   `store_id` int(11) unsigned NOT NULL,
   PRIMARY KEY(`zone_id`),
   FOREIGN KEY (`store_id`) references ck_stores(`store_id`) on delete cascade on update cascade,
   FOREIGN KEY (`user_id`) references ck_users(`user_id`) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="image zone for user";

CREATE TABLE IF NOT EXISTS `ck_image_albums`(
   `album_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `parent_album_id` int(11) unsigned NOT NULL DEFAULT 0,
   `zone_id` int(11) unsigned NOT NULL ,
   `album_name` varchar(255) NOT NULL DEFAULT '' ,
   `is_default` boolean NOT NULL DEFAULT '0' COMMENT '1 default , 0 new',
   PRIMARY KEY (`album_id`),
   FOREIGN KEY (`zone_id`) references ck_image_zones(`zone_id`) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="zone album";

CREATE TABLE IF NOT EXISTS `ck_zone_images`(
   `image_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `album_id` int(11) unsigned NOT NULL,
   `image_url` varchar(255) NOT NULL,
   `is_cover` boolean NOT NULL DEFAULT '0' COMMENT '1 is album cover , 0 is not',
   `title` varchar(255) NOT NULL default '',
   PRIMARY KEY(`image_id`),
   FOREIGN KEY (`album_id`) references ck_image_albums(`album_id`) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="zone images";

CREATE TABLE IF NOT EXISTS `ck_self_categories`(
   `self_category_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `self_category` varchar(255) NOT NULL DEFAULT '',
   `store_id` int(11) unsigned NOT NULL ,
   `is_leaf` boolean NOT NULL DEFAULT 1,
   `parent_id` int(11) unsigned NOT NULL DEFAULT 0,
   `level` tinyint unsigned NOT NULL DEFAULT 1,
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `weight` int(11) unsigned NOT NULL DEFAULT 0,
   PRIMARY KEY (`self_category_id`),
   FOREIGN KEY (store_id) references ck_stores(store_id) on delete RESTRICT on update RESTRICT
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="categories defined by merchant";

CREATE TABLE IF NOT EXISTS `ck_business_scope`(
   `store_id` int(11) unsigned NOT NULL,
   `category_id` int(11) unsigned NOT NULL,
   PRIMARY KEY (`store_id`,`category_id`),
   FOREIGN KEY (category_id) references ck_categories(category_id) on delete cascade on update cascade,
   FOREIGN KEY (store_id) references ck_stores(store_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="business scope that store contains";

###########################store_end#########################


###########################product_start#########################

CREATE TABLE IF NOT EXISTS `ck_products` (
   `product_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `num_iid` varchar(255) not null default '',
   `store_id` int(11) unsigned NOT NULL,
   `brand_id` int(11) unsigned NOT NULL default 0,
   `unit_id` int(11) unsigned NOT NULL ,
   `is_approved` boolean NOT NULL DEFAULT '1',  #  1 for approved ,0 for disapproved
   `is_active` boolean NOT NULL DEFAULT '0',#   1 for active ,0 for disable
   `status` ENUM('frozen','normal','deleted') default 'normal',
   `timestamp` timestamp not null DEFAULT CURRENT_TIMESTAMP, # create time
   `list_price` decimal(20,2) NOT null DEFAULT 0.00, #   Manufacturer's suggested retail price
   `title` varchar(255) NOT NULL DEFAULT '', #  product's title
   `product_num` varchar(255) NOT NULL DEFAULT '' COMMENT 'number for vendor',
   `self_coding_num` varchar(255) NOT NULL default '',
   `feature_file` varchar(255) NOT NULL DEFAULT '', #  url of product's desc
   `description` varchar(255) NOT NULL DEFAULT '', #  url of product's desc
   `sale_mode` ENUM('normal','wholesale') NOT NULL DEFAULT 'normal',
   `active_time` timestamp NOT NULL DEFAULT '2036-01-01 00:00:00',
   `score` double(2,1) NOT NULL DEFAULT '5.0' COMMENT 'evaluate average scores',
   `last_modify` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP ,
   `is_translated` boolean not NULL DEFAULT '0',
   `is_for_member` boolean not null default 0,
   `is_xin` boolean not null default 0,
   `is_sku_price` boolean not null DEFAULT 0,
   `is_sync_success` boolean not null default 0,
   `lang` varchar(255) NOT NULL,
   PRIMARY KEY (`product_id`,`lang`),
   FOREIGN KEY (store_id) references ck_stores(store_id) on delete cascade on update cascade
 ) AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="product info";

CREATE TABLE IF NOT EXISTS `ck_special_product_info`(
   `product_id` int(11) unsigned NOT NULL,
   `information` varchar(255) NOT NULL DEFAULT '',
   PRIMARY KEY(`product_id`)
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="product info";

CREATE TABLE IF NOT EXISTS `ck_unit_of_measurement`(
   `unit_id` int(11) unsigned not NULL AUTO_INCREMENT,
   `unit` varchar(255) NOT NULL ,
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `lang` varchar(255) NOT NULL,
   PRIMARY KEY(`unit_id`,`lang`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="unit of measurement";

CREATE TABLE IF NOT EXISTS `ck_unit_of_sale`(
   `sale_unit_id` int(11) unsigned not NULL AUTO_INCREMENT,
   `sale_unit` varchar(255) NOT NULL ,
   `default_amount` int(11) NOT NULL DEFAULT 1,
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `lang` varchar(255) NOT NULL,
   PRIMARY KEY(`sale_unit_id`,`lang`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="unit of sale";

CREATE TABLE IF NOT EXISTS `ck_product_sale_unit_link`(
	`product_id` int(11) unsigned NOT NULL,
	`sale_unit_id` int(11) unsigned NOT NULL,
	`unit_amount` int(11) unsigned NOT NULL DEFAULT '1',
	PRIMARY KEY(`product_id`,`sale_unit_id`),
	FOREIGN KEY (product_id) references ck_products(product_id) on delete cascade on update cascade,
	FOREIGN KEY (sale_unit_id) references ck_unit_of_sale(sale_unit_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="unit of sale";

CREATE TABLE IF NOT EXISTS `ck_product_images_link`(
   `link_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `product_id` int(11) unsigned NOT NULL ,
   `image_url` varchar(255) NOT NULL DEFAULT '',
   `is_master` boolean NOT NULL DEFAULT '0',
   PRIMARY KEY(`link_id`),
   FOREIGN KEY (product_id) references ck_products(product_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="association table for product and it's image";


CREATE TABLE IF NOT EXISTS `ck_products_categories_link`(
	`product_id` int(11) unsigned NOT NULL,
	`category_id` int(11) unsigned NOT NULL,
   `is_primary` boolean NOT NULL DEFAULT 0,
	PRIMARY KEY (`product_id`,`category_id`),
   index(`product_id`),
   FOREIGN KEY (product_id) references ck_products(product_id) on delete cascade on update cascade,
   FOREIGN KEY (category_id) references ck_categories(category_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="association table for product and system defined categories";

CREATE TABLE IF NOT EXISTS `ck_products_features_values_link`(
   `feature_id` varchar(255)  NOT NULL,
   `product_id` int(11) unsigned NOT NULL,
   `value_id`  varchar(255)  NOT NULL,
   PRIMARY KEY (`feature_id`,`product_id`,`value_id`),
   index(`product_id`),
   FOREIGN KEY (product_id) references ck_products(product_id) on delete cascade on update cascade,
   FOREIGN KEY (feature_id) references ck_features(feature_id) on delete cascade on update cascade,
   FOREIGN KEY (value_id) references ck_feature_values(value_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="association table for product,feature and feature value";
CREATE TABLE IF NOT EXISTS `ck_products_self_features_values_link`(
   `self_feature_id` int(11) unsigned NOT NULL,
   `product_id` int(11) unsigned NOT NULL,
   `self_value_id` int(11) unsigned NOT NULL,
   PRIMARY KEY (`self_feature_id`,`product_id`,`self_value_id`) ,
   index(`product_id`),
   FOREIGN KEY (product_id) references ck_products(product_id) on delete cascade on update cascade,
   FOREIGN KEY (self_feature_id) references ck_self_features(self_feature_id) on delete cascade on update cascade,
   FOREIGN KEY (self_value_id) references ck_self_feature_values(self_value_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="association table for product,feature and feature value defined by merchant";

CREATE TABLE IF NOT EXISTS `ck_product_keywords`(
   `keyword_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `product_id` int(11) unsigned NOT NULL,
   `keyword` varchar(255) NOT NULL DEFAULT '',
   `weight` int(11) unsigned NOT NULL DEFAULT 0,
   `lang` varchar(255) NOT NULL,
   index(`keyword_id`,`product_id`,`lang`),
   PRIMARY KEY (`keyword_id`,`lang`),
   FOREIGN KEY (product_id) references ck_products(product_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="product keyword defined when adding product";

CREATE TABLE IF NOT EXISTS `ck_product_prices` (
   `price_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `product_id` int(11) unsigned NOT NULL,
   `price` decimal(20,2) NOT null DEFAULT 0.00, #	price
   `amount_limit` smallint(5) unsigned NOT NULL DEFAULT 0, #	amount limit request for this price
   PRIMARY KEY (`price_id`),
   index(`product_id`),
   FOREIGN KEY (product_id) references ck_products(product_id) on delete cascade on update cascade
 ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="product price list ";

CREATE TABLE IF NOT EXISTS `ck_product_prices_RMB` (
   `price_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `product_id` int(11) unsigned NOT NULL,
   `price` decimal(20,2) NOT null DEFAULT 0.00, #  price
   `amount_limit` smallint(5) unsigned NOT NULL DEFAULT 0, #   amount limit request for this price
   PRIMARY KEY (`price_id`),
   index(`product_id`),
   FOREIGN KEY (product_id) references ck_products(product_id) on delete cascade on update cascade
 ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="product price  RMB list ";

CREATE TABLE IF NOT EXISTS `ck_product_purchase_prices` (
   `price_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `product_id` int(11) unsigned NOT NULL,
   `price` decimal(20,2) NOT null DEFAULT 0.00, #  price
   `amount_limit` smallint(5) unsigned NOT NULL DEFAULT 0, #   amount limit request for this price
   PRIMARY KEY (`price_id`),
   index(`product_id`),
   FOREIGN KEY (product_id) references ck_products(product_id) on delete cascade on update cascade
 ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="product price list ";

CREATE TABLE IF NOT EXISTS `ck_products_specifications_values_link`(
   `specification_id` varchar(255)  NOT NULL,
   `product_id` int(11) unsigned NOT NULL,
   `value_id` varchar(255)  NOT NULL,
   `image_url` varchar(255) NOT NULL default '',
   PRIMARY KEY (`specification_id`,`product_id`,`value_id`) ,
   index(`product_id`),
   FOREIGN KEY (specification_id) references ck_specifications(specification_id) on delete cascade on update cascade,
   FOREIGN KEY (value_id) references ck_specification_values(value_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="association table for product,specifications and specification value ";
CREATE TABLE IF NOT EXISTS `ck_products_self_specifications_values_link`(
   `specification_id` varchar(255)  NOT NULL,
   `product_id` int(11) unsigned NOT NULL,
   `hash_code` varchar(255) NOT NULL DEFAULT '',
   `image_url` varchar(255) NOT NULL default '',
   PRIMARY KEY (`specification_id`,`product_id`,`hash_code`) ,
   index(`product_id`),
   FOREIGN KEY (specification_id) references ck_specifications(specification_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="association table for product,specifications and specifications value defined by merchant";

CREATE TABLE IF NOT EXISTS `ck_specification_combinations`(
   `combination_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `product_id` int(11) unsigned NOT NULL,
   `combination` varchar(255) NOT NULL ,
   `amount` int(11) unsigned NOT NULL DEFAULT 0,
   `product_code` varchar(255) NOT NULL DEFAULT '',
   `price` decimal(15,2) not null,
   `created` timestamp not null default CURRENT_TIMESTAMP,
   `modified` timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
   `num_iid` int(11) unsigned not null default 0,
   `extra_id` int(11) unsigned not  null default 0,
   `sku_id` varchar(255) not null default '',
   `sku_spec_id` int(11) unsigned not null default 0,
   `with_hold_quantity` int(11) unsigned not null default 0,
   PRIMARY  KEY (`combination_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="specifications combination table";
###########################product_end#########################


###########################order_start#########################

CREATE TABLE IF NOT EXISTS `ck_payment_orders`(
   `payment_order_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `user_id` int(11) unsigned NOT NULL,
   `payment_id` int(11) unsigned NOT NULL DEFAULT  0,
   `payment_serial_num` varchar(255) NOT NULL,
   `transaction_id` varchar(255) NOT NULL DEFAULT '',
   `money` decimal(20,2) NOT NULL DEFAULT '0.00',
   `balance_money_mix_pay` decimal(20,2) not null default '0.00',
   `shipping_cost` decimal(20,2) NOT NULL DEFAULT '0.00' COMMENT 'shipping cost of this order',
   `transaction_type` enum('payment','recharge','elecRecharge','fastPayment') not null,
   `is_completed` boolean NOT NULL DEFAULT '0' COMMENT '1:completed 0:not completed',
   `is_active` boolean NOT NULL DEFAULT '1',
   `is_mix_pay` boolean not null default '0',
   `timestamp` timestamp not null default CURRENT_TIMESTAMP,
   PRIMARY KEY (`payment_order_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="payment order table";

CREATE TABLE IF NOT EXISTS `ck_orders`(
   `order_id` int(11) unsigned NOT NULL AUTO_INCREMENT ,
   `profit_market_id` INT(12) NOT NULL default 0,
   `profit_store_id` INT(12) NOT NULL default 0,
   `order_serialNum` varchar(255) NOT NULL DEFAULT '' COMMENT 'order serial number',
   `buyer_id` int(11) unsigned NOT NULL ,
   `seller_id` int(11) unsigned NOT NULL default 0,
   `payment_order_id` int(11) unsigned NOT NULL DEFAULT 0,
   `shipping_id` int(11) unsigned NOT NULL DEFAULT 0,
   `deliverAddr_id` int(11) unsigned NOT NULL,
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'time that order created',
   `pay_time` timestamp NOT NULL COMMENT 'time that buyer pays the order',
   `pay_message` varchar(255) NOT NULL DEFAULT '' COMMENT 'the message leave by customer',
   `shipping_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'time that seller deliver the goods',
   `shipping_code` varchar(64) NOT null COMMENT 'logistic code',
   `complete_time` timestamp NOT NULL  DEFAULT '0000-00-00 00:00:00' COMMENT 'time that the order complete',
   `shipping_cost` decimal(20,2) NOT NULL DEFAULT '0.00' COMMENT 'shipping cost of this order',
   `total_price` decimal(20,2) NOT NULL COMMENT 'total price',
   `is_commented` boolean NOT NULL COMMENT '1:has commented 0:has not commented' DEFAULT 0,
   `is_settled` boolean NOT NULL DEFAULT 0,
   `status` tinyint NOT NULL DEFAULT '1' COMMENT '1 unpaid ,2waiting payment by logistics company,3 awaiting shipment(paid) , 4 shipped(waiting for receipt) ,   5success(complete but not comment) , 6 closed ',
   `dispute_status` tinyint NOT NULL DEFAULT '1' COMMENT '1:none , 2:cooka dispute',
   `distribute_status` tinyint NOT NULL DEFAULT '1' COMMENT '1:未分账，2，已分账,3:无分账',
   `risk_tag` enum('normal','common','serious') not null default 'normal',
   `is_risk_block` boolean not null default 0,
   `logistic_company_code` varchar(255) not null default '',
   `is_verified` boolean not null default 0,
   PRIMARY KEY (`order_id`),
   index(`order_serialNum`)
)AUTO_INCREMENT=1 ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT="order main table";

CREATE TABLE IF NOT EXISTS `ck_cancel_order_reason`(
   `reason_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `order_id` int(11) unsigned NOT NULL,
   `reason` varchar(255) NOT NULL DEFAULT '',
   `type` tinyint NOT NULL ,
   `description` varchar(255) NOT NULL DEFAULT '',
   PRIMARY KEY(`reason_id`),
   FOREIGN KEY (order_id) references ck_orders(order_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="cancel order reason";

CREATE TABLE IF NOT EXISTS `ck_order_items`(
   `item_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `item_serial_num` varchar(255) NOT NULL DEFAULT '',
   `order_id` int(11) unsigned NOT NULL ,
   `store_id` int(11) unsigned NOT NULL,
   `product_id` int(11) unsigned NOT NULL,
   `product_num` varchar(255) NOT NULL DEFAULT '',
   `image_url` varchar(255) NOT NULL DEFAULT '',
   `combination_id` int(11) unsigned NOT NULL,
   `amount` smallint(8) NOT NULL DEFAULT 0,
   `price` decimal(20,2) NOT NULL COMMENT 'unit-price',
   `real_price` decimal(20,2) NOT NULL COMMENT 'unit-price',
   `is_in_stock` boolean NOT NULL default 1,
   `is_confirmed` boolean NOT NULL default 0,
   `status` ENUM('normal','return','refund','returnSuccess','refundSuccess') NOT NULL DEFAULT 'normal',
   `dispute_progress` tinyint NOT NULL DEFAULT 0,
   PRIMARY KEY(`item_id`),
   index(`order_id`),
   FOREIGN KEY (order_id) references ck_orders(order_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="order product association table";

CREATE TABLE IF NOT EXISTS `ck_order_item_snap`(
   `item_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `title` varchar(255) NOT NULL DEFAULT '', #  product's title
   `feature_file` varchar(255) NOT NULL DEFAULT '',
   `description_file` varchar(255) NOT NULL DEFAULT '',
   `lang` varchar(255) NOT NULL ,
   PRIMARY KEY(`item_id`,`lang`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="order item chinese snap table";

CREATE TABLE IF NOT EXISTS `ck_orders_stores_items_link`(
   `order_id` int(11) unsigned NOT NULL ,
   `store_id` int(11) unsigned NOT NULL ,
   `item_id` int(11) unsigned NOT NULL,
   `product_id` int(11) unsigned NOT NULL,
   index(`order_id`,`store_id`,`product_id`,`item_id`),
   PRIMARY KEY(`order_id`,`store_id`,`product_id`,`item_id`),
   FOREIGN KEY (order_id) references ck_orders(order_id) on delete cascade on update cascade,
   FOREIGN KEY (store_id) references ck_stores(store_id) on delete cascade on update cascade,
   FOREIGN KEY (item_id) references ck_order_items(item_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="order store product items association table";



CREATE TABLE IF NOT EXISTS `ck_cooka_offices`(
   `office_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `name` varchar(255) NOT NULL DEFAULT '',
   `phone` varchar(32) NOT NULL DEFAULT '',
   `country` varchar(32) NOT NULL DEFAULT '',
   `state` varchar(32) NOT NULL DEFAULT '',
   `city` varchar(32) NOT NULL DEFAULT '',
   `region` varchar(32) NOT NULL DEFAULT '',
   `addr_detail` varchar(255) NOT NULL DEFAULT'',
   `is_active` boolean NOT NULL DEFAULT 1,
   PRIMARY KEY(`office_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE  TABLE IF NOT EXISTS `ck_cooka_office_user_link`(
   `office_id` int(11) unsigned NOT NULL,
   `user_id` int(11) unsigned NOT NULL,
   PRIMARY KEY(`office_id`,`user_id`),
   FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade,
   FOREIGN KEY (office_id) references ck_cooka_offices(office_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `ck_payments`(
   `payment_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `payment` varchar(255) NOT NULL COMMENT 'payment name',
   `unit` varchar(255) not null default '',
   `platform` varchar(255) not null default '',
   `is_online` boolean not NULL ,
   `is_active` boolean NOT NULL DEFAULT '1' COMMENT '1 active , 0 unable',
   `strategy_class_name` varchar(255) not  NULL,
   PRIMARY KEY (`payment_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="payment table";

CREATE TABLE IF NOT EXISTS `ck_logistic_companies`(
	`company_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
   `company_code` varchar(255) not null default '',
	`phone` varchar(32) NOT NULL DEFAULT '',
	`position` smallint(5) unsigned NOT NULL DEFAULT 0,
	PRIMARY KEY(`company_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="logistic companies table";
CREATE TABLE IF NOT EXISTS `ck_logistic_company_units`(
   `unit_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `company_id` int(11) unsigned NOT NULL ,
   `name` varchar(255) NOT NULL DEFAULT '',
   `phone` varchar(32) NOT NULL DEFAULT'',
   `country` varchar(32) NOT NULL DEFAULT '',
   `state` varchar(32) NOT NULL DEFAULT '',
   `city` varchar(32) NOT NULL DEFAULT '',
   `region` varchar(32) NOT NULL DEFAULT '',
   `addr_detail` varchar(255) NOT NULL DEFAULT'',
   `is_domestic` boolean NOT NULL DEFAULT 0,
   PRIMARY KEY(`unit_id`),
   FOREIGN KEY (company_id) references ck_logistic_companies(company_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="logistic companies address table";

CREATE TABLE IF NOT EXISTS `ck_logistic_companies_units_user_link`(
   `unit_id` int(11) unsigned NOT NULL,
   `user_id` int(11) unsigned NOT NULL,
   PRIMARY key(`unit_id`,`user_id`),
   FOREIGN KEY (unit_id) references ck_logistic_company_units(unit_id) on delete cascade on update cascade,
   FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="logistic companies user link table";

CREATE TABLE IF NOT EXISTS `ck_shipping_template`(
   `template_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `shipping` varchar(255) NOT NULL COMMENT 'shipping name',
   `company_id` int(11) unsigned NOT NULL,
   `currency_code` varchar(255) NOT NULL ,
   `charge_mode` ENUM('list','addition') NOT NULL,
   `start_point` varchar(255) NOT NULL ,
   `status` boolean NOT NULL DEFAULT '1' COMMENT '1 active , 0 unable',
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `unit` varchar(255) NOT NULL DEFAULT '',
   `unit_type` varchar(255) NOT NULL DEFAULT '',
   PRIMARY KEY(`template_id`),
   FOREIGN KEY (company_id) references ck_logistic_companies(company_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="shipping provide by system";

CREATE TABLE IF NOT EXISTS `ck_charge_gradient`(
   `charge_id` int(11) unsigned NOT NULL AUTO_INCREMENT	,
   `template_id` int(11) unsigned NOT NULL,
   `destination` varchar(255) NOT NULL ,
   `deliver_time` varchar(255) NOT NULL ,
   `amount_limit` double(10,2) NOT NULL,
   `price` decimal(20,2) not NULL,
   PRIMARY KEY(`charge_id`),
   FOREIGN KEY (template_id) references ck_shipping_template(template_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="shipping charge by list ";

CREATE TABLE IF NOT EXISTS `ck_charge_renewal`(
	`charge_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
	`template_id` int(11) unsigned NOT NULL ,
	`destination` varchar(255) NOT NULL ,
   `deliver_time` varchar(255) NOT NULL ,
	`first` double(10,2) NOT NULL,
	`first_price` decimal(20,2) NOT NULL,
	`addition` double(10,2) NOT NULL,
	`addition_price` decimal(20,2) NOT NULL,
	PRIMARY KEY(`charge_id`),
	FOREIGN KEY (template_id) references ck_shipping_template(template_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="shipping charge by additional unit";

CREATE TABLE IF NOT EXISTS `ck_shipping_template_unit`(
	`unit_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
	`unit` varchar(255) NOT NULL,
	`position` smallint(5) unsigned NOT NULL DEFAULT 0,
	PRIMARY KEY(`unit_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="shipping unit";


###########################order_end#########################

###########################comment_start#########################

CREATE TABLE IF NOT EXISTS `ck_comments`(
   `comment_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `group_id` int(11) unsigned NOT NULL,
   `user_id` int(11) unsigned NOT NULL,
   `user_name` varchar(255) NOT NULL DEFAULT '',
   `scores` smallint(5) unsigned NOT NULL default 5,
   `comment` varchar(512) NOT NULL DEFAULT '',
   `comment_type` smallint(5) unsigned NOT NULL DEFAULT 1 COMMENT '1 good reputation , 2 meidunm reputation . 3 bad reptation',
   `desc_fits` smallint(5) unsigned NOT NULL DEFAULT 0 COMMENT 'star level: descrition in conformity with products',
   `attitude` smallint(5) unsigned NOT NULL DEFAULT 0 COMMENT 'star level: store attitude',
   `deliver_speed` smallint(5) unsigned NOT NULL DEFAULT 0 COMMENT 'star level: deliver speed',
   `comment_by` ENUM('buyer','seller') NOT NULL,
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `is_first` boolean NOT NULL DEFAULT 0,
   PRIMARY KEY(`comment_id`),
   index(`user_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="goods comment table";

CREATE TABLE IF NOT EXISTS `ck_comment_product_order_link` (
  `group_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(11) unsigned NOT NULL,
  `order_serialNum` varchar(255) NOT NULL,
  PRIMARY KEY(`group_id`),
  index(`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='comment order link';

###########################comment_end#########################

###########################url_validity_start#########################
CREATE TABLE IF NOT EXISTS `ck_url_validity`(
   `validity_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `user_id` int(11) unsigned NOT NULL,
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY key(`validity_id`),
   FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="url validity table";

###########################url_validity_end#########################

###########################message_start#########################
CREATE TABLE IF NOT EXISTS `ck_internal_messages`(
   `message_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `parent_id` int(11) unsigned NOT NULL,
   `sender_id` int(11) unsigned NOT NULL,
   `receiver_id` int(11) unsigned NOT NULL,
   `title`  varchar(255)  NOT NULL,
   `message` varchar(255) NOT NULL DEFAULT '',
   `is_sender_delete` boolean NOT NULL DEFAULT 0,
   `is_receiver_delete` boolean NOT NULL DEFAULT 0,
   `is_sender_shift_delete` boolean  NOT NULL DEFAULT 0,
   `is_receiver_shift_delete` boolean NOT NULL DEFAULT 0,
   `is_marked` boolean NOT NULL DEFAULT 0 COMMENT 'is marked by receiver or not',
   `is_read` boolean NOT NULL DEFAULT 0 COMMENT '0:unread 1:read',
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY(`message_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="internal message";

CREATE TABLE IF NOT EXISTS `ck_announcements`(
   `message_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `title`  varchar(255) NOT NULL,
   `message_url` varchar(255) NOT NULL DEFAULT '',
   `type` tinyint unsigned NOT NULL,
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `start_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
   `end_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
   `read_count` int(11) NOT NULL DEFAULT 0,
   PRIMARY KEY(`message_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="global internal message";

CREATE TABLE IF NOT EXISTS `ck_announcement_role_link`(
   `message_id` int(11) unsigned NOT NULL,
   `role_id` int(11) unsigned NOT NULL ,
   PRIMARY KEY(`message_id`,`role_id`)
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="global internal message";

CREATE TABLE IF NOT EXISTS `ck_announcement_receiver`(
   `message_id` int(11) unsigned NOT NULL,
   `receiver_id` int(11) unsigned NOT NULL,
   `is_delete` boolean NOT NULL DEFAULT 0,
   `is_shift_delete` boolean NOT NULL DEFAULT 0,
   `is_marked` boolean NOT NULL DEFAULT 0 COMMENT 'is marked by receiver or not',
   `is_read` boolean NOT NULL DEFAULT 0 COMMENT '0:unread 1:read',
   FOREIGN KEY (message_id) references ck_announcements(message_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="global internal message link";

CREATE TABLE IF NOT EXISTS `ck_feedbacks`(
   `feedback_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `user_id` int(11) unsigned NOT NULL,
   `market_id` int(11) unsigned NOT NULL default 0,
   `handler_name` varchar(255) not null default '',
   `title` varchar(255) NOT NULL DEFAULT '',
   `content`  varchar(255) NOT NULL DEFAULT '',
   `email` varchar(255) NOT NULL DEFAULT '',
   `type` varchar(255) NOT NULL DEFAULT '',
   `is_read` boolean NOT NULL DEFAULT 0,
   `is_deal` boolean NOT NULL DEFAULT 0,
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `note` varchar(255) not null default '',
   index(`type`),
   PRIMARY KEY(`feedback_id`),
   FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;

###########################message_end#########################

###########################location_start#########################
CREATE TABLE IF NOT EXISTS `ck_countries`(
   `country_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `country_code` varchar(255) NOT NULL,
   `country` varchar(255) NOT NULL ,
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `is_active` boolean not null default 1,
   `lang` varchar(255) NOT NULL,
   PRIMARY KEY (`country_id`,`lang`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_states`(
   `state_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `country_id` int(11) unsigned NOT NULL,
   `state` varchar(255) NOT NULL ,
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `is_active` boolean not null default 1,
   `lang` varchar(255) NOT NULL,
   PRIMARY KEY (`state_id`,`lang`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_cities`(
   `city_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `state_id` int(11) unsigned NOT NULL,
   `city` varchar(255) NOT NULL ,
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `is_active` boolean not null default 1,
   `lang` varchar(255) NOT NULL,
   PRIMARY KEY (`city_id`,`lang`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_regions`(
   `region_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `city_id` int(11) unsigned NOT NULL,
   `region` varchar(255) NOT NULL ,
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `is_active` boolean not null default 1,
   `lang` varchar(255) NOT NULL,
   PRIMARY KEY (`region_id`,`lang`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_markets`(
   `market_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `user_id` int(11) unsigned NOT NULL,
   `state_id` int(11) unsigned NOT NULL,
   `city_id` int(11) unsigned NOT NULL,
   `region_id` int(11) unsigned NOT NULL,
   `market` varchar(255) NOT NULL ,
   `person_in_charge` varchar(255) not null ,
   `phone` varchar(32) not null,
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `is_active` boolean not null default 1,
   `lang` varchar(255) NOT NULL,
   PRIMARY KEY (`market_id`,`lang`),
   FOREIGN KEY(`user_id`) references ck_users(`user_id`) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;



CREATE TABLE IF NOT EXISTS `ck_stalls`(
   `stall_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `market_id` int(11) unsigned NOT NULL,
   `stall` varchar(255) NOT NULL ,
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `is_active` boolean not null default 1,
   `lang` varchar(255) NOT NULL,
   PRIMARY KEY (`stall_id`,`lang`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;
###########################location_end#########################

###########################ad###########################
CREATE TABLE IF NOT EXISTS `ck_advertisement_positions`(
	`position_id` int(11) unsigned not NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL default '',
	`template_code` varchar(255) NOT NULL ,
	`ad_amount` int(11) unsigned NOT NULL,
	`description` varchar(255) NOT NULL DEFAULT '',
	unique(`template_code`),
	PRIMARY KEY(`position_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_advertisement_groups`(
   `group_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `position_id` int(11) unsigned NOT NULL,
   `name` varchar(255) NOT NULL DEFAULT '',
   `description` varchar(255) NOT NULL DEFAULT '',
   `is_default` boolean NOT NULL DEFAULT 0,
   PRIMARY KEY(`group_id`),
   FOREIGN KEY(`position_id`) references ck_advertisement_positions(`position_id`) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_advertisement_groups_categories_link`(
   `group_id` int(11) unsigned NOT NULL,
   `category_id` int(11) unsigned NOT NULL,
   PRIMARY KEY(`group_id`,`category_id`),
   FOREIGN KEY(`group_id`) references ck_advertisement_groups(`group_id`) on delete cascade on update cascade
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_advertisements`(
	`ad_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
	`group_id` int(11) unsigned NOT NULL,
	`ad_name` varchar(255) NOT NULL DEFAULT '',
	`ad_link` varchar(255) NOT NULL DEFAULT '',
	`start_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
	`end_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
	`media_type` tinyint NOT NULL COMMENT '1:image 2:flash 3:text',
	`content` varchar(255) NOT NULL COMMENT 'text or src for image and flash',
	`open_type` ENUM('current','new') NOT NULL COMMENT 'current window or new window to open ad link',
	`description` varchar(255) NOT NULL DEFAULT '',
	`is_active` boolean NOT NULL DEFAULT '0',
   `is_default` boolean NOT NULL DEFAULT 0,
	`position` smallint(8) unsigned NOT NULL,
	PRIMARY KEY(`ad_id`),
	FOREIGN KEY(`group_id`) references ck_advertisement_groups(`group_id`) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;
###########################ad###########################

###########################promotion###########################

CREATE TABLE IF NOT EXISTS `ck_coupons`(
   `coupon_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `rule_id` int(11) unsigned NOT NULL,
   `name` varchar(255) NOT NULL ,
   `description` varchar(255) NOT NULL DEFAULT '',
   `quantity` int(11) NOT NULL default 0,
   `time_start` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
   `time_end` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
   #`points` int(11) unsigned NOT NULL DEFAULT 0,
   `is_available` boolean NOT NULL DEFAULT 1,
   `parameters` varchar(20000) NOT NULL DEFAULT '',
   PRIMARY KEY(`coupon_id`),
   FOREIGN KEY (rule_id) references ck_promotion_rules(rule_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_user_coupon_links`(
   `coupon_serial_num` varchar(255) NOT NULL,
   `user_id` int(11) unsigned NOT NULL,
   `coupon_id` int(11) unsigned NOT NULL,
   `receive_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `deadline` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
   `use_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
   `status` ENUM('available','lock','used','expired') NOT NULL DEFAULT 'available',
   `is_reminded` boolean NOT NULL DEFAULT 0,
   PRIMARY KEY (`coupon_serial_num`),
   #PRIMARY KEY (`user_id`,`coupon_id`),
   FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade,
   FOREIGN KEY (coupon_id) references ck_coupons(coupon_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_promotion_rules`(
   `rule_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `name` varchar(255) NOT NULL,
   `type` ENUM('coupon','promotion') NOT NULL,
   `description` varchar(255) NOT NULL DEFAULT '',
   PRIMARY KEY(`rule_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_promotions`(
   `promotion_id` int(11) unsigned NOT NULL,
   `rule_id` int(11) unsigned NOT NULL,
   `name` varchar(255) NOT NULL,
   `description` varchar(255) NOT NULL DEFAULT '',
   `time_start` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
   `time_end` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
   `allow_coupon` boolean NOT NULL DEFAULT 0,
   `is_active` boolean NOT NULL DEFAULT 1,
   `parameters` varchar(20000) NOT NULL DEFAULT '',
   PRIMARY KEY(`promotion_id`),
   FOREIGN KEY (rule_id) references ck_promotion_rules(rule_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE `ck_promotion_products_links` (
   `promotion_id` int(11) unsigned NOT NULL,
  `product_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`promotion_id`,`product_id`),
  FOREIGN KEY (promotion_id) references ck_promotions(promotion_id) on delete cascade on update cascade,
  FOREIGN KEY (`product_id`) REFERENCES `ck_products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_order_coupon_links`(
   `coupon_serial_num` varchar(255) NOT NULL ,
   `order_id` int(11) unsigned NOT NULL,
   PRIMARY KEY(`coupon_serial_num`,`order_id`),
   FOREIGN KEY (coupon_serial_num) references ck_user_coupon_links(coupon_serial_num) on delete cascade on update cascade,
   FOREIGN KEY (order_id) references ck_orders(order_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_order_promotion_links`(
   `promotion_id` int(11) unsigned NOT NULL,
   `order_id` int(11) unsigned NOT NULL,
   PRIMARY KEY (`promotion_id`,`order_id`),
   FOREIGN KEY (promotion_id) references ck_promotions(promotion_id) on delete cascade on update cascade,
   FOREIGN KEY (order_id) references ck_orders(order_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8;

###########################promotion###########################


###########################cash_on_delivery###########################
CREATE TABLE IF NOT EXISTS `ck_collection_units`(
   `unit_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `name` varchar(255) NOT NULL,
   `phone` varchar(32) NOT NULL DEFAULT '',
   `country` varchar(32) NOT NULL DEFAULT '',
   `state` varchar(32) NOT NULL DEFAULT '',
   `city` varchar(32) NOT NULL DEFAULT '',
   `region` varchar(32) NOT NULL DEFAULT '',
   `addr_detail` varchar(255) NOT NULL DEFAULT'',
   `is_active` boolean NOT NULL DEFAULT 1,
   PRIMARY KEY(`unit_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;
drop table if EXISTS `ck_collection_units_users_link`;
CREATE TABLE IF NOT EXISTS `ck_collection_units_users_link`(
   `unit_id` int(11) unsigned NOT NULL,
   `user_id` int(11) unsigned NOT NULL,
   `type` ENUM('payee','remittor'),
   PRIMARY KEY(`unit_id`,`user_id`,`type`),
   FOREIGN KEY (unit_id) references ck_collection_units(unit_id) on delete cascade on update cascade,
   FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_money_collection_records`(
   `collection_id` int(11) unsigned AUTO_INCREMENT,
   `order_id` int(11) unsigned NOT NULL,
   `user_id` int(11) unsigned NOT NULL COMMENT 'user id of payee',
   `unit_id` int(11) unsigned NOT NULL,
   `unit_name` varchar(255) NOT NULL DEFAULT '',
   `payee` varchar(255) NOT NULL DEFAULT '',
   `time_of_collection` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY key(`collection_id`),
   FOREIGN KEY (order_id) references ck_orders(order_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT 'collection record create when customer pay to our collection unit';

CREATE TABLE IF NOT EXISTS `ck_remittance_records`(
   `remittance_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `user_id` int(11) unsigned NOT NULL COMMENT 'remittor that remit the orders',
   `unit_id` int(11) unsigned NOT NULL,
   `unit_name` varchar(255) NOT NULL DEFAULT '',
   `remittor` varchar(255) NOT  NULL DEFAULT '',
   `remittance_money` decimal(20,2) NOT NULL DEFAULT 0.00,
   `order_total` decimal(20,2) NOT NULL DEFAULT 0.00,
   `evidence_url` varchar(255) NOT NULL DEFAULT '',
   `note` varchar(255) NOT NULL DEFAULT '',
   `submission_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `approved_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
   `approver` varchar(255) NOT NULL DEFAULT '',
   `approver_id` int(11) unsigned NOT NULL DEFAULT 0,
   `approve_note` varchar(255) NOT NULL DEFAULT '',
   `is_approved` boolean NOT NULL DEFAULT 0,
   `is_normal` boolean NOT NULL DEFAULT 1,
   PRIMARY KEY(`remittance_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT 'remittance record submit by collection unit';

CREATE TABLE IF NOT EXISTS `ck_remittances_orders_link`(
   `remittance_id` int(11) unsigned NOT NULL,
   `order_serialNum` varchar(255) NOT NULL,
   PRIMARY KEY(`remittance_id`,`order_serialNum`)
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT 'remittance record and orders link';

CREATE TABLE IF NOT EXISTS `ck_storage_units`(
   `unit_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `name` varchar(255) NOT NULL,
   `phone` varchar(32) NOT NULL DEFAULT '',
   `country` varchar(32) NOT NULL DEFAULT '',
   `state` varchar(32) NOT NULL DEFAULT '',
   `city` varchar(32) NOT NULL DEFAULT '',
   `region` varchar(32) NOT NULL DEFAULT '',
   `addr_detail` varchar(255) NOT NULL DEFAULT'',
   `is_active` boolean NOT NULL DEFAULT 1,
   PRIMARY KEY(`unit_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_storage_units_users_link`(
   `unit_id` int(11) unsigned NOT NULL,
   `user_id` int(11) unsigned NOT NULL,
   PRIMARY KEY(`unit_id`,`user_id`),
   FOREIGN KEY (unit_id) references ck_storage_units(unit_id) on delete cascade on update cascade,
   FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_storage_received_records`(
   `record_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `order_id` int(11) unsigned NOT NULL,
   `storage_unit_id` int(11) unsigned NOT NULL,
   `storage_name` varchar(255) NOT NULL DEFAULT '',
   `store_id` int(11) unsigned NOT NULL,
   `store_name` varchar(255) NOT NULL DEFAULT '',
   `receiver_id` int(11) unsigned NOT NULL,
   `receiver` varchar(255) NOT NULL DEFAULT '',
   `receiving_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY(`record_id`),
   FOREIGN KEY (order_id) references ck_orders(order_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT 'records create when storage receive goods from vendor';

CREATE TABLE IF NOT EXISTS `ck_logistic_received_records`(
   `record_id` int(11) unsigned  NOT NULL AUTO_INCREMENT,
   `order_id` int(11) unsigned NOT NULL,
   `logistic_company_unit_id` int(11) unsigned NOT NULL,
   `logistic_unit` varchar(255) NOT NULL DEFAULT '',
   `receiver_id` int(11) unsigned NOT NULL,
   `receiver` varchar(255) NOT NULL default '',
   `receive_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `reason` varchar(255) NOT NULL DEFAULT '',
   `description` varchar(255) NOT NULL DEFAULT '',
   `evidence_url` varchar(255) NOT NULL DEFAULT '',
   `abnormal_handler_id` int(11) unsigned NOT NULL default 0,
   `abnormal_handler` varchar(255) NOT NULL DEFAULT '',
   `is_normal` boolean NOT NULL DEFAULT 1,
   `is_delivered` boolean NOT NULL DEFAULT 0,
   `delivered_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
   `deliver_evidence` varchar(255) NOT NULL DEFAULT '',
   `deliver_id` int(11) unsigned NOT NULL default 0,
   `deliver` varchar(255) NOT NULL DEFAULT '',
   `abnormal_regist_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
   PRIMARY KEY(`record_id`),
   FOREIGN KEY (logistic_company_unit_id) references ck_logistic_company_units(unit_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT 'records create when logistic receive goods from storage';

CREATE TABLE IF NOT EXISTS `ck_logistic_abnormal_handle_record`(
   `abnormal_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `record_id` int(11) unsigned  NOT NULL,
   `user_id` int(11) unsigned NOT NULL,
   `handler` varchar(255) NOT NULL,
   `description` varchar(255) NOT NULL DEFAULT '',
   `evidence_url` varchar(255) NOT NULL DEFAULT '',
   `handle_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `changed_status` tinyint NOT NULL,
   PRIMARY KEY(`abnormal_id`),
   FOREIGN KEY (record_id) references ck_logistic_received_records(record_id) on delete cascade on update cascade,
   FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_order_logs`(
   `log_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `order_id` int(11) unsigned NOT NULL ,
   `pre_status` tinyint NOT NULL COMMENT 'status before change',
   `change_status` tinyint  NOT NULL COMMENT 'status change after',
   `info` varchar(255) NOT NULL DEFAULT '' COMMENT 'description to  the change',
   `operator` varchar(255) NOT NULL COMMENT 'the operator of the change',
   `operator_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (`log_id`),
   FOREIGN KEY (order_id) references ck_orders(order_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="order product association table";
###########################cash_on_delivery###########################
CREATE TABLE IF NOT EXISTS `ck_bills` (
  `bill_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `bill_serial_num` varchar(255) NOT NULL,
  `store_id` int(11) unsigned NOT NULL,
  `real_bill_money` decimal(20,2) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modify_reason` varchar(512) NOT NULL DEFAULT '',
  `billing_check_status` ENUM('uncheck','pass','ban') NOT NULL DEFAULT 'uncheck',
  PRIMARY KEY(`bill_id`),
  unique(`bill_serial_num`),
  FOREIGN KEY (`store_id`) references ck_stores(`store_id`) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `ck_checked_bill` (
  `record_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `bill_id` int(11) unsigned NOT NULL,
  `bill_serial_num` varchar(255) NOT NULL,
  `checkedBill_create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `bill_check_instructions` varchar(512) NOT NULL DEFAULT '',
  `user_id` int(11) unsigned NOT NULL,
  `store_id` int(11) unsigned NOT NULL,
  `billing_checker` varchar(255) NOT NULL DEFAULT '' ,
  `risk_indicators` int(11) unsigned NOT NULL,
  `risk_check_status` ENUM('uncheck','pass','block') NOT NULL DEFAULT 'uncheck',
  PRIMARY KEY(`record_id`),
  FOREIGN KEY (`bill_id`) references ck_bills(`bill_id`) on delete cascade on update cascade ,
  FOREIGN KEY (`store_id`) references ck_stores(`store_id`) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `ck_blocking_checked_bill` (
  `record_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `bill_id` int(11) unsigned NOT NULL,
  `bill_serial_num` varchar(255) NOT NULL,
  `blockBill_create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) unsigned NOT NULL,
  `store_id` int(11) unsigned NOT NULL,
  `risk_bill_checker`  varchar(255) NOT NULL DEFAULT '' ,
  `risk_bill_instructions` varchar(512) NOT NULL DEFAULT '',
  `unBlock_instructions` varchar(512) NOT NULL DEFAULT '',
  `unblock_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `unblock_handler` varchar(255) NOT NULL DEFAULT '' ,
  PRIMARY KEY(`record_id`),
  FOREIGN KEY (`bill_id`) references ck_bills(`bill_id`) on delete cascade on update cascade,
  FOREIGN KEY (`store_id`) references ck_stores(`store_id`) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `ck_store_checked_bill` (
   `record_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `bill_id` int(11) unsigned NOT NULL,
   `bill_serial_num` varchar(255) NOT NULL,
   `storeCheckedBill_create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `risk_bill_instructions` varchar(512) NOT NULL DEFAULT '',
   `risk_billing_checker` varchar(255) NOT NULL DEFAULT '' ,
   `user_id` int(11) unsigned NOT NULL,
   `store_id` int(11) unsigned NOT NULL,
   `store_check_status`  ENUM('uncheck','checked','complaint','pass','rejected') NOT NULL DEFAULT 'uncheck',
   PRIMARY KEY(`record_id`),
  FOREIGN KEY (`bill_id`) references ck_bills(`bill_id`) on delete cascade on update cascade,
  FOREIGN KEY (`store_id`) references ck_stores(`store_id`) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `ck_complaint_bill` (
   `record_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `bill_id` int(11) unsigned NOT NULL ,
   `bill_serial_num` varchar(255) NOT NULL,
   `store_id` int(11) unsigned NOT NULL,
   `complaintBill_create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `complaint_instructions` varchar(255) NOT NULL DEFAULT '' ,
   `complaint_handle_instrucions` varchar(255) NOT NULL DEFAULT '' ,
   `user_id` int(11) unsigned NOT NULL,
   `complaint_handler` varchar(255) NOT NULL DEFAULT '' ,
   `complaint_handle_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
   PRIMARY KEY(`record_id`),
  FOREIGN KEY (`bill_id`) references ck_bills(`bill_id`) on delete cascade on update cascade,
  FOREIGN KEY (`store_id`) references ck_stores(`store_id`) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `ck_bill_order_link` (
  `bill_id` int(11) unsigned NOT NULL,
  `order_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`bill_id`,`order_id`),
  FOREIGN KEY (`bill_id`) references ck_bills(`bill_id`) on delete cascade on update cascade,
  FOREIGN KEY (`order_id`) references ck_orders(`order_id`) on delete cascade on update cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='orders in bill';

CREATE TABLE IF NOT EXISTS `ck_profit_static`(
   `serial_num` varchar(255) NOT NULL,
   `cost_total_price` decimal(20,2) NOT null DEFAULT 0.00,
   `sale_total_price` decimal(20,2) NOT null DEFAULT 0.00,
   `profit_price`  decimal(20,2) NOT null DEFAULT 0.00,
   `profit_rate` double(10,9) NOT NULL,
   PRIMARY KEY(`serial_num`)
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="profit static";

CREATE TABLE IF NOT EXISTS `ck_profit_item`(
   `serial_num` varchar(255) NOT NULL,
   `order_serialNum` varchar(255) NOT NULL,
   FOREIGN KEY (serial_num) references ck_profit_static(`serial_num`) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="profit item";


###########################新任务###########################
CREATE TABLE IF NOT EXISTS `ck_articles`(
   `article_id` int(11) unsigned not null AUTO_INCREMENT,
   `market_id` int(11) unsigned not null,
   `title` varchar(255) not null,
   `author` varchar(255) not null,
   `user_id` int(11) unsigned not null,
   `parent_id` int(11) unsigned not null default 0,
   `content_url` varchar(255) not null,
   `timestamp` timestamp not null default CURRENT_TIMESTAMP,
   `view_count` int not null default 0,
   `like_count` int not null default 0,
   `dislike_count` int not null default 0,
   `comment_count` int not null default 0,
   `is_active` boolean not null default '1',
   `allow_comment` boolean not null default '0',
   `position` int(11) unsigned not null default 0,
   PRIMARY KEY(`article_id`),
   FOREIGN KEY (`user_id`) references ck_users(`user_id`) on delete cascade on update cascade,
   FOREIGN KEY (`market_id`) references ck_markets(`market_id`) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_article_comments`(
   `comment_id` int(11) unsigned not null AUTO_INCREMENT,
   `article_id` int(11) unsigned not null,
   `author` varchar(255) not null,
   `parent_id` int(11) unsigned not null default 0,
   `like_count` int not null default 0,
   `content` varchar(255) not  null ,
   `timestamp` timestamp not null default CURRENT_TIMESTAMP,
   `is_active` boolean not null default '1',
   PRIMARY KEY(`comment_id`),
   FOREIGN KEY (`article_id`) references ck_articles(`article_id`) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_stall_lease`(
   `lease_id` int(11) unsigned not null AUTO_INCREMENT,
   `market_id` int(11) unsigned not null,
   `store_id` int(11) unsigned not null,
   `address` varchar(255) not null ,
   `rent` decimal(15,2) not null default '0.00',
   `contacts` varchar(255) not null ,
   `phone` varchar(32) not null,
   `timestamp` timestamp not null default CURRENT_TIMESTAMP,
   `status` ENUM('uncheck','apporve','reject') not null default 'uncheck',
   `is_active` boolean not null default 1,
   `reject_reason` varchar(255) not null default '',
   PRIMARY KEY(`lease_id`),
   FOREIGN KEY (`market_id`) references ck_markets(`market_id`) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `ck_store_feedbacks`(
   `feedback_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `store_id` int(11) unsigned NOT NULL DEFAULT 0,
   `title` varchar(255) NOT NULL DEFAULT '',
   `content`  varchar(255) NOT NULL DEFAULT '',
   `email` varchar(255) NOT NULL DEFAULT '',
   `type` varchar(255) NOT NULL DEFAULT '',
   `is_read` boolean NOT NULL DEFAULT 0,
   `is_deal` boolean NOT NULL DEFAULT 0,
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY(`feedback_id`),
   FOREIGN KEY (`store_id`) references ck_stores(`store_id`) on delete cascade on update cascade,
   index(`type`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;

CREATE TABLE IF NOT EXISTS `ck_store_deliver_addr`(
   `deliverAddr_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `store_id` int(11) unsigned NOT NULL ,
   `name` varchar(255) NOT NULL COMMENT 'receiver name',
   `phone` varchar(32) NOT NULL DEFAULT '',
   `country` varchar(32) NOT NULL DEFAULT '',
   `state` varchar(32) NOT NULL DEFAULT '',
   `city` varchar(32) NOT NULL DEFAULT '',
   `region` varchar(32) NOT NULL DEFAULT '',
   `addr_detail` varchar(255) NOT NULL DEFAULT'',
   `zipCode` varchar(32) NOT NULL DEFAULT '',
   `is_default` boolean NOT NULL COMMENT '1:is default, 0:not',
   PRIMARY KEY(`deliverAddr_id`),
   FOREIGN KEY (`store_id`) references ck_stores(`store_id`) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="return address";

CREATE TABLE IF not EXISTS `ck_electric_log`(
   `log_id` int(11) unsigned not null AUTO_INCREMENT,
   `log_serial_num` varchar(255) not null ,
   `store_id` int(11) unsigned not null,
   `market_id` int(11) unsigned not null,
   `payment_order_id` int(11) unsigned not null,
   `is_paid` boolean  not null,
   `money` decimal(15,2) not null,
   `real_pay_money` decimal(15,2) not null,
   `money_to_balance` decimal(15,2) not null,
   `time` timestamp not null default CURRENT_TIMESTAMP,
   PRIMARY KEY(`log_id`),
   FOREIGN KEY (`store_id`) references ck_stores(`store_id`) on delete cascade on update cascade,
   FOREIGN KEY (`payment_order_id`) references ck_payment_orders(`payment_order_id`) on delete cascade on update cascade,
   FOREIGN KEY (`market_id`) references ck_markets(`market_id`) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF not EXISTS `ck_store_profile_edit_application`(
   `application_id` int(11) unsigned not null AUTO_INCREMENT,
   `store_id` int(11) unsigned not null,
   `store` varchar(255)  not null ,
   `category_id` int(11) unsigned not null,
   `stall` varchar(255) not null ,
   `shopkeeper` varchar(255) not null,
   `apply_reason` varchar(255) not null default '',
   `id_card_front` varchar(255) not null default '',
   `id_card_rear` varchar(255) not null default '',
   `business_licence` varchar(255) not null default '',
   `is_approved` boolean not null default '0',
   `is_active` boolean not null default '1',
   PRIMARY KEY(`application_id`),
   FOREIGN KEY (`store_id`) references ck_stores(`store_id`) on delete cascade on update cascade,
   FOREIGN KEY (`category_id`) references ck_categories(`category_id`) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

###########################新任务###########################


###########################4.22###########################
CREATE TABLE IF NOT EXISTS `ck_store_brands`(
   `brand_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `store_id` int(11) unsigned not null,
   `brand` varchar(255) NOT NULL ,
   `introduction` varchar(255) not null default '',
   `image_url` varchar(255) NOT NULL DEFAULT '',
   PRIMARY KEY (`brand_id`),
   FOREIGN KEY (store_id) references ck_stores(store_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_product_store_brand_link`(
   `product_id` int(11) unsigned NOT NULL,
   `brand_id` int(11) unsigned NOT NULL,
   `store_id` int(11) unsigned not null,
   PRIMARY KEY(`product_id`,`brand_id`,`store_id`),
   FOREIGN KEY (product_id) references ck_products(product_id) on delete cascade on update cascade,
   FOREIGN KEY (brand_id) references ck_store_brands(brand_id) on delete cascade on update cascade,
   FOREIGN KEY (store_id) references ck_stores(store_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_store_members`(
   `user_id` int(11) unsigned NOT NULL,
   `store_id` int(11) unsigned NOT NULL,
   `is_member` boolean not null default 0,
   `is_vip` boolean not null default 0,
   `is_buyer` boolean not null default 0,
   PRIMARY KEY(`user_id`,`store_id`),
   FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade,
   FOREIGN KEY (store_id) references ck_stores(store_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;



CREATE TABLE if not EXISTS `ck_distribute_handle_record`(
   `record_id` int(11) unsigned not null AUTO_INCREMENT,
   `order_serialNum` VARCHAR(255) not null ,
   `is_risk_block` boolean not null ,
   `note` varchar(255) not null default '',
   `handler` VARCHAR(255) not null default '',
   `time` timestamp not null default CURRENT_TIMESTAMP,
   PRIMARY KEY(`record_id`)
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE if not EXISTS `ck_distribute_bill_complain`(
   `complain_id` int(11) unsigned not null AUTO_INCREMENT,
   `order_serialNum` VARCHAR(255) not null ,
   `user_id` int(11) unsigned not null ,
   `reason` varchar(255) not null default '',
   `handler` VARCHAR(255) not null default '',
   `complain_result` VARCHAR(255) not null default '',
   `time` timestamp not null default CURRENT_TIMESTAMP,
   PRIMARY KEY(`complain_id`),
   FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_fast_payment_orders`(
   `order_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `order_serial_num` varchar(255) not null,
   `user_id` int(11) unsigned not null ,
   `payment_order_id` int(11) unsigned not null,
   `payment_id` int(11) unsigned not null,
   `store_id` int(11) unsigned not null ,
   `money` decimal(20,2) not null ,
   `real_pay_money` decimal(20,2) not null ,
   `is_completed` boolean not null default 0,
   `is_first` boolean not null default 0,
   `timestamp` timestamp not null default CURRENT_TIMESTAMP,
   PRIMARY KEY(`order_id`),
   FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade,
   FOREIGN KEY (payment_order_id) references ck_payment_orders(payment_order_id) on delete cascade on update cascade,
   FOREIGN KEY (payment_id) references ck_payments(payment_id) on delete cascade on update cascade,
   FOREIGN KEY (store_id) references ck_stores(store_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_fast_payment_discount` (
  `discount_id` int(11) unsigned NOT NULL,
  `user_id` int(11) unsigned NOT NULL,
  `store_id` int(11) unsigned NOT NULL,
  `money` decimal(20,2) NOT NULL,
  `discount` decimal(20,2) NOT NULL DEFAULT '0.00',
  `is_completed` tinyint(1) NOT NULL DEFAULT '0',
  `count` int(11) NOT NULL DEFAULT '0',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(`discount_id`),
  FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade,
  FOREIGN KEY (store_id) references ck_stores(store_id) on delete cascade on update cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_product_groups` (
  `group_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `group_name` varchar(255) NOT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_store_groups` (
  `group_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `group_name` varchar(255) NOT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_product_group_links` (
  `group_id` int(11) unsigned NOT NULL,
  `product_id` int(11) unsigned NOT NULL,
  `position` int(11) unsigned NOT NULL default 0,
  PRIMARY KEY (`group_id`,`product_id`),
  FOREIGN KEY (`group_id`) REFERENCES `ck_product_groups` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `ck_products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_store_group_links` (
  `group_id` int(11) unsigned NOT NULL,
  `store_id` int(11) unsigned NOT NULL,
  `position` int(11) unsigned NOT NULL default 0,
  PRIMARY KEY (`group_id`,`store_id`),
  FOREIGN KEY (`group_id`) REFERENCES `ck_store_groups` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`store_id`) REFERENCES `ck_stores` (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table IF NOT EXISTS `ck_logistic_companies_store_link`(
   `store_id` int(11) unsigned not null,
   `company_id` int(11) unsigned not null,
   `is_often_used` boolean not null default 1,
   `is_default` boolean not null default 0,
   PRIMARY KEY(`store_id`,`company_id`),
   FOREIGN KEY (`store_id`) REFERENCES `ck_stores` (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE,
   FOREIGN KEY (`company_id`) REFERENCES `ck_logistic_companies` (`company_id`) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

###########################4.22###########################
create table IF NOT EXISTS `ck_phone_modify_record`(
   `record_id` int(11) unsigned not null AUTO_INCREMENT,
   `user_id` int(11) unsigned not null,
   `phone_before` varchar(255) not null default '',
   `phone_after` varchar(255) not null default '',
   `time` timestamp not null default CURRENT_TIMESTAMP,
   PRIMARY KEY(`record_id`),
   FOREIGN KEY (`user_id`) REFERENCES `ck_users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
set foreign_key_checks=1;






############################5.19#########################

CREATE TABLE IF NOT EXISTS `ck_platforms` (
   `platform_id` int(11) unsigned not null AUTO_INCREMENT,
   `platform` varchar(255) NOT NULL,
   PRIMARY KEY (`platform_id`)
 ) AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;



CREATE TABLE IF NOT EXISTS `ck_handling_fee_rate_rules` (
   `rule_id` int(11) unsigned not null AUTO_INCREMENT,
   `platform_id`  int(11) unsigned NOT NULL,
   `payment_unit` varchar(255)  NOT NULL,
   `operator` int(11) unsigned NOT NULL,
   `fee_rate` decimal(15,2) NOT NULL DEFAULT 0.000,
   `is_active` boolean NOT NULL DEFAULT 0,
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (`rule_id`),
   FOREIGN KEY (`operator`) REFERENCES `ck_users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
   FOREIGN KEY (`platform_id`) REFERENCES `ck_platforms` (`platform_id`) ON DELETE CASCADE ON UPDATE CASCADE
 ) AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `ck_order_rebate_rate` (
   `rate_id` int(11) unsigned not null AUTO_INCREMENT,
   `name` varchar(255) NOT NULL,
   `operator` int(11) unsigned NOT NULL,
   `seller_rebate_rate` decimal(10,2) NOT NULL DEFAULT 0.000,
   `market_rebate_rate` decimal(10,2) NOT NULL DEFAULT 0.000,
   `cooka_rebate_rate` decimal(10,2) NOT NULL DEFAULT 0.000,
   `is_active` boolean NOT NULL DEFAULT 0,
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (`rate_id`),
   FOREIGN KEY (`operator`) references ck_users(`user_id`) on delete cascade on update cascade
 ) AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;


insert into ck_order_rebate_rate (`operator`,`seller_rebate_rate`,`market_rebate_rate`,`cooka_rebate_rate`,`is_active`) values (1,45,30,25,1);


CREATE TABLE IF NOT EXISTS `ck_order_handling_fee_rule_links` (
   `order_id` int(11) unsigned NOT NULL,
   `rule_id` int(11) unsigned NOT NULL,
   `rate_id` int(11) unsigned NOT NULL,
   PRIMARY KEY(`order_id`,`rule_id`,`rate_id`),
   FOREIGN KEY (`order_id`) references ck_orders(`order_id`) on delete cascade on update cascade,
   FOREIGN KEY (`rate_id`) references ck_order_rebate_rate(`rate_id`) on delete cascade on update cascade,
   FOREIGN KEY (`rule_id`) references ck_handling_fee_rate_rules(`rule_id`) on delete cascade on update cascade
 ) AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;











############################################################################################################



CREATE TABLE IF NOT EXISTS `ck_risk_control` (
   `risk_id` int(11) unsigned not null AUTO_INCREMENT,
   `rule_id` int(11) unsigned NOT NULL default 1,
   `name` varchar(255) NOT NULL,
   `risk_tag` enum('common','serious') not null default 'common',
   `description` varchar(255) NOT NULL,
   `parameters` varchar(20000) NOT NULL DEFAULT '',
   PRIMARY KEY (`risk_id`)
 ) AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;




CREATE TABLE IF NOT EXISTS `ck_block_order_logs` (
   `block_log_id` int(11) unsigned not null AUTO_INCREMENT,
   `order_id` int(11) unsigned NOT NULL,
   `type` enum('freeze','unfreeze') not null default 'freeze',
   `remark` varchar(255) not null default '',
   `operator` varchar(255)  NOT NULL default '',
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY(`block_log_id`),
   FOREIGN KEY (`order_id`) references ck_orders(`order_id`) on delete cascade on update cascade
 ) AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;




CREATE TABLE IF NOT EXISTS `ck_order_risk_control_links` (
   `order_id` int(11) unsigned NOT NULL,
   `risk_id` int(11) unsigned NOT NULL,
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY(`order_id`,`risk_id`),
   FOREIGN KEY (`order_id`) references ck_orders(`order_id`) on delete cascade on update cascade,
   FOREIGN KEY (`risk_id`) references ck_risk_control(`risk_id`) on delete cascade on update cascade
 ) AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;



###########################发货前 退款#########################
CREATE TABLE IF NOT EXISTS `ck_refunds`(
   `refund_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `refund_serial_num` varchar(255) NOT NULL DEFAULT '',
   `order_id` int(11) unsigned NOT NULL,
   `reason` varchar(255) NOT NULL DEFAULT '',
   `arbitration_reason` varchar(255) NOT NULL DEFAULT '',
   `money` decimal(20,2) NOT NULL COMMENT 'refund money',
   `description` varchar(255) NOT NULL DEFAULT '',
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `deal_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
   `arbitration_create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
   `status` tinyint NOT NULL,
   PRIMARY KEY(`refund_id`),
   index(`order_id`),
   FOREIGN KEY (order_id) references ck_orders(order_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="refund table";

CREATE TABLE IF NOT EXISTS `ck_refund_store_handle_record`(
   `record_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `refund_id` int(11) unsigned NOT NULL,
   `user_id` int(11) unsigned NOT NULL,
   `handler` varchar(255) NOT NULL,
   `reason` varchar(255) NOT NULL DEFAULT '',
   `description` varchar(255) NOT NULL DEFAULT '',
   `evidence_url` varchar(255) NOT NULL DEFAULT '',
   `handle_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `is_allow` boolean NOT NULL,
   PRIMARY KEY(`record_id`),
   FOREIGN KEY (refund_id) references ck_refunds(refund_id) on delete cascade on update cascade,
   FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_refund_cooka_handle_record`(
   `record_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `refund_id` int(11) unsigned NOT NULL,
   `user_id` int(11) unsigned NOT NULL,
   `handler` varchar(255) NOT NULL,
   `reason` varchar(255) NOT NULL DEFAULT '',
   `description` varchar(255) NOT NULL DEFAULT '',
   `evidence_url` varchar(255) NOT NULL DEFAULT '',
   `handle_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `is_allow` boolean NOT NULL,
   PRIMARY KEY(`record_id`),
   FOREIGN KEY (refund_id) references ck_refunds(refund_id) on delete cascade on update cascade,
   FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_refunds_arbitration_evidence_url_link`(
   `evidence_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `refund_id` int(11) unsigned NOT NULL,
   `title` varchar(255) NOT NULL DEFAULT '',
   `evidence_url` varchar(255) NOT NULL,
   PRIMARY KEY(`evidence_id`),
   FOREIGN KEY (refund_id) references ck_refunds(refund_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="ck_refunds_evidence_url_link table";


###########################发货后 退货退款#########################
CREATE TABLE IF NOT EXISTS `ck_return_refunds`(
   `return_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `return_serial_num` varchar(255) NOT NULL DEFAULT '',
   `order_id` int(11) unsigned NOT NULL,
   `reason` varchar(255) NOT NULL DEFAULT '',
   `arbitration_reason` varchar(255) NOT NULL DEFAULT '',
   `money` decimal(20,2) NOT NULL COMMENT 'refund money',
   `description` varchar(255) NOT NULL DEFAULT '',
   `name` varchar(255) NOT NULL COMMENT 'receiver name',
   `logistic_company_code` varchar(255) NOT NULL DEFAULT '',
   `shipping_code` varchar(64) NOT null COMMENT 'logistic code',
   `phone` varchar(32) NOT NULL DEFAULT '',
   `country` varchar(32) NOT NULL DEFAULT '',
   `state` varchar(32) NOT NULL DEFAULT '',
   `city` varchar(32) NOT NULL DEFAULT '',
   `region` varchar(32) NOT NULL DEFAULT '',
   `addr_detail` varchar(255) NOT NULL DEFAULT'',
   `zipCode` varchar(32) NOT NULL DEFAULT '',
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `reject_times` int(11) NOT NULL DEFAULT '0',
   `deal_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
   `arbitration_create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
   `status` tinyint NOT NULL COMMENT '',
   `is_all` boolean NOT NULL,
   PRIMARY KEY(`return_id`),
   index(`order_id`),
   FOREIGN KEY (order_id) references ck_orders(order_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="return and refund table";

CREATE TABLE IF NOT EXISTS `ck_return_part_items_link`(
   `return_id` int(11) unsigned NOT NULL,
   `item_id` int(11) unsigned NOT NULL,
   PRIMARY KEY(`return_id`,`item_id`),
   FOREIGN KEY (return_id) references ck_return_refunds(return_id) on delete cascade on update cascade,
   FOREIGN KEY (item_id) references ck_order_items(item_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_return_refunds_evidence_url_link`(
   `evidence_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `return_id` int(11) unsigned NOT NULL,
   `title` varchar(255) NOT NULL DEFAULT '',
   `evidence_url` varchar(255) NOT NULL,
   PRIMARY KEY(`evidence_id`),
   FOREIGN KEY (return_id) references ck_return_refunds(return_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="ck_refunds_evidence_url_link table";

CREATE TABLE IF NOT EXISTS `ck_return_store_handle_record`(
   `record_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `return_id` int(11) unsigned NOT NULL,
   `user_id` int(11) unsigned NOT NULL,
   `handler` varchar(255) NOT NULL,
   `reason` varchar(255) NOT NULL DEFAULT '',
   `description` varchar(255) NOT NULL DEFAULT '',
   `evidence_url` varchar(255) NOT NULL DEFAULT '',
   `handle_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `result` tinyint(4) NOT NULL,
   PRIMARY KEY(`record_id`),
   FOREIGN KEY (return_id) references ck_return_refunds(return_id) on delete cascade on update cascade,
   FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_return_cooka_handle_record`(
   `record_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `return_id` int(11) unsigned NOT NULL,
   `user_id` int(11) unsigned NOT NULL,
   `handler` varchar(255) NOT NULL,
   `reason` varchar(255) NOT NULL DEFAULT '',
   `description` varchar(255) NOT NULL DEFAULT '',
   `evidence_url` varchar(255) NOT NULL DEFAULT '',
   `handle_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `result` tinyint(4) NOT NULL,
   PRIMARY KEY(`record_id`),
    FOREIGN KEY (return_id) references ck_return_refunds(return_id) on delete cascade on update cascade,
   FOREIGN KEY (user_id) references ck_users(user_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_returns_arbitration_evidence_url_link`(
   `evidence_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `return_id` int(11) unsigned NOT NULL,
   `title` varchar(255) NOT NULL DEFAULT '',
   `evidence_url` varchar(255) NOT NULL,
   PRIMARY KEY(`evidence_id`),
    FOREIGN KEY (return_id) references ck_return_refunds(return_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;



CREATE TABLE IF NOT EXISTS `ck_cancel_refund_reasons`(
   `cancel_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `refund_id` int(11) unsigned NOT NULL,
   `type` tinyint NOT NULL ,
   `reason` varchar(255) NOT NULL DEFAULT '',
   `description` varchar(255) NOT NULL DEFAULT '',
   PRIMARY KEY(`cancel_id`),
   FOREIGN KEY (refund_id) references ck_refunds(refund_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="cancel_refund_reasons table";

CREATE TABLE IF NOT EXISTS `ck_cancel_return_reasons`(
   `cancel_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `return_id` int(11) unsigned NOT NULL,
   `type` tinyint NOT NULL ,
   `reason` varchar(255) NOT NULL DEFAULT '',
   `description` varchar(255) NOT NULL DEFAULT '',
   PRIMARY KEY(`cancel_id`),
   FOREIGN KEY (return_id) references ck_return_refunds(return_id) on delete cascade on update cascade
)AUTO_INCREMENT=1 ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT="cancel_return_reasons table";

create table if NOT EXISTS `ck_financial_statement`(
   `statement_id` int(11) unsigned NOT null AUTO_INCREMENT,
   `time_start` timestamp NOT null ,
   `time_end` timestamp NOT null,
   `code` varchar(255) not null default '',
   `transaction_type` varchar(255) NOT null ,
   `amount` int(11) NOT null DEFAULT 0,
   `is_income` boolean NOT null DEFAULT 1,
   `total_money` decimal(15,2) NOT null DEFAULT 0.00,
   `total_real_pay_money` decimal(15,2) NOT null DEFAULT 0.00,
   PRIMARY KEY(`statement_id`),
   index(`time_start`)
)AUTO_INCREMENT=1 ENGINE=InnoDB DEFAULT CHARSET=utf8;







#########################2016.7.5#####################################################

CREATE TABLE IF NOT EXISTS `ck_newest_product_store_links`(
   `product_id` int(11) unsigned NOT NULL,
   `store_id` int(11) unsigned NOT NULL,
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `is_in_list` boolean not null default '0',
   PRIMARY KEY(`product_id`,`store_id`),
    FOREIGN KEY (product_id) references ck_products(product_id) on delete cascade on update cascade,
    FOREIGN KEY (store_id) references ck_stores(store_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;


CREATE TABLE IF NOT EXISTS `ck_newest_product_store_list`(
   `product_id` int(11) unsigned NOT NULL,
   `store_id` int(11) unsigned NOT NULL,
   `position` int(11) unsigned NOT NULL default 0,
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY(`product_id`,`store_id`),
    FOREIGN KEY (product_id) references ck_products(product_id) on delete cascade on update cascade,
    FOREIGN KEY (store_id) references ck_stores(store_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;


CREATE TABLE IF NOT EXISTS `ck_group_store_product_links` (
  `store_id` int(11) unsigned NOT NULL,
  `product_id` int(11) unsigned NOT NULL,
  `position` int(11) unsigned NOT NULL default 0,
  PRIMARY KEY (`store_id`,`product_id`),
  FOREIGN KEY (`product_id`) REFERENCES `ck_products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`store_id`) REFERENCES `ck_stores` (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ck_user_product_trace_link` (
  `product_id` int(11) unsigned NOT NULL,
  `user_id` int(11) unsigned NOT NULL,
  `timestamp` timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  `count` int(11) unsigned not null default 1,
  PRIMARY KEY (`product_id`,`user_id`),
  FOREIGN KEY (`product_id`) REFERENCES `ck_products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `ck_users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



################################################################################################
drop table if EXISTS ck_random_coupon_user_links;
CREATE TABLE IF NOT EXISTS `ck_random_coupon_user_links` (
  `user_id` int(11) unsigned NOT NULL,
  `coupon_serial_num` varchar(255) NOT NULL,
  `timestamp` timestamp not null default CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`coupon_serial_num`),
  FOREIGN KEY (`user_id`) REFERENCES `ck_users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


drop table IF EXISTS ck_order_coupon_links;

CREATE TABLE IF NOT EXISTS `ck_coupon_payment_order_links`(
   `coupon_serial_num` varchar(255) NOT NULL ,
   `payment_order_id` int(11) unsigned NOT NULL,
   PRIMARY KEY(`coupon_serial_num`,`payment_order_id`),
   FOREIGN KEY (coupon_serial_num) references ck_user_coupon_links(coupon_serial_num) on delete cascade on update cascade,
   FOREIGN KEY (payment_order_id) references ck_payment_orders(payment_order_id) on delete cascade on update cascade
)ENGINE=InnoDB  DEFAULT CHARSET=utf8;