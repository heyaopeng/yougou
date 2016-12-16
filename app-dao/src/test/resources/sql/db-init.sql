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
drop table if exists ck_image_zones;
drop table if exists ck_image_albums;
drop table if exists ck_zone_images;

CREATE TABLE IF NOT EXISTS `ck_users` (
    `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `parent_id` int(11) unsigned NOT NULL DEFAULT '0',      
   `is_active` boolean NOT NULL DEFAULT '1',
   `is_forbidden` boolean NOT NULL DEFAULT '0',
   `email` varchar(128) not null unique,
   `password` varchar(32) not null,
   `login_count` smallint(5) NOT NULL DEFAULT 0,
   `regist_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, 
   PRIMARY KEY (`user_id`)
 );

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
   `self_feature_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `self_feature` varchar(255) NOT NULL DEFAULT '',
   `status` boolean NOT NULL DEFAULT '1',
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   PRIMARY KEY (`self_feature_id`)
);
CREATE TABLE IF NOT EXISTS `ck_self_feature_values`(
   `self_value_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `self_feature_id` int(11) unsigned NOT NULL,
   `self_value` varchar(255) NOT NULL DEFAULT '',
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   PRIMARY KEY (`self_value_id`)
);


CREATE TABLE IF NOT EXISTS `ck_specifications`(
    `specification_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `specification` varchar(255) NOT NULL DEFAULT '',
   `showType` varchar(255) NOT NULL,
   `displayType` varchar(255) NOT NULL,
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   PRIMARY KEY(`specification_id`)
);
INSERT INTO `ck_specifications` (`specification_id`, `specification`, `showType`, `displayType`, `position`) VALUES (NULL, '颜色', 'checkbox', 'horizontal', '0'), (NULL, '尺寸', 'checkbox', 'vertical', '0');
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
   `self_value_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `specification_id` int(11) unsigned NOT NULL ,
   `hash_code` varchar(255) NOT NULL DEFAULT '',
   `self_value` varchar(255) NOT NULL DEFAULT '',
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   PRIMARY KEY (`self_value_id`)
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
   `store` varchar(255) NOT NULL DEFAULT '' unique,
   `is_authenticated` boolean NOT NULL DEFAULT '0',
   `is_field_authenticated` boolean NOT NULL DEFAULT '0',
   `timestamp` timestamp NOT NULL,
   PRIMARY KEY (`store_id`)
);

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
   `self_category_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `self_category` varchar(255) NOT NULL DEFAULT '',
   `store_id` int(11) unsigned NOT NULL ,
   `is_leaf` boolean NOT NULL DEFAULT 1,
   `parent_id` int(11) unsigned NOT NULL DEFAULT 0,
   `level` tinyint unsigned NOT NULL DEFAULT 1,
   `position` smallint(5) unsigned NOT NULL DEFAULT 0,
   `weight` int(11) unsigned NOT NULL DEFAULT 0,
   PRIMARY KEY (`self_category_id`)
);

CREATE TABLE IF NOT EXISTS `ck_products` (
   `product_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `store_id` int(11) unsigned NOT NULL, 
   `brand_id` int(11) unsigned NOT NULL DEFAULT 0,
   `unit` varchar(255) NOT NULL ,
   `is_approved` boolean NOT NULL DEFAULT '1', 
   `is_active` boolean NOT NULL DEFAULT '0',
   `timestamp` timestamp not null DEFAULT CURRENT_TIMESTAMP, 
   `list_price` decimal(15,2) NOT null DEFAULT 0.00, 
   `title` varchar(255) NOT NULL DEFAULT '', 
   `product_num` varchar(255) NOT NULL DEFAULT '', 
   `feature_file` varchar(255) NOT NULL DEFAULT '', 
   `description` varchar(255) NOT NULL DEFAULT '',	
   `sale_mode` varchar(255) NOT NULL DEFAULT '',
   `active_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `score` double NOT NULL DEFAULT '5.0',
   `last_modify` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (`product_id`)
 ) ;

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
   `self_feature_id` int(11) unsigned NOT NULL,
   `product_id` int(11) unsigned NOT NULL,
   `self_value_id` int(11) unsigned NOT NULL,
   PRIMARY KEY (`self_feature_id`,`product_id`,`self_value_id`) 
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

CREATE TABLE IF NOT EXISTS `ck_specifications_combinations`(
   `combination_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `combination` varchar(255) NOT NULL ,
   `amount` smallint(8) NOT NULL DEFAULT 0,
   `price` decimal(12,2) NOT null DEFAULT 0.00, 
   PRIMARY  KEY (`combination_id`)
);

CREATE TABLE IF NOT EXISTS `ck_business_scope`(
   `store_id` int(11) unsigned NOT NULL,
   `category_id` int(11) unsigned NOT NULL,
   PRIMARY KEY (`store_id`,`category_id`)
);

CREATE TABLE IF NOT EXISTS `ck_image_zones`(
   `zone_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
	`user_id` int(11) unsigned NOT NULL,
	`store_id` int(11) unsigned NOT NULL,
   PRIMARY KEY(`zone_id`)
);

CREATE TABLE IF NOT EXISTS `ck_image_albums`(
   `album_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `zone_id` int(11) unsigned NOT NULL ,
   `albumn_name` varchar(255) NOT NULL DEFAULT '' ,
   `is_default` boolean NOT NULL DEFAULT 0,
   PRIMARY KEY (`album_id`)
);

CREATE TABLE IF NOT EXISTS `ck_zone_images`(
   `image_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `album_id` int(11) unsigned NOT NULL,
   `image_url` varchar(255) NOT NULL,
   `is_cover` boolean NOT NULL DEFAULT 0,
   PRIMARY KEY(`image_id`)
);


