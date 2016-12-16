drop table if exists ck_brands;
drop table if exists ck_business_scope;
drop table if exists ck_categories;
drop table if exists ck_categories_types;
drop table if exists ck_feature_values;
drop table if exists ck_features;
drop table if exists ck_login_history;
drop table if exists ck_product_images_link;
drop table if exists ck_product_keywords;
drop table if exists ck_product_prices;
drop table if exists ck_products;
drop table if exists ck_products_categories_link;
drop table if exists ck_products_features_values_link;
drop table if exists ck_products_self_features_values_link;
drop table if exists ck_products_self_specifications_values_link;
drop table if exists ck_products_specifications_values_link;
drop table if exists ck_self_categories;
drop table if exists ck_self_feature_values;
drop table if exists ck_self_features;
drop table if exists ck_self_specification_values;
drop table if exists ck_specification_values;
drop table if exists ck_specifications;
drop table if exists ck_specifications_combinations;
drop table if exists ck_store_top_images;
drop table if exists ck_stores;
drop table if exists ck_types;
drop table if exists ck_types_brands_link;
drop table if exists ck_types_features_link;
drop table if exists ck_types_specifications_link;
drop table if exists ck_users;
drop table if exists ck_deliver_addrs;
drop table if exists ck_orders;
drop table if exists ck_payment_orders;
drop table if exists ck_specification_combinations;
drop table if exists ck_account_balance;
drop table if exists ck_financial_account;
drop table if exists ck_product_snaps;
drop table if exists ck_orderItems;
drop table if exists ck_banner;

CREATE TABLE IF NOT EXISTS `ck_banner`(
   `banner_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `title` varchar(255) NOT NULL ,
   `image_url` varchar(255) NOT NULL,
   `url` varchar(255) NOT NULL DEFAULT '',
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `status` boolean NOT NULL default '1' COMMENT '1 for enabled ,0 for disabled',
   PRIMARY KEY(`banner_id`)
);

CREATE TABLE IF NOT EXISTS `ck_store_profiles`(
   `profile_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `store_id` int(11) unsigned NOT NULL,
   `shopkeeper` varchar(255) NOT NULL default '' COMMENT 'shopkeeper name',
   `description` varchar(255) NOT NULL,
   `logo_url` varchar(255) NOT NULL DEFAULT '',
   `gender` tinyint unsigned NOT NULL COMMENT 'shopkeeper gender ,1 male , 2 female',
   `scale` varchar(32) NOT NULL DEFAULT '',
   `phone` varchar(32) NOT NULL DEFAULT '',
   `country` varchar(32) NOT NULL DEFAULT '',
   `state` varchar(32) NOT NULL DEFAULT '',
   `city` varchar(32) NOT NULL DEFAULT '',
   `region` varchar(32) NOT NULL DEFAULT '',
   `market` varchar(255) NOT NULL DEFAULT '',
   `stalls` varchar(255) NOT NULL DEFAULT '',
   `addr_detail` varchar(255) NOT NULL DEFAULT'',
   `zipCode` varchar(32) NOT NULL DEFAULT '',
   PRIMARY KEY (`profile_id`),
);

CREATE TABLE IF NOT EXISTS `ck_store_profiles`(
   `profile_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `store_id` int(11) unsigned NOT NULL,
   `shopkeeper` varchar(255) NOT NULL default '' COMMENT 'shopkeeper name',
   `description` varchar(255) NOT NULL,
   `logo_url` varchar(255) NOT NULL DEFAULT '',
   `gender` tinyint unsigned NOT NULL COMMENT 'shopkeeper gender ,1 male , 2 female',
   `scale` varchar(32) NOT NULL DEFAULT '',
   `phone` varchar(32) NOT NULL DEFAULT '',
   `country` varchar(32) NOT NULL DEFAULT '',
   `state` varchar(32) NOT NULL DEFAULT '',
   `city` varchar(32) NOT NULL DEFAULT '',
   `region` varchar(32) NOT NULL DEFAULT '',
   `market` varchar(255) NOT NULL DEFAULT '',
   `stalls` varchar(255) NOT NULL DEFAULT '',
   `addr_detail` varchar(255) NOT NULL DEFAULT'',
   `zipCode` varchar(32) NOT NULL DEFAULT '',
   PRIMARY KEY (`profile_id`),
);

CREATE TABLE IF NOT EXISTS `ck_financial_account` (
  `account_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `account` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(32) NOT NULL,
  `pay_password` varchar(32) NOT NULL,
  `identify_card` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  `phone` varchar(32) NOT NULL DEFAULT '',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`account_id`)
) ;


INSERT INTO `ck_financial_account` (`user_id`, `account`, `email`, `password`, `pay_password`, `identify_card`, `name`, `phone`, `create_time`) VALUES
(1, '116539950@qq.com', '116539950@qq.com', '454414', '454414', '', '', '15902023879', '2015-05-27 05:51:06'),
(2, 'seller', 'he_yaopeng@163.com', '454414', '454414', '', '', '', '2015-05-27 05:51:06');

