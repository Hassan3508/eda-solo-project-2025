-------------------------------------------------------
-- START FROM SCRATCH (FULL RESET)
-------------------------------------------------------

DROP TABLE IF EXISTS user_uploads CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS office_hours CASCADE;
DROP TABLE IF EXISTS designs CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;

-------------------------------------------------------
-- TABLE SCHEMAS (SMS ONLY + CASH ONLY)
-------------------------------------------------------

-- USERS
CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  username VARCHAR(80) UNIQUE NOT NULL,
  phone VARCHAR(30) UNIQUE NOT NULL,
  password VARCHAR(1000) NOT NULL,
  name VARCHAR(255) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  confirm_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- DESIGNS
CREATE TABLE designs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image_url TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- OFFICE HOURS (time slots)
CREATE TABLE office_hours (
  id SERIAL PRIMARY KEY,
  day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (day_of_week, start_time, end_time)
);

-- BOOKINGS (cash only)
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  design_id INT NOT NULL REFERENCES designs(id) ON DELETE RESTRICT,

  appointment_date DATE NOT NULL,
  available_id INT NOT NULL REFERENCES office_hours(id) ON DELETE RESTRICT,

  payment_status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (payment_status IN ('pending','paid')),

  status VARCHAR(20) NOT NULL DEFAULT 'scheduled'
    CHECK (status IN ('scheduled','confirmed','completed','canceled')),

  payment_method VARCHAR(20) NOT NULL DEFAULT 'cash'
    CHECK (payment_method = 'cash'),

  payment_date DATE NULL,        -- cash collected later
  requested_time TIME NULL,
  booking_cancel BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Prevent double booking for same date + slot
CREATE UNIQUE INDEX uniq_booking_slot
ON bookings (appointment_date, available_id)
WHERE booking_cancel = FALSE;

-- UPLOADS (Cloudinary)
CREATE TABLE user_uploads (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  public_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-------------------------------------------------------
-- AUTOMAGIC UPDATED_AT
-------------------------------------------------------

CREATE OR REPLACE FUNCTION set_updated_at_to_now()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_user_update
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_to_now();
