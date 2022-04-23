CREATE TABLE IF NOT EXISTS "master_status" (
  "id" bigserial PRIMARY KEY,
  "status" varchar(10)
);

CREATE TABLE IF NOT EXISTS "topic" (
  "id" bigserial PRIMARY KEY,
  "topic_name" varchar(50) NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now()),
  "deleted_at" timestamp
);

CREATE TABLE IF NOT EXISTS "news" (
  "id" bigserial PRIMARY KEY,
  "topic_id" int NOT NULL,
  "news_title" varchar(100) NOT NULL,
  "news_body" text NOT NULL,
  "tags" _text,
  "news_status_id" int NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now()),
  "deleted_at" timestamp
);

ALTER TABLE "news" ADD FOREIGN KEY ("topic_id") REFERENCES "topic" ("id");

ALTER TABLE "news" ADD FOREIGN KEY ("news_status_id") REFERENCES "master_status" ("id")
