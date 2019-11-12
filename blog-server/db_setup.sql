create database blog;
use blog;
create table articles (id int auto_increment primary key, title varchar(40), content text);
create table tags(id int auto_increment primary key, tag varchar(40));
create table tag_article (tag int, article int, primary key(tag, article));
alter table articles add summary varchar(100) after title;