-------------------------------------------------------
--------------------------------------------------
-- START FROM SCRATCH:
DROP TRIGGER IF EXISTS "on_user_update" ON "user";
DROP TABLE IF EXISTS "user";


-------------------------------------------------------
--------------------------------------------------
-- TABLE SCHEMAS:
-- CREATE TABLE "user" (
--   "id" SERIAL PRIMARY KEY,
--   "username" VARCHAR (80) UNIQUE NOT NULL,
--   "password" VARCHAR (1000) NOT NULL,
--   "inserted_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
--   "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
-- );

CREATE TABLE "user"(
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL DEFAULT 'UNIQUE NOT NULL',
    "password" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_admin" BOOLEAN NOT NULL DEFAULT FALSE
);
ALTER TABLE
    "user" ADD PRIMARY KEY("id");


CREATE TABLE "bookings"(
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "design_id" INTEGER NOT NULL,
    "appoinment_date" DATE NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "payment_status" VARCHAR(255) NOT NULL DEFAULT 'pending',
    "status" VARCHAR(20) NOT NULL DEFAULT 'scheduled',
    "available_id" INTEGER NOT NULL,
    "payment_date" DATE NOT NULL,
    "payment_method" INTEGER NOT NULL
);
ALTER TABLE
    "bookings" ADD PRIMARY KEY("id");
COMMENT
ON COLUMN
    "bookings"."payment_method" IS 'this is a hard-coded dropdown list:
cash, credit card, debit card';
CREATE TABLE "designs"(
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "image_url" VARCHAR(255) NOT NULL DEFAULT 'NOT NULL',
    "price" DECIMAL(8, 2) NOT NULL,
    "description" TEXT NOT NULL
);
ALTER TABLE
    "designs" ADD PRIMARY KEY("id");

CREATE TABLE "office_hours"(
    "id" SERIAL NOT NULL,
    "start_time" VARCHAR(20) NOT NULL,
    "end_time" VARCHAR(20) NOT NULL,
    "day_of_week" VARCHAR(255) NOT NULL DEFAULT '1'
);
ALTER TABLE
    "office_hours" ADD PRIMARY KEY("id");
COMMENT
ON COLUMN
    "office_hours"."day_of_week" IS 'time is by 1 hour';
ALTER TABLE
    "bookings" ADD CONSTRAINT "bookings_design_id_foreign" FOREIGN KEY("design_id") REFERENCES "designs"("id");
ALTER TABLE
    "bookings" ADD CONSTRAINT "bookings_available_id_foreign" FOREIGN KEY("available_id") REFERENCES "office_hours"("id");
ALTER TABLE
    "bookings" ADD CONSTRAINT "bookings_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");

-------------------------------------------------------
--------------------------------------------------
-- SEED DATA:
--   You'll need to actually register users via the application in order to get hashed
--   passwords. Once you've done that, you can modify this INSERT statement to include
--   your dummy users. Be sure to copy/paste their hashed passwords, as well.
--   This is only for development purposes! Here's a commented-out example:
-- INSERT INTO "user"
--   ("username", "password","phone", "name")
--   VALUES
--   ('unicorn10', '$2a$10$oGi81qjXmTh/slGzYOr2fu6NGuCwB4kngsiWQPToNrZf5X8hxkeNG'), --pw: 123
--   ('cactusfox', '$2a$10$8./c/6fB2BkzdIrAUMWOxOlR75kgmbx/JMrMA5gA70c9IAobVZquW'); --pw: 123


-------------------------------------------------------
--------------------------------------------------
-- AUTOMAGIC UPDATED_AT:

-- Did you know that you can make and execute functions
-- in PostgresQL? Wild, right!? I'm not making this up. Here
-- is proof that I am not making this up:
  -- https://x-team.com/blog/automatic-timestamps-with-postgresql/

-- Create a function that sets a row's updated_at column
-- to NOW():
CREATE OR REPLACE FUNCTION set_updated_at_to_now() -- 👈
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger on the user table that will execute
-- the set_update_at_to_now function on any rows that
-- have been touched by an UPDATE query:
CREATE TRIGGER on_user_update
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_to_now();
