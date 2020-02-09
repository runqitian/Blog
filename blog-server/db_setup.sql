create database blog;
use blog;
create table articles (id int auto_increment primary key, title varchar(40), content text);
create table tags(id int auto_increment primary key, tag varchar(40));
create table tag_article (tag int, article int, primary key(tag, article));
alter table articles add summary varchar(100) after title;

# views
CREATE VIEW view_articles_detailed AS SELECT r1.id, r1.title, JSON_ARRAYAGG(tags.tag) AS tags, r1.summary, r1.content FROM (SELECT id, title, summary, content FROM articles) AS r1 INNER JOIN tag_article ON r1.id=tag_article.article INNER JOIN tags ON tags.id = tag_article.tag GROUP BY id