CREATE TABLE IF NOT EXISTS `ck_account_balance` (
  `balance_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int(11) unsigned NOT NULL,
  `balance` decimal(10,2) NOT NULL DEFAULT '0.00',
  `frozen_money` decimal(10,2) NOT NULL DEFAULT '0.00',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1:active ,0:frozen',
  PRIMARY KEY (`balance_id`)
);

INSERT INTO `ck_account_balance` (`account_id`, `balance`, `frozen_money`, `status`) VALUES
(1, '30000.00', '0.00', 1),
(2, '20000.00', '0.00', 1);



CREATE TABLE IF NOT EXISTS `ck_deliver_addrs`(
   `deliverAddr_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `user_id` int(11) unsigned NOT NULL ,
   `name` varchar(255) NOT NULL ,
   `phone` varchar(32) NOT NULL DEFAULT '',
   `country` varchar(32) NOT NULL DEFAULT '',
   `state` varchar(32) NOT NULL DEFAULT '',
   `city` varchar(32) NOT NULL DEFAULT '',
   `region` varchar(32) NOT NULL DEFAULT '',
   `addr_detail` varchar(255) NOT NULL DEFAULT'',
   `zipCode` varchar(32) NOT NULL DEFAULT '',
    `is_default` boolean NOT NULL ,
   PRIMARY KEY(`deliverAddr_id`),
);
INSERT INTO `ck_deliver_addrs` (`deliverAddr_id`, `user_id`, `name`, `phone`, `country`, `state`, `city`, `region`, `addr_detail`, `zipCode`, `is_default`) VALUES
(1, 1, '邓泓清1', '15217549001', '中国', '广东省', '广州市', '海珠区', '仑头路21号', ' 510320', 1),
(2, 1, '邓泓清2', '15217549001', '中国', '广东省', '广州市', '海珠区', '仑头路22号', ' 510320', 0),
(3, 1, '邓泓清3', '15217549001', '中国', '广东省', '广州市', '海珠区', '仑头路23号', ' 510320', 0);

CREATE TABLE IF NOT EXISTS `ck_payment_orders`(
   `payment_order_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `money` decimal(10,2) NOT NULL DEFAULT 0.00,
   `code` varchar(255) NOT NULL DEFAULT '' ,
   `status` boolean NOT NULL DEFAULT 0,
   PRIMARY KEY (`payment_order_id`)
);
INSERT INTO `ck_payment_orders` (`payment_order_id`, `money`) VALUES
(1, 34.5),
(2, 1.50),
(3, 10.4);

CREATE TABLE IF NOT EXISTS `ck_orders`(
   `order_id` int(11) unsigned NOT NULL AUTO_INCREMENT ,
   `order_serialNum` varchar(255) NOT NULL DEFAULT '' ,
   `seller_id` int(11) unsigned NOT NULL ,
   `buyer_id` int(11) unsigned NOT NULL,
   `store_id` int(11) unsigned NOT NULL,
   `payment_order_id` int(11) unsigned NOT NULL DEFAULT 0,
   `shipping_id` int(11) unsigned NOT NULL DEFAULT 0,
   `deliverAddr_id` int(11) unsigned NOT NULL,
   `snap_id` int(11) unsigned NOT NULL,
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
   `pay_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `pay_message` varchar(255) NOT NULL DEFAULT '',
   `shipping_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `shipping_code` varchar(64) NOT NULL,
   `complete_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `shipping_cost` decimal(10,2) NOT NULL DEFAULT '0.00' ,
   `total_price` decimal(10,2) NOT NULL ,
   `status` tinyint NOT NULL DEFAULT '1',
   `type` tinyint not null default 1,
    PRIMARY KEY (`order_id`)
);
INSERT INTO `ck_orders` (`order_serialNum`, `seller_id`,`buyer_id`, `store_id`,
`deliverAddr_id`, `snap_id`,`shipping_code`,`total_price`) VALUES
('33122143242332',1,2,1,1,1,510000,180),
('33324234312364',1,2,1,1,1,510000,100);

CREATE TABLE IF NOT EXISTS `ck_product_snaps`(
   `snap_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `product_id` int(11) NOT NULL,
   `content` varchar(255) NOT NULL,
   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY(`snap_id`)
);

CREATE TABLE IF NOT EXISTS `ck_orderItems`(
   `item_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `order_id` int(11) unsigned NOT NULL ,
   `store_id` int(11) unsigned NOT NULL,
   `product_id` int(11) unsigned NOT NULL,
   `combination_id` int(11) unsigned NOT NULL,
   `amount` smallint(8) NOT NULL DEFAULT 0,
   `price` decimal(10,2) NOT NULL ,
   PRIMARY KEY(`item_id`),
);
INSERT INTO `ck_orderitems` (`order_id`, `store_id`,`product_id`, `combination_id`,`amount`, `price`) VALUES
(1, 1,64,5,3,60),
(2, 1,64,6,2,40),
(2, 1,64,7,1,20);

