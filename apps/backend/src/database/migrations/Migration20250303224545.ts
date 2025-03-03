import { Migration } from '@mikro-orm/migrations';

export class Migration20250303224545 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "comments" ("id" uuid not null, "content" varchar(255) not null, "post_id" uuid not null, "author_id" uuid not null, "like_count" int not null default 0, "created_at" varchar(255) not null default '2025-03-03T22:45:45.308Z', constraint "comments_pkey" primary key ("id"));`);

    this.addSql(`create table "comments_likes" ("comment_id" uuid not null, "user_id" uuid not null, constraint "comments_likes_pkey" primary key ("comment_id", "user_id"));`);

    this.addSql(`alter table "comments" add constraint "comments_post_id_foreign" foreign key ("post_id") references "posts" ("id") on update cascade;`);
    this.addSql(`alter table "comments" add constraint "comments_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade;`);

    this.addSql(`alter table "comments_likes" add constraint "comments_likes_comment_id_foreign" foreign key ("comment_id") references "comments" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "comments_likes" add constraint "comments_likes_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "posts" alter column "created_at" type varchar(255) using ("created_at"::varchar(255));`);
    this.addSql(`alter table "posts" alter column "created_at" set default '2025-03-03T22:45:45.309Z';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "comments_likes" drop constraint "comments_likes_comment_id_foreign";`);

    this.addSql(`drop table if exists "comments" cascade;`);

    this.addSql(`drop table if exists "comments_likes" cascade;`);

    this.addSql(`alter table "posts" alter column "created_at" type varchar(255) using ("created_at"::varchar(255));`);
    this.addSql(`alter table "posts" alter column "created_at" set default '2025-03-03T11:11:56.187Z';`);
  }

}
