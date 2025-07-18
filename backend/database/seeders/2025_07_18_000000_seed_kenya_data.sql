-- Enhanced Kenya Data Seed
-- Updated with 'Grounds' terminology and expanded data for Nairobi, Kikuyu, and Mombasa

-- Add email_verified_at column if it doesn't exist
ALTER TABLE users
ADD COLUMN IF NOT EXISTS email_verified_at DATETIME DEFAULT NULL AFTER email;

-- Clear existing data (optional, uncomment if needed)
-- TRUNCATE TABLE users CASCADE;
-- TRUNCATE TABLE profiles CASCADE;
-- TRUNCATE TABLE facilities CASCADE;
-- TRUNCATE TABLE events CASCADE;
-- TRUNCATE TABLE products CASCADE;
-- TRUNCATE TABLE bookings CASCADE;
-- TRUNCATE TABLE reviews CASCADE;

-- ROLES
-- First delete existing roles to avoid duplicates
DELETE FROM roles WHERE name IN (
  'trainee', 'coach', 'ground', 'vendor', 'admin', 
  'event_organizer', 'nutritionist', 'therapist'
);

-- Then insert fresh roles
INSERT INTO roles (name) VALUES 
('trainee'),
('coach'),
('ground'),
('vendor'),
('admin'),
('event_organizer'),
('nutritionist'),
('therapist');