CREATE TABLE IF NOT EXISTS `ck_users` (
   `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT,      
   `user_type` char(1) NOT NULL DEFAULT 'C', 
   `status` boolean NOT NULL DEFAULT '1', 
   `email` varchar(128) not null unique,
   `password` varchar(32) not null,
	`login_count` smallint(5) NOT NULL DEFAULT 0,
   `regist_time` timestamp NOT NULL DEFAULT　CURRENT_TIMESTAMP　,   
   PRIMARY KEY (`user_id`)
 );
INSERT INTO `ck_users` ( `user_type`, `status`, `email`, `password`, `login_count`) VALUES 
( 'S', '1', '645071278@qq.com', '99EE99119955BB2299AA44DD55330011', '0'),
( 'C', '1', 'fangguikai@163.com', '99EE99119955BB2299AA44DD55330011', '0');

CREATE TABLE IF NOT EXISTS `ck_login_history`(
   `history_id` int(11) unsigned NOT NULL AUTO_INCREMENT, 
   `user_id` int(11) unsigned NOT NULL ,   
   `login_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP , 
   `login_ip` varchar(255) NOT NULL DEFAULT '',
   PRIMARY KEY (`history_id`)
   );

CREATE TABLE IF NOT EXISTS `ck_categories`(
   `category_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `category`  varchar(255) NOT NULL,
   `parent_id` int(11) unsigned NOT NULL DEFAULT 0,
   `is_leaf` boolean NOT NULL DEFAULT 1,   
   `level` tinyint unsigned NOT NULL DEFAULT 1,
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `weight` int(11) unsigned NOT NULL DEFAULT 0,
   PRIMARY KEY (`category_id`)
);
INSERT INTO `ck_categories` (`category_id`, `category`, `parent_id`, `is_leaf`, `level`, `position`, `weight`) VALUES (NULL, '男装', '0', '0', '1', '0', '0'), (NULL, '女装', '0', '0', '1', '0', '0');
INSERT INTO `ck_categories` (`category_id`, `category`, `parent_id`, `is_leaf`, `level`, `position`, `weight`) VALUES (NULL, '上衣', '1', '0', '2', '0', '0'), (NULL, '裤子', '1', '0', '2', '0', '0');
INSERT INTO `ck_categories` (`category_id`, `category`, `parent_id`, `is_leaf`, `level`, `position`, `weight`) VALUES (NULL, 'T恤', '3', '1', '3', '0', '0'), (NULL, '牛仔裤', '4', '1', '3', '0', '0');

CREATE TABLE IF NOT EXISTS `ck_types`(
   `type_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `type` varchar(255) NOT NULL DEFAULT '',
   `status` boolean NOT NULL DEFAULT '1',
   PRIMARY KEY (`type_id`)
);
INSERT INTO `ck_types` (`type_id`, `type`, `status`) VALUES (NULL, '类型一', '1');
CREATE TABLE IF NOT EXISTS `ck_categories_types`(  
   `type_id` int(11) unsigned NOT NULL,
   `category_id` int(11) unsigned NOT NULL,   
   PRIMARY KEY (`type_id`,`category_id`)
) ;
INSERT INTO `ck_categories_types` (`type_id`, `category_id`) VALUES ('1', '3'), ('1', '6');
CREATE TABLE IF NOT EXISTS `ck_features`(
   `feature_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `feature` varchar(255) NOT NULL DEFAULT '',
   `status` boolean NOT NULL DEFAULT '1',
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `showType` char(1) not null default '',
   PRIMARY KEY (`feature_id`)
);
INSERT INTO `ck_features` (`feature_id`, `feature`, `status`, `position`, `showType`) VALUES (NULL, '材质', '1', '0','S');
INSERT INTO `ck_features` (`feature_id`, `feature`, `status`, `position`, `showType`) VALUES (NULL, '布料', '1', '0','C');
CREATE TABLE IF NOT EXISTS `ck_types_features_link`(
   `feature_id` int(11) unsigned NOT NULL,
   `type_id` int(11) unsigned NOT NULL,
   PRIMARY KEY (`feature_id`,`type_id`)
);
INSERT INTO `ck_types_features_link` (`feature_id`, `type_id`) VALUES ('1', '1'), ('2', '1');
CREATE TABLE IF NOT EXISTS `ck_feature_values`(
   `value_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `feature_id` int(11) unsigned NOT NULL,
   `value` varchar(255) NOT NULL DEFAULT '',
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   PRIMARY KEY (`value_id`)
);
INSERT INTO `ck_feature_values` (`value_id`, `feature_id`, `value`, `position`) VALUES (NULL, '1', '材质1', '0'), (NULL, '1', '材质2', '0'), (NULL, '2', '布料1', '0'), (NULL, '2', '布料2', '0');
CREATE TABLE IF NOT EXISTS `ck_self_features`(
   `feature_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `feature` varchar(255) NOT NULL DEFAULT '',
   `status` boolean NOT NULL DEFAULT '1',
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   PRIMARY KEY (`feature_id`)
);
CREATE TABLE IF NOT EXISTS `ck_self_feature_values`(
   `value_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `feature_id` int(11) unsigned NOT NULL,
   `value` varchar(255) NOT NULL DEFAULT '',
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   PRIMARY KEY (`value_id`)
);


