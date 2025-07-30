alter table "user" add column "role" text not null;

alter table "user" add column "lastname" text not null;

alter table "user" add column "phone" text;

alter table "user" add column "isActive" boolean;

alter table "user" add column "lastLoginAt" timestamp;