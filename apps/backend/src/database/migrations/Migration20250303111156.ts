import { Migration } from '@mikro-orm/migrations';

export class Migration20250303111156 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "users_favorites" ("user_id" uuid not null, "post_id" uuid not null, constraint "users_favorites_pkey" primary key ("user_id", "post_id"));`);

    this.addSql(`alter table "users_favorites" add constraint "users_favorites_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "users_favorites" add constraint "users_favorites_post_id_foreign" foreign key ("post_id") references "posts" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "posts" alter column "created_at" type varchar(255) using ("created_at"::varchar(255));`);
    this.addSql(`alter table "posts" alter column "created_at" set default '2025-03-03T11:11:56.187Z';`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "users_favorites" cascade;`);

    this.addSql(`alter table "posts" alter column "created_at" type varchar(255) using ("created_at"::varchar(255));`);
    this.addSql(`alter table "posts" alter column "created_at" set default '2025-03-01T18:05:36.901Z';`);
  }

}
