-- Complete Database Schema and Sample Data for VibeCore Platform
-- Created: 2025-07-18

-- =============================================
-- 1. ROLES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default roles
INSERT INTO roles (name) VALUES 
('trainee'), ('coach'), ('ground'), ('admin'), ('vendor')
ON DUPLICATE KEY UPDATE name=name;

-- =============================================
-- 2. USERS TABLE (already exists, just adding email_verified_at)
-- =============================================
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS email_verified_at DATETIME DEFAULT NULL AFTER email,
ADD COLUMN IF NOT EXISTS role_id INT AFTER id,
ADD COLUMN IF NOT EXISTS phone VARCHAR(20) AFTER email,
ADD COLUMN IF NOT EXISTS status ENUM('active', 'inactive', 'suspended') DEFAULT 'active' AFTER password;

-- =============================================
-- 3. PROFILES TABLE (for additional user details)
-- =============================================
CREATE TABLE IF NOT EXISTS profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    bio TEXT,
    specialties JSON,
    certifications JSON,
    years_experience INT,
    hourly_rate DECIMAL(10,2),
    profile_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- 4. GROUNDS TABLE (facilities)
-- =============================================
CREATE TABLE IF NOT EXISTS grounds (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    amenities JSON,
    opening_hours JSON,
    contact_phone VARCHAR(20),
    contact_email VARCHAR(255),
    status ENUM('active', 'inactive', 'under_maintenance') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- 5. EVENTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    ground_id BIGINT,
    max_participants INT,
    price DECIMAL(10,2) DEFAULT 0.00,
    category VARCHAR(100),
    created_by BIGINT NOT NULL,
    status ENUM('upcoming', 'ongoing', 'completed', 'cancelled') DEFAULT 'upcoming',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ground_id) REFERENCES grounds(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- 6. PRODUCTS TABLE (for Shop)
-- =============================================
CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    stock_quantity INT DEFAULT 0,
    image_url VARCHAR(255),
    vendor_id BIGINT NOT NULL,
    status ENUM('active', 'inactive', 'out_of_stock') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vendor_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- 7. BOOKINGS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    event_id BIGINT,
    ground_id BIGINT,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed', 'no_show') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE SET NULL,
    FOREIGN KEY (ground_id) REFERENCES grounds(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- 8. REVIEWS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    ground_id BIGINT,
    event_id BIGINT,
    coach_id BIGINT,
    rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (ground_id) REFERENCES grounds(id) ON DELETE SET NULL,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE SET NULL,
    FOREIGN KEY (coach_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- SAMPLE DATA
-- =============================================

-- Insert sample users (coaches, grounds, admin)
-- Password for all users: password
INSERT INTO users (name, email, password, role_id, phone, email_verified_at) VALUES 
-- Admin
('Admin User', 'admin@vibecore.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 4, '+254700000001', NOW()),
-- Coaches
('James Mwangi', 'james.m@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, '+254712345678', NOW()),
('Grace Wanjiru', 'grace.w@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, '+254723456789', NOW()),
('Peter Kamau', 'peter.k@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, '+254734567890', NOW()),
-- Grounds
('Nairobi Fitness Grounds', 'info@nairobi-fitness.co.ke', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 3, '+254745678901', NOW()),
('Westlands Wellness Grounds', 'contact@westlandswellness.ke', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 3, '+254756789012', NOW()),
('Kikuyu Sports Complex', 'info@kikuyusports.co.ke', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 3, '+254767890123', NOW()),
-- Vendor
('FitGear Kenya', 'sales@fitgear.ke', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 5, '+254778901234', NOW());

-- Insert coach profiles
INSERT INTO profiles (user_id, bio, specialties, certifications, years_experience, hourly_rate) VALUES
(2, 'Certified personal trainer with 8 years of experience in strength and conditioning.', '["Strength Training", "Weight Loss", "Muscle Gain"]', '["NASM-CPT", "CrossFit L1"]', 8, 3500.00),
(3, 'Yoga instructor specializing in vinyasa flow and restorative yoga.', '["Vinyasa Yoga", "Restorative Yoga", "Meditation"]', '["RYT-500", "Yoga Therapy"]', 5, 2500.00),
(4, 'Professional football coach with experience in youth development.', '["Football", "Speed & Agility", "Team Sports"]', '["CAF B License", "First Aid"]', 10, 3000.00);

-- Insert grounds
INSERT INTO grounds (user_id, name, description, location, latitude, longitude, amenities, opening_hours, contact_phone, contact_email) VALUES
(5, 'Nairobi Fitness Grounds', 'Premium fitness facility with state-of-the-art equipment', 'Westlands, Nairobi', -1.2657, 36.8021, 
 '{"parking": true, "showers": true, "lockers": true, "wifi": true, "pool": true, "sauna": true, "cafe": true}',
 '{"monday": "6:00-22:00", "tuesday": "6:00-22:00", "wednesday": "6:00-22:00", "thursday": "6:00-22:00", "friday": "6:00-21:00", "saturday": "8:00-18:00", "sunday": "9:00-17:00"}',
 '+254745678901', 'info@nairobi-fitness.co.ke'),
 
(6, 'Westlands Wellness Grounds', 'Holistic wellness center offering yoga, pilates, and meditation classes', 'Parklands, Nairobi', -1.2581, 36.8155,
 '{"parking": true, "yoga_mats": true, "meditation_room": true, "juice_bar": true}',
 '{"monday": "7:00-20:00", "tuesday": "7:00-20:00", "wednesday": "7:00-20:00", "thursday": "7:00-20:00", "friday": "7:00-20:00", "saturday": "8:00-16:00", "sunday": "9:00-15:00"}',
 '+254756789012', 'contact@westlandswellness.ke'),
 
(7, 'Kikuyu Sports Complex', 'Community sports facility with football pitch and running track', 'Kikuyu', -1.2459, 36.6679,
 '{"parking": true, "football_pitch": true, "running_track": true, "changing_rooms": true, "cafe": true}',
 '{"monday": "7:00-20:00", "tuesday": "7:00-20:00", "wednesday": "7:00-20:00", "thursday": "7:00-20:00", "friday": "7:00-20:00", "saturday": "8:00-18:00", "sunday": "8:00-16:00"}',
 '+254767890123', 'info@kikuyusports.co.ke');

-- Insert events
INSERT INTO events (title, description, event_date, start_time, end_time, ground_id, max_participants, price, category, created_by, status) VALUES
('Weekend Bootcamp', 'High-intensity interval training for all levels', '2025-08-15', '08:00:00', '10:00:00', 1, 20, 1500.00, 'Fitness', 2, 'upcoming'),
('Sunrise Yoga', 'Start your day with a refreshing yoga session', '2025-08-16', '06:30:00', '07:30:00', 2, 15, 1000.00, 'Yoga', 3, 'upcoming'),
('Football Tournament', '5-a-side football tournament with prizes', '2025-08-20', '09:00:00', '14:00:00', 3, 32, 2000.00, 'Sports', 4, 'upcoming'),
('Nutrition Workshop', 'Learn about healthy eating habits', '2025-08-22', '10:00:00', '12:00:00', 1, 25, 800.00, 'Wellness', 2, 'upcoming');

-- Insert products
INSERT INTO products (name, description, price, category, stock_quantity, vendor_id, image_url) VALUES
('Premium Yoga Mat', 'Eco-friendly, non-slip yoga mat', 4500.00, 'Equipment', 50, 8, 'https://example.com/images/yoga-mat.jpg'),
('Resistance Bands Set', 'Set of 5 resistance bands with different resistance levels', 2500.00, 'Equipment', 100, 8, 'https://example.com/images/resistance-bands.jpg'),
('Protein Shaker', 'BPA-free 700ml shaker bottle', 1200.00, 'Accessories', 200, 8, 'https://example.com/images/shaker.jpg'),
('Workout Gloves', 'Padded workout gloves for weight training', 1800.00, 'Accessories', 75, 8, 'https://example.com/images/gloves.jpg'),
('Fitness Tracker', 'Waterproof activity tracker with heart rate monitor', 8500.00, 'Electronics', 30, 8, 'https://example.com/images/fitness-tracker.jpg');

-- Insert bookings
INSERT INTO bookings (user_id, event_id, ground_id, booking_date, start_time, end_time, status, notes) VALUES
(2, 1, NULL, '2025-08-15', '08:00:00', '10:00:00', 'confirmed', 'Weekend bootcamp session'),
(3, 2, NULL, '2025-08-16', '06:30:00', '07:30:00', 'confirmed', 'Sunrise yoga class'),
(4, 3, NULL, '2025-08-20', '09:00:00', '14:00:00', 'pending', 'Football tournament registration'),
(2, NULL, 1, '2025-08-17', '10:00:00', '11:30:00', 'confirmed', 'Private training session');

-- Insert reviews
INSERT INTO reviews (user_id, ground_id, event_id, coach_id, rating, comment) VALUES
(2, 1, NULL, NULL, 5, 'Great facility with excellent equipment and friendly staff!'),
(3, NULL, 1, 2, 4, 'Challenging but rewarding bootcamp. James is a great instructor!'),
(4, 2, NULL, NULL, 5, 'Peaceful environment, perfect for yoga and meditation.');

-- =============================================
-- CREATE INDEXES FOR BETTER PERFORMANCE
-- =============================================
CREATE INDEX idx_events_date ON events(event_date, status);
CREATE INDEX idx_bookings_user ON bookings(user_id, status);
CREATE INDEX idx_products_category ON products(category, status);
CREATE INDEX idx_grounds_location ON grounds(location);