-- USERS - NAIROBI
-- Coaches
INSERT INTO users (name, email, password, email_verified_at)
VALUES 
('James Mwangi', 'james.m@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NOW()),
('Grace Wanjiru', 'grace.w@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NOW()),
('David Ochieng', 'david.o@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NOW());

-- Grounds (Facilities)
INSERT INTO users (name, email, password, email_verified_at)
VALUES 
('Nairobi Fitness Grounds', 'info@nairobi-fitness.co.ke', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NOW()),
('Westlands Wellness Grounds', 'contact@westlandswellness.ke', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NOW());

-- USERS - KIKUYU
-- Coaches
INSERT INTO users (name, email, password, email_verified_at)
VALUES 
('Peter Kamau', 'peter.k@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NOW());

-- Grounds
INSERT INTO users (name, email, password, email_verified_at)
VALUES 
('Kikuyu Sports Grounds', 'info@kikuyusports.co.ke', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NOW());

-- USERS - MOMBASA
-- Coaches
INSERT INTO users (name, email, password, email_verified_at)
VALUES 
('Aisha Hassan', 'aisha.h@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NOW());

-- Grounds
INSERT INTO users (name, email, password, email_verified_at)
VALUES 
('Mombasa Beach Grounds', 'info@mombasabeachgrounds.co.ke', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NOW());

-- FACILITIES (Grounds)
WITH ground_ids AS (
  SELECT id FROM users WHERE email IN (
    'info@nairobi-fitness.co.ke',
    'contact@westlandswellness.ke',
    'info@kikuyusports.co.ke',
    'info@mombasabeachgrounds.co.ke'
  )
)
INSERT INTO facilities (user_id, name, description, location, latitude, longitude, amenities, opening_hours, created_at, updated_at)
VALUES 
((SELECT id FROM ground_ids OFFSET 0 LIMIT 1), 'Nairobi Fitness Grounds', 'Premium fitness facility in Westlands with state-of-the-art equipment and expert trainers.', 'Westlands, Nairobi', -1.2657, 36.8021, '{"parking": true, "showers": true, "lockers": true, "wifi": true, "pool": true, "sauna": true}', 'Mon-Fri: 5:00 AM - 10:00 PM, Sat-Sun: 7:00 AM - 8:00 PM', NOW(), NOW()),
((SELECT id FROM ground_ids OFFSET 1 LIMIT 1), 'Westlands Wellness Grounds', 'Holistic wellness center offering yoga, pilates, and meditation classes.', 'Parklands, Nairobi', -1.2581, 36.8155, '{"parking": true, "showers": true, "lockers": true, "wifi": true, "yoga_mats": true, "meditation_room": true}', 'Mon-Sun: 6:00 AM - 9:00 PM', NOW(), NOW()),
((SELECT id FROM ground_ids OFFSET 2 LIMIT 1), 'Kikuyu Sports Grounds', 'Community sports facility with football pitch, basketball court, and gym.', 'Kikuyu Town', -1.2459, 36.6679, '{"parking": true, "showers": true, "football_pitch": true, "basketball_court": true, "gym": true}', 'Mon-Sun: 6:00 AM - 8:00 PM', NOW(), NOW()),
((SELECT id FROM ground_ids OFFSET 3 LIMIT 1), 'Mombasa Beach Grounds', 'Beachfront fitness center with outdoor workout areas and water sports.', 'Nyali, Mombasa', -4.0435, 39.6982, '{"beach_access": true, "showers": true, "lockers": true, "watersports_equipment": true, "cafe": true}', 'Mon-Sun: 6:00 AM - 7:00 PM', NOW(), NOW());

-- COACH PROFILES
WITH coach_ids AS (
  SELECT id FROM users WHERE email IN (
    'james.m@example.com',
    'grace.w@example.com',
    'david.o@example.com',
    'peter.k@example.com',
    'aisha.h@example.com'
  )
)
INSERT INTO profiles (user_id, bio, specialties, certifications, years_experience, hourly_rate, created_at, updated_at)
VALUES 
((SELECT id FROM coach_ids OFFSET 0 LIMIT 1), 'Certified personal trainer with 8 years of experience in strength and conditioning.', 'Strength Training, Weight Loss, Muscle Gain', 'NASM-CPT, CrossFit L1', 8, 3500, NOW(), NOW()),
((SELECT id FROM coach_ids OFFSET 1 LIMIT 1), 'Yoga instructor specializing in vinyasa flow and restorative yoga.', 'Vinyasa Yoga, Restorative Yoga, Meditation', 'RYT-500, Yoga Therapy', 5, 2500, NOW(), NOW()),
((SELECT id FROM coach_ids OFFSET 2 LIMIT 1), 'Professional football coach with experience in youth development.', 'Football, Speed & Agility, Team Sports', 'CAF B License, First Aid', 10, 3000, NOW(), NOW()),
((SELECT id FROM coach_ids OFFSET 3 LIMIT 1), 'Athletics coach specializing in middle and long distance running.', 'Running, Endurance Training, Athletics', 'IAAF Level 2', 6, 2800, NOW(), NOW()),
((SELECT id FROM coach_ids OFFSET 4 LIMIT 1), 'Beach fitness and water sports instructor.', 'Beach Workouts, Swimming, Water Aerobics', 'Lifeguard Certified, PADI', 4, 3200, NOW(), NOW());

-- EVENTS
WITH ground_user_ids AS (
  SELECT u.id, f.id as facility_id 
  FROM users u
  JOIN facilities f ON u.id = f.user_id
)
INSERT INTO events (user_id, facility_id, title, description, event_date, start_time, end_time, max_participants, price, category, created_at, updated_at)
SELECT 
  gui.id,
  gui.facility_id,
  data.title,
  data.description,
  data.event_date,
  data.start_time,
  data.end_time,
  data.max_participants,
  data.price,
  data.category,
  NOW(),
  NOW()
FROM ground_user_ids gui
CROSS JOIN (VALUES
  ('Weekend Bootcamp', 'High-intensity bootcamp for all fitness levels', '2025-08-15', '07:00:00', '09:00:00', 20, 1500, 'Fitness'),
  ('Sunset Yoga', 'Relaxing evening yoga session', '2025-08-16', '17:30:00', '19:00:00', 15, 1000, 'Yoga'),
  ('Beach Volleyball Tournament', 'Team competition with prizes', '2025-08-20', '08:00:00', '13:00:00', 32, 2000, 'Sports'),
  ('Nutrition Workshop', 'Learn about healthy eating habits', '2025-08-22', '10:00:00', '12:00:00', 25, 800, 'Wellness')
) AS data(title, description, event_date, start_time, end_time, max_participants, price, category);

-- PRODUCTS (for Shop)
INSERT INTO products (vendor_id, name, description, price, category, stock_quantity, created_at, updated_at)
SELECT 
  u.id,
  data.name,
  data.description,
  data.price,
  data.category,
  data.stock_quantity,
  NOW(),
  NOW()
FROM users u
CROSS JOIN (VALUES
  ('Premium Yoga Mat', 'Eco-friendly, non-slip yoga mat', 4500, 'Equipment', 50),
  ('Resistance Bands Set', 'Set of 5 resistance bands', 2500, 'Equipment', 100),
  ('Protein Shaker', 'BPA-free 700ml shaker bottle', 1200, 'Accessories', 200),
  ('Moisture-Wicking T-Shirt', 'Breathable workout t-shirt', 1800, 'Apparel', 150),
  ('Fitness Tracker', 'Waterproof activity tracker', 8500, 'Electronics', 30)
) AS data(name, description, price, category, stock_quantity)
WHERE u.email = 'info@nairobi-fitness.co.ke';

-- Insert more sample data as needed...
