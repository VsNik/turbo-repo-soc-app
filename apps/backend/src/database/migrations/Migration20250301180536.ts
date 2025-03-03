import { Migration } from '@mikro-orm/migrations';

export class Migration20250301180536 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "posts" ("id" uuid not null, "caption" varchar(255) not null default '', "media" varchar(255) not null, "author_id" uuid not null, "like_count" int not null default 0, "comment_count" int not null default 0, "favorite_count" int not null default 0, "post_type" text check ("post_type" in ('image', 'video')) not null default 'image', "created_at" varchar(255) not null default '2025-03-01T18:05:36.901Z', constraint "posts_pkey" primary key ("id"));`);

    this.addSql(`create table "posts_likes" ("post_id" uuid not null, "user_id" uuid not null, constraint "posts_likes_pkey" primary key ("post_id", "user_id"));`);

    this.addSql(`alter table "posts" add constraint "posts_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade;`);

    this.addSql(`alter table "posts_likes" add constraint "posts_likes_post_id_foreign" foreign key ("post_id") references "posts" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "posts_likes" add constraint "posts_likes_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "users" alter column "created_at" drop default;`);
    this.addSql(`alter table "users" alter column "created_at" type varchar(255) using ("created_at"::varchar(255));`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "posts_likes" drop constraint "posts_likes_post_id_foreign";`);

    this.addSql(`drop table if exists "posts" cascade;`);

    this.addSql(`drop table if exists "posts_likes" cascade;`);

    this.addSql(`alter table "users" alter column "created_at" type varchar(255) using ("created_at"::varchar(255));`);
    this.addSql(`alter table "users" alter column "created_at" set default '2025-02-26T18:14:32.158Z';`);
  }

}