CREATE TABLE IF NOT EXISTS `ck_specifications` (
  `specification_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `specification` varchar(255) NOT NULL DEFAULT '',
  `showType` char(1) NOT NULL DEFAULT '',
  `displayType` char(1) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `has_image` tinyint(1) NOT NULL DEFAULT '0',
  `position` smallint(5) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`specification_id`)
);

INSERT INTO `ck_specifications` (`specification_id`, `specification`, `showType`, `displayType`, `status`, `has_image`, `position`) VALUES
(1, 'Color', 'C', 'C', 1, 1, 0),
(2, 'Size', 'C', 'S', 1, 0, 0),
(3, '类型二的规格一', 'C', 'C', 1, 0, 0),
(4, '类型二的规格二', 'C', 'S', 1, 0, 0);

CREATE TABLE IF NOT EXISTS `ck_types_specifications_link`(
   `specification_id` int(11) unsigned NOT NULL,
   `type_id` int(11) unsigned NOT NULL,
   PRIMARY KEY (`specification_id`,`type_id`)
);
INSERT INTO `ck_types_specifications_link` (`specification_id`, `type_id`) VALUES ('1', '1'), ('2', '1');
CREATE TABLE IF NOT EXISTS `ck_specification_values`(
   `value_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `specification_id` int(11) unsigned NOT NULL ,
   `value` varchar(255) NOT NULL DEFAULT '',
   `position` smallint(5) NOT NULL,
   PRIMARY KEY (`value_id`)
);
INSERT INTO `ck_specification_values` (`value_id`, `specification_id`, `value`, `position`) VALUES (NULL, '1', '红色', '0'), (NULL, '1', '黄色', '0'), (NULL, '2', 'S', '0'), (NULL, '2', 'M', '0'), (NULL, '2', 'L', '0');
CREATE TABLE IF NOT EXISTS `ck_self_specification_values`(
   `value_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `specification_id` int(11) unsigned NOT NULL ,
   `value` varchar(255) NOT NULL DEFAULT '',
   `position` smallint(5) NOT NULL,
   PRIMARY KEY (`value_id`)
);

CREATE TABLE IF NOT EXISTS `ck_brands`(
   `brand_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `brand` varchar(255) NOT NULL ,
   `status` boolean NOT NULL DEFAULT '1',
   `image_url` varchar(255) NOT NULL DEFAULT '',
   PRIMARY KEY (`brand_id`)
);
CREATE TABLE IF NOT EXISTS `ck_types_brands_link`(
   `brand_id` int(11) unsigned NOT NULL,
   `type_id` int(11) unsigned NOT NULL,
   PRIMARY KEY (`brand_id`,`type_id`)
);


CREATE TABLE IF NOT EXISTS `ck_stores`(
   `store_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `user_id`  int (11) unsigned NOT NULL, 
   `store` varchar(255) NOT NULL unique,
   `status` boolean NOT NULL DEFAULT '1',
   `timestamp` timestamp NOT NULL,
   PRIMARY KEY (`store_id`)
);
INSERT INTO `ck_stores` ( `user_id`, `store`) VALUES 
( '1', 'Cooka' ), 
( '1', 'CookaBuy');


CREATE TABLE IF NOT EXISTS `ck_store_top_images`(
   `store_id` int(11) unsigned NOT NULL ,
   `image_url` varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `ck_image_zone`(
	`user_id` int(11) unsigned NOT NULL,
	`store_id` int(11) unsigned NOT NULL,
	`image_url` varchar(255) NOT NULL,
);

CREATE TABLE IF NOT EXISTS `ck_self_categories`(
   `category_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `category` varchar(255) NOT NULL DEFAULT '',
   `store_id` int(11) unsigned NOT NULL ,
   `is_leaf` boolean NOT NULL DEFAULT 1,
   `parent_id` int(11) unsigned NOT NULL DEFAULT 0,
   `level` tinyint unsigned NOT NULL DEFAULT 1,
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `weight` int(11) unsigned NOT NULL DEFAULT 0,
   PRIMARY KEY (`category_id`)
);

