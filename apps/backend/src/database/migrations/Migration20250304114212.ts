import { Migration } from '@mikro-orm/migrations';

export class Migration20250304114212 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "notification-objects" ("id" uuid not null, "issuer_id" uuid not null, "post_id" uuid null, "type" text check ("type" in ('POST_LIKE', 'FOLLOW', 'COMMENT', 'POST_NEW')) not null default 'POST_LIKE', "created_at" timestamptz not null, constraint "notification-objects_pkey" primary key ("id"));`);

    this.addSql(`create table "notifications" ("id" uuid not null, "notify_object_id" uuid not null, "receive_id" uuid not null, "is_read" boolean not null default false, constraint "notifications_pkey" primary key ("id"));`);

    this.addSql(`alter table "notification-objects" add constraint "notification-objects_issuer_id_foreign" foreign key ("issuer_id") references "users" ("id") on update cascade;`);
    this.addSql(`alter table "notification-objects" add constraint "notification-objects_post_id_foreign" foreign key ("post_id") references "posts" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "notifications" add constraint "notifications_notify_object_id_foreign" foreign key ("notify_object_id") references "notification-objects" ("id") on update cascade;`);

    this.addSql(`alter table "posts" alter column "created_at" type varchar(255) using ("created_at"::varchar(255));`);
    this.addSql(`alter table "posts" alter column "created_at" set default '2025-03-04T11:42:12.529Z';`);

    this.addSql(`alter table "comments" alter column "created_at" type varchar(255) using ("created_at"::varchar(255));`);
    this.addSql(`alter table "comments" alter column "created_at" set default '2025-03-04T11:42:12.528Z';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "notifications" drop constraint "notifications_notify_object_id_foreign";`);

    this.addSql(`drop table if exists "notification-objects" cascade;`);

    this.addSql(`drop table if exists "notifications" cascade;`);

    this.addSql(`alter table "posts" alter column "created_at" type varchar(255) using ("created_at"::varchar(255));`);
    this.addSql(`alter table "posts" alter column "created_at" set default '2025-03-03T22:45:45.309Z';`);

    this.addSql(`alter table "comments" alter column "created_at" type varchar(255) using ("created_at"::varchar(255));`);
    this.addSql(`alter table "comments" alter column "created_at" set default '2025-03-03T22:45:45.308Z';`);
  }

}
