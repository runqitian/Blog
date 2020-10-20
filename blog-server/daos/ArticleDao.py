from .Base import DaoManager
import json

class ArticleDao(DaoManager):

    def __init__(self, conn):
        super().__init__(conn)

    def _insert_tags_ignore(self, tags):
        tags = [(item,) for item in tags]
        query = 'insert ignore into tags (tag) values(%s)'
        self.cursor.executemany(query, tags)
        return

    def _clean_unused_tags(self):
        query = 'delete from tags where id not in (select distinct tag from tag_article)'
        self.cursor.execute(query)
        return

    def _insert_tag_article(self, tags, id):
        str_tags = ', '.join(list(map(repr, tags)))
        query = 'delete from tag_article where article=%s'
        self.cursor.execute(query, (id,))
        query = 'insert ignore into tag_article select id,%s as "article" from tags where tag in (' + str_tags + ')'
        self.cursor.execute(query, (id,))
        return

    def create_article(self, title, tags, summary, content):
        query = 'insert into articles (title, summary, content) values (%s, %s, %s)'
        self.cursor.execute(query, (title, summary, content))
        record_id = -1
        if self.cursor.rowcount > 0:
            record_id = self.cursor.lastrowid
            self._insert_tags_ignore(tags)
            self._insert_tag_article(tags, record_id)
        return record_id


    def update_article_by_id(self, id, title, tags, summary, content):
        query = 'update articles set title=%s, summary=%s, content=%s where id=%s'
        self.cursor.execute(query, (title, summary, content, id))
        self._insert_tags_ignore(tags)
        self._insert_tag_article(tags, id)
        self._clean_unused_tags()
        return

    def delete_article(self, id):
        query = "delete from articles where id=%s"
        self.cursor.execute(query,(id,))
        result = self.cursor.rowcount
        query = "delete from tag_article where article=%s"
        self.cursor.execute(query,(id,))
        self._clean_unused_tags()
        return result

    def get_tags_all(self):
        result = []
        query = 'select tag from tags'
        self.cursor.execute(query)
        for (tag,) in self.cursor.fetchall():
            result.append({'tag': tag})
        return result

    def get_articles_list(self, tag=None, limit=None, offset=None):
        suffix = ""
        if tag != None and tag != "":
            suffix = suffix + f' WHERE JSON_CONTAINS(tags, {repr(json.dumps(tag))})'
        if limit != None:
            suffix = suffix + f" LIMIT {limit}"
        if offset != None:
            suffix = suffix + f" OFFSET {offset}"

        result = []
        query = f'select id, title, tags, summary, content from view_articles_detailed'
        query = query + suffix
        self.cursor.execute(query)
        rows = self.cursor.fetchall()
        for row in rows:
            result.append({'id': row[0], 'title': row[1], 'tags':json.loads(row[2]), 'summary':row[3], 'content':row[4]})
        return result

    def get_article_by_id(self, id):
        query = f'select id, title, tags, summary, content from view_articles_detailed where id={repr(id)}'
        self.cursor.execute(query)
        row = self.cursor.fetchone()
        if row == None:
            return None
        result = {'id': row[0], 'title': row[1], 'tags':json.loads(row[2]), 'summary':row[3], 'content':row[4]}
        return result

    def get_article_summaries_list(self, tag=None, limit=None, offset=None):
        suffix = ""
        if tag != None and tag != "":
            suffix = suffix + f' WHERE JSON_CONTAINS(tags, {repr(json.dumps(tag))})'
        suffix = suffix + " ORDER BY id DESC"
        if limit != None:
            suffix = suffix + f" LIMIT {limit}"
        if offset != None:
            suffix = suffix + f" OFFSET {offset}"

        result = []
        query = f'select id, title, summary from view_articles_detailed'
        query = query + suffix
        self.cursor.execute(query)
        rows = self.cursor.fetchall()
        for row in rows:
            result.append({'id': row[0], 'title': row[1], 'summary':row[2]})
        return result