CREATE TABLE IF NOT EXISTS `ck_products` (
   `product_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `store_id` int(11) unsigned NOT NULL, 
   `brand_id` int(11) unsigned NOT NULL DEFAULT 0,
   `approval` boolean NOT NULL DEFAULT '1', 
   `status` boolean NOT NULL DEFAULT '1',
   `timestamp` timestamp not null , 
   `list_price` decimal(12,2) NOT null DEFAULT 0.00, 
   `title` varchar(255) NOT NULL DEFAULT '', 
   `feature_file` varchar(255) NOT NULL DEFAULT '',
   `description` varchar(255) NOT NULL DEFAULT '',	
   `last_Modify` timestamp not null DEFAULT CURRENT_TIMESTAMP,	
   PRIMARY KEY (`product_id`)
 ) ;

INSERT INTO `ck_products` (`product_id`, `store_id`, `brand_id`, `approval`, `status`, `timestamp`, `list_price`, `title`, `feature_file`, `description`) VALUES
(1, 0, 0, 1, 1, '2015-05-15 01:49:48', '0.00', '何耀澎测试产品', '', 'group1/M00/00/00/wKgBhFVTCTeAZAmOAABBhty1wxc249.txt'),
(2, 0, 1, 1, 1, '2015-05-15 01:52:05', '0.00', 'asdf', '', 'group1/M00/00/01/wKgBhVVVUYiAMxSlAAAAEp50o0c783.txt'),
(3, 0, 1, 1, 1, '2015-05-15 01:56:41', '0.00', 'sdf', '', 'group1/M00/00/01/wKgBhFVVUoiAXDl8AAAAEp50o0c502.txt'),
(4, 0, 1, 1, 1, '2015-05-15 01:59:26', '0.00', 'sdf', '', 'group1/M00/00/01/wKgBhVVVU0GAVD1iAAAAEp50o0c236.txt'),
(5, 0, 1, 1, 1, '2015-05-15 01:59:54', '0.00', 'asdf', '', 'group1/M00/00/01/wKgBhFVVU0mAXGrSAAAAEp50o0c241.txt'),
(6, 0, 1, 1, 1, '2015-05-15 08:24:38', '0.00', 'sdf', '', 'group1/M00/00/01/wKgBhFVVrXaAEmedAAAAEp50o0c259.txt'),
(7, 0, 1, 1, 1, '2015-05-15 08:30:31', '0.00', 'asdf', '', 'group1/M00/00/01/wKgBhVVVru6AQGUkAAAAEp50o0c796.txt'),
(8, 0, 1, 1, 1, '2015-05-15 08:50:37', '0.00', 'sdfg', '', 'group1/M00/00/01/wKgBhVVVs6WAUwJEAAAAEp50o0c713.txt'),
(9, 0, 1, 1, 1, '2015-05-15 08:56:19', '0.00', 'dsfg', '', 'group1/M00/00/01/wKgBhFVVtOOAR_YHAAAAEp50o0c324.txt'),
(10, 0, 1, 1, 1, '2015-05-15 08:58:45', '0.00', 'asdf', '', 'group1/M00/00/01/wKgBhVVVtYyAKKABAAAAEp50o0c385.txt'),
(11, 0, 1, 1, 1, '2015-05-15 12:50:41', '0.00', 'gfh', '', 'group1/M00/00/01/wKgBhFVV69GAP4HvAAAAEp50o0c935.txt'),
(12, 0, 1, 1, 1, '2015-05-16 04:02:57', '0.00', 'sadf', '', 'group1/M00/00/02/wKgBhVVWwcCAQKqmAAAAEp50o0c321.txt'),
(13, 0, 1, 1, 1, '2015-05-16 09:30:59', '0.00', 'dasfasdg', '', ''),
(14, 0, 1, 1, 1, '2015-05-16 09:35:06', '0.00', 'dsfg', '', ''),
(15, 0, 0, 1, 1, '2015-05-20 12:31:36', '0.00', 'sadf', '', 'group1/M00/00/02/wKgBhFVcftmABkKCAAAAEp50o0c731.txt'),
(16, 0, 0, 1, 1, '2015-05-20 12:31:58', '0.00', 'sdaf', '', 'group1/M00/00/02/wKgBhFVcfu-AK5L-AAAAEp50o0c826.txt'),
(17, 0, 0, 1, 1, '2015-05-20 12:37:35', '0.00', 'sdaf', '', 'group1/M00/00/02/wKgBhFVcgECADuvTAAAAEp50o0c588.txt'),
(18, 0, 0, 1, 1, '2015-05-20 12:37:53', '0.00', 'sdfg', '', 'group1/M00/00/02/wKgBhFVcgFKAMjSxAAAAEp50o0c847.txt'),
(19, 0, 0, 1, 1, '2015-05-20 12:40:53', '0.00', 'asdf', 'group1/M00/00/02/wKgBhVVcgSCAZx4vAAAAJ0Cd-lk961.txt', 'group1/M00/00/02/wKgBhFVcgQOAIqN6AAAAEp50o0c516.txt'),
(20, 0, 0, 1, 1, '2015-05-20 12:42:53', '0.00', 'asdf', 'group1/M00/00/02/wKgBhVVcgZeAKp9bAAAAJ0Cd-lk352.txt', 'group1/M00/00/02/wKgBhFVcgXmAabRpAAAAEp50o0c618.txt'),
(21, 0, 0, 1, 1, '2015-05-20 12:44:06', '0.00', 'asdf', 'group1/M00/00/02/wKgBhVVcgeGALv-0AAAAJ0Cd-lk669.txt', 'group1/M00/00/02/wKgBhFVcgcKASmiuAAAAEp50o0c856.txt'),
(22, 0, 0, 1, 1, '2015-05-20 12:48:50', '0.00', 'sdfg', 'group1/M00/00/02/wKgBhVVcgv2AW_nFAAABme2ptec932.txt', 'group1/M00/00/02/wKgBhFVcgt-AMXPwAAAAEp50o0c263.txt'),
(23, 0, 0, 1, 1, '2015-05-20 13:35:24', '0.00', 'sadf', 'group1/M00/00/02/wKgBhVVcjeeAdswcAAABkjaBmw4514.txt', 'group1/M00/00/02/wKgBhFVcjcmAAuPZAAAAEp50o0c467.txt'),
(24, 0, 0, 1, 1, '2015-05-20 13:37:36', '0.00', 'sadf', 'group1/M00/00/02/wKgBhVVcjmuAStc4AAAByprU7WQ460.txt', 'group1/M00/00/02/wKgBhFVcjkyATp0_AAAAEp50o0c473.txt'),
(25, 0, 0, 1, 1, '2015-05-20 13:38:02', '0.00', 'sadfasdg', 'group1/M00/00/02/wKgBhVVcjoWAQTcVAAABGeVwVSk342.txt', 'group1/M00/00/02/wKgBhFVcjmeAU-JFAAAAEp50o0c508.txt'),
(26, 0, 0, 1, 1, '2015-05-20 13:44:36', '0.00', 'asdf', 'group1/M00/00/02/wKgBhVVckBCAPrv3AAABE9uXpaM618.txt', 'group1/M00/00/02/wKgBhFVcj_KAKRHnAAAAEp50o0c771.txt'),
(27, 0, 0, 1, 1, '2015-05-20 13:48:37', '0.00', 'sadf', 'group1/M00/00/02/wKgBhVVckQGAf94SAAACSk_gkGA983.txt', 'group1/M00/00/02/wKgBhFVckOOASam3AAAAEp50o0c969.txt'),
(28, 0, 0, 1, 1, '2015-05-20 13:58:57', '0.00', '124', 'group1/M00/00/02/wKgBhVVck2yAbvRWAAABkmwAWoY119.txt', 'group1/M00/00/02/wKgBhFVck0-AXjW9AAAAEp50o0c415.txt'),
(29, 0, 0, 1, 1, '2015-05-21 01:05:29', '0.00', 'asdf', 'group1/M00/00/02/wKgBhVVdL6mAAQoMAAAAopWKrxc912.txt', 'group1/M00/00/02/wKgBhFVdL4eAafhoAAAAEp50o0c383.txt'),
(30, 0, 0, 1, 1, '2015-05-21 01:34:54', '0.00', 'asdf', '', 'group1/M00/00/02/wKgBhFVdNm-Ae4_AAAAAEp50o0c348.txt'),
(31, 0, 0, 1, 1, '2015-05-21 01:41:09', '0.00', '阿斯蒂芬', 'group1/M00/00/02/wKgBhFVdN-aALDrmAAAA-wSa-vA765.txt', 'group1/M00/00/02/wKgBhVVdOAGAW1bFAAAAEp50o0c698.txt'),
(32, 0, 0, 1, 1, '2015-05-21 06:19:09', '0.00', '圣达菲', '', 'group1/M00/00/02/wKgBhFVdeQ6ASOMvAAAAEp50o0c295.txt'),
(33, 0, 0, 1, 1, '2015-05-21 06:24:13', '0.00', '阿斯蒂芬', '', 'group1/M00/00/02/wKgBhVVdemCAAlAXAAAAEp50o0c973.txt'),
(34, 0, 0, 1, 1, '2015-05-21 06:26:39', '0.00', 'sdf', '', 'group1/M00/00/02/wKgBhFVdetGAFCWAAAAAEp50o0c064.txt'),
(35, 0, 0, 1, 1, '2015-05-21 06:28:52', '0.00', '阿斯蒂芬', '', 'group1/M00/00/02/wKgBhVVde3eACtwGAAAAEp50o0c000.txt'),
(36, 0, 0, 1, 1, '2015-05-21 06:31:32', '0.00', '阿斯蒂芬', '', 'group1/M00/00/02/wKgBhFVde_WAWw6eAAAAEp50o0c226.txt'),
(37, 0, 0, 1, 1, '2015-05-21 06:33:38', '0.00', '阿斯蒂芬', 'group1/M00/00/02/wKgBhFVdfHSAGAuiAAAAq0e7_7I420.txt', 'group1/M00/00/02/wKgBhVVdfJKAc0FxAAAAEp50o0c559.txt'),
(38, 0, 0, 1, 1, '2015-05-21 13:00:16', '0.00', 'asdf', '', 'group1/M00/00/02/wKgBhVVd1zeAIiVIAAAAEp50o0c135.txt'),
(39, 0, 0, 1, 1, '2015-05-21 13:03:00', '0.00', 'asdf', 'group1/M00/00/02/wKgBhVVd19qAdLFSAAAAopWKrxc422.txt', 'group1/M00/00/02/wKgBhFVd17KAAJ-cAAAAEp50o0c125.txt'),
(40, 0, 0, 1, 1, '2015-05-21 13:10:45', '0.00', 'asdf', 'group1/M00/00/02/wKgBhVVd2auAIKrHAAAAuQ5li54519.txt', 'group1/M00/00/02/wKgBhFVd2YOAN_R0AAAAEp50o0c646.txt'),
(41, 0, 0, 1, 1, '2015-05-21 13:27:14', '0.00', 'asdf', 'group1/M00/00/02/wKgBhVVd3YiAAR6oAAAAxF9YYoc740.txt', 'group1/M00/00/02/wKgBhFVd3V-AFNGtAAAAEp50o0c474.txt'),
(42, 0, 0, 1, 1, '2015-05-21 13:37:16', '0.00', 'asdf', '', 'group1/M00/00/02/wKgBhFVd376ACSNZAAAAEp50o0c855.txt'),
(43, 0, 0, 1, 1, '2015-05-21 13:39:41', '0.00', 'asdf', 'group1/M00/00/02/wKgBhFVd4E6AIOegAAAArQsE2QY056.txt', 'group1/M00/00/02/wKgBhVVd4HCALjY8AAAAEp50o0c692.txt'),
(44, 0, 0, 1, 1, '2015-05-25 04:57:43', '0.00', 'sdf', '', 'group1/M00/00/02/wKgBhVVirEWACtyaAAAAEp50o0c191.txt'),
(45, 0, 0, 1, 1, '2015-05-25 04:59:50', '0.00', 'sdf', '', 'group1/M00/00/02/wKgBhFVirHmAEIDDAAAAEp50o0c004.txt'),
(46, 0, 0, 1, 1, '2015-05-25 05:01:18', '0.00', 'sdf', 'group1/M00/00/02/wKgBhFVirNGAc12KAAAAuqIYhwQ231.txt', 'group1/M00/00/02/wKgBhVVirRmAc3gBAAAAEp50o0c746.txt'),
(47, 0, 0, 1, 1, '2015-05-25 05:03:00', '0.00', 'sdf', 'group1/M00/00/02/wKgBhFVirTeAEl--AAAAuqIYhwQ605.txt', 'group1/M00/00/02/wKgBhVVirX6AbTOsAAAAEp50o0c109.txt'),
(48, 0, 0, 1, 1, '2015-05-25 05:04:31', '0.00', 'sdf', 'group1/M00/00/02/wKgBhFVirZKAaXvzAAAAuqIYhwQ384.txt', 'group1/M00/00/02/wKgBhVVirdmAJyTVAAAAEp50o0c067.txt'),
(49, 0, 0, 1, 1, '2015-05-25 05:20:49', '0.00', 'sdf', 'group1/M00/00/02/wKgBhFVisWSAcUTnAAAAuqIYhwQ241.txt', 'group1/M00/00/02/wKgBhVVisayAW3LuAAAAEp50o0c721.txt'),
(50, 0, 0, 1, 1, '2015-05-25 05:23:55', '0.00', 'sdf', 'group1/M00/00/02/wKgBhFVish6AaUxvAAAAuqIYhwQ150.txt', 'group1/M00/00/02/wKgBhVVismaAAEfxAAAAEp50o0c898.txt'),
(51, 0, 0, 1, 1, '2015-05-25 05:24:43', '0.00', 'sdf', 'group1/M00/00/02/wKgBhFVisk6AfaZwAAAAuqIYhwQ220.txt', 'group1/M00/00/02/wKgBhVVispaAA53UAAAAEp50o0c333.txt'),
(52, 0, 0, 1, 1, '2015-05-25 07:26:56', '0.00', '测试', '', 'group1/M00/00/02/wKgBhVVizz6AK58QAAAAEp50o0c858.txt'),
(53, 0, 0, 1, 1, '2015-05-25 07:28:15', '0.00', '测试', '', 'group1/M00/00/02/wKgBhFViz0GASwekAAAAEp50o0c276.txt'),
(54, 0, 0, 1, 1, '2015-05-25 07:30:16', '0.00', '测试', '', 'group1/M00/00/02/wKgBhVVi0AeASkloAAAAEp50o0c064.txt'),
(55, 0, 0, 1, 1, '2015-05-25 07:35:36', '0.00', '阿斯蒂芬', 'group1/M00/00/02/wKgBhVVi0UeAchd3AAAArG6OmGQ032.txt', 'group1/M00/00/02/wKgBhFVi0PeADkwdAAAAEp50o0c614.txt'),
(56, 0, 0, 1, 1, '2015-05-25 07:37:49', '0.00', '阿斯蒂芬', 'group1/M00/00/02/wKgBhVVi0cyAU2gfAAAAnMS9t-A110.txt', 'group1/M00/00/02/wKgBhFVi0XuANLoMAAAAEp50o0c532.txt'),
(57, 0, 0, 1, 1, '2015-05-25 07:39:27', '0.00', 'sadf', '', 'group1/M00/00/02/wKgBhFVi0eKAbmjnAAAAEp50o0c742.txt'),
(58, 0, 0, 1, 1, '2015-05-25 07:46:26', '0.00', 'sadf', '', 'group1/M00/00/02/wKgBhVVi09CATD1SAAAAEp50o0c950.txt'),
(59, 0, 0, 1, 1, '2015-05-25 07:48:09', '0.00', 'sadf', '', 'group1/M00/00/02/wKgBhFVi0-uAOZZLAAAAEp50o0c526.txt'),
(60, 0, 0, 1, 1, '2015-05-25 07:49:27', '0.00', 'sadf', '', 'group1/M00/00/02/wKgBhVVi1IaADAlDAAAAEp50o0c039.txt'),
(61, 0, 0, 1, 1, '2015-05-25 07:54:15', '0.00', 'sadf', '', 'group1/M00/00/02/wKgBhFVi1VmAGLAbAAAAEp50o0c284.txt'),
(62, 0, 0, 1, 1, '2015-05-25 08:01:20', '0.00', 'sadf', '', 'group1/M00/00/02/wKgBhVVi106AHCkGAAAAEp50o0c711.txt'),
(63, 0, 0, 1, 1, '2015-05-25 08:17:55', '0.00', 'sadf', 'group1/M00/00/02/wKgBhVVi2zKAO3Y6AAAAo5cQr58292.txt', 'group1/M00/00/02/wKgBhFVi2uKAe20lAAAAEp50o0c523.txt'),
(64, 0, 0, 1, 1, '2015-05-25 08:19:59', '0.00', '产品一', 'group1/M00/00/02/wKgBhVVi266ATErSAAAArbUd0HU627.txt', 'group1/M00/00/02/wKgBhFVi216AEOIYAAAAEp50o0c887.txt');

CREATE TABLE IF NOT EXISTS `ck_product_images_link`(
   `product_id` int(11) unsigned NOT NULL ,
   `image_url` varchar(255) NOT NULL DEFAULT ''
);


CREATE TABLE IF NOT EXISTS `ck_products_categories_link`(
	`product_id` int(11) unsigned NOT NULL,
	`category_id` int(11) unsigned NOT NULL,
	PRIMARY KEY (`product_id`,`category_id`)
);

CREATE TABLE IF NOT EXISTS `ck_products_features_values_link`(
   `feature_id` int(11) unsigned NOT NULL,
   `product_id` int(11) unsigned NOT NULL,
   `value_id` int(11) unsigned NOT NULL,
   PRIMARY KEY (`feature_id`,`product_id`,`value_id`)
);
CREATE TABLE IF NOT EXISTS `ck_products_self_features_values_link`(
   `feature_id` int(11) unsigned NOT NULL,
   `product_id` int(11) unsigned NOT NULL,
   `value_id` int(11) unsigned NOT NULL,
   PRIMARY KEY (`feature_id`,`product_id`,`value_id`) 
);

CREATE TABLE IF NOT EXISTS `ck_product_keywords`(
   `keyword_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `product_id` int(11) unsigned NOT NULL,
   `keyword` varchar(255) NOT NULL DEFAULT '',
   `weight` int(11) unsigned NOT NULL DEFAULT 0,
   PRIMARY KEY (`keyword_id`)
) ;

