import { Migration } from '@mikro-orm/migrations';

export class Migration20250226181432 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "users" ("id" uuid not null, "username" varchar(255) not null, "display_name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "avatar" varchar(255) null, "post_count" int not null default 0, "followers_count" int not null default 0, "following_count" int not null default 0, "created_at" varchar(255) not null default '2025-02-26T18:14:32.158Z', constraint "users_pkey" primary key ("id"));`);
    this.addSql(`alter table "users" add constraint "users_username_unique" unique ("username");`);
    this.addSql(`alter table "users" add constraint "users_email_unique" unique ("email");`);

    this.addSql(`create table "users_followers" ("follower" uuid not null, "following" uuid not null, constraint "users_followers_pkey" primary key ("follower", "following"));`);

    this.addSql(`alter table "users_followers" add constraint "users_followers_follower_foreign" foreign key ("follower") references "users" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "users_followers" add constraint "users_followers_following_foreign" foreign key ("following") references "users" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "users_followers" drop constraint "users_followers_follower_foreign";`);

    this.addSql(`alter table "users_followers" drop constraint "users_followers_following_foreign";`);

    this.addSql(`drop table if exists "users" cascade;`);

    this.addSql(`drop table if exists "users_followers" cascade;`);
  }

}