CREATE TABLE IF NOT EXISTS `ck_product_prices` (
   `price_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `store_id` int(11) unsigned NOT NULL,
   `product_id` int(11) unsigned NOT NULL,
   `price` decimal(12,2) NOT null DEFAULT 0.00, 
   `amount_limit` smallint(5) unsigned NOT NULL DEFAULT 0, 
   PRIMARY KEY (`price_id`)
 ) ;

CREATE TABLE IF NOT EXISTS `ck_products_specifications_values_link`(
   `specification_id` int(11) unsigned NOT NULL,
   `product_id` int(11) unsigned NOT NULL,
   `value_id` int(11) unsigned NOT NULL,
   `image_url` varchar(255) NOT NULL, 
   PRIMARY KEY (`specification_id`,`product_id`,`value_id`) 
);
CREATE TABLE IF NOT EXISTS `ck_products_self_specifications_values_link`(
   `specification_id` int(11) unsigned NOT NULL,
   `product_id` int(11) unsigned NOT NULL,
   `value_id` int(11) unsigned NOT NULL,
   `image_url` varchar(255) NOT NULL,
   PRIMARY KEY (`specification_id`,`product_id`,`value_id`) 
);


CREATE TABLE IF NOT EXISTS `ck_specification_combinations` (
  `combination_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(11) unsigned NOT NULL,
  `combination` varchar(255) NOT NULL,
  `amount` smallint(8) NOT NULL DEFAULT '0',
  `product_code` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`combination_id`)
);

INSERT INTO `ck_specification_combinations` (`combination_id`, `product_id`, `combination`, `amount`, `product_code`) VALUES
(1, 55, '1:1,2:3', 1, '1'),
(2, 56, '1:1,2:3', 2, '2'),
(3, 63, '1:1,2:4', 2, '2'),
(4, 63, '1:2,2:4', 2, '2'),
(5, 64, '1:1,2:3', 10, ''),
(6, 64, '1:1,2:4', 11, ''),
(7, 64, '1:2,2:3', 12, ''),
(8, 64, '1:2,2:4', 13, '');

CREATE TABLE IF NOT EXISTS `ck_business_scope`(
   `store_id` int(11) unsigned NOT NULL,
   `category_id` int(11) unsigned NOT NULL,
   PRIMARY KEY (`store_id`,`category_id`)
);


