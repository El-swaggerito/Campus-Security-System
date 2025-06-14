-- Insert sample incidents
INSERT INTO incidents (type, date, location, description, severity, recovered, reported_by, status) VALUES
('theft', '2024-01-15', 'Library', 'Phone stolen from study table', 3, true, 'Student', 'resolved'),
('theft', '2024-01-20', 'Gym', 'Wallet missing from locker', 2, false, 'Student', 'investigating'),
('theft', '2024-02-05', 'Mosque', 'Shoes stolen during prayer time', 1, false, 'Student', 'open'),
('theft', '2024-02-10', 'International M Hostel', 'Laptop stolen from room', 4, false, 'Student', 'investigating'),
('theft', '2024-02-15', 'Class Area', 'Backpack stolen during class', 3, true, 'Faculty', 'resolved'),
('theft', '2024-02-20', 'International F Hostel', 'Money stolen from room', 3, false, 'Student', 'open'),
('theft', '2024-03-05', 'Block of Offices', 'Office supplies missing', 2, false, 'Staff', 'investigating'),
('theft', '2024-03-10', 'Parking Lot', 'Car accessories stolen', 2, true, 'Student', 'resolved'),
('theft', '2024-03-15', 'Lecture Hall', 'Calculator stolen', 1, false, 'Student', 'open'),
('theft', '2024-03-20', 'Admin Building', 'Documents missing', 3, false, 'Staff', 'investigating'),
('theft', '2024-08-15', 'Library', 'Textbook stolen', 2, false, 'Student', 'open'),
('theft', '2024-09-10', 'Gym', 'Sports equipment missing', 2, true, 'Staff', 'resolved'),
('theft', '2024-09-25', 'Class Area', 'Phone charger stolen', 1, false, 'Student', 'open'),
('theft', '2024-10-05', 'Mosque', 'Prayer mat stolen', 1, false, 'Student', 'open'),
('theft', '2024-10-15', 'International M Hostel', 'Headphones stolen', 2, false, 'Student', 'investigating');

-- Insert sample security measures
INSERT INTO security_measures (description, implemented_date, location, effectiveness, status) VALUES
('Increased awareness campaigns', '2024-01-01', 'Campus-wide', 4, 'active'),
('Restricted entry of non-resident students into hostels', '2024-01-15', 'International Hostels', 5, 'active'),
('Enhanced security monitoring in the Mosque', '2024-02-01', 'Mosque', 5, 'active'),
('Installed lockers in the Gym for secure storage', '2024-02-15', 'Gym', 4, 'active'),
('Implemented access control in the Block of Offices', '2024-03-01', 'Block of Offices', 4, 'active'),
('Increased patrols around International Hostels', '2024-03-10', 'International Hostels', 4, 'active'),
('Added security cameras in Campus Square', '2024-04-01', 'Campus Square', 5, 'active'),
('Improved lighting in Parking Lot and walkways', '2024-04-15', 'Parking Lot', 3, 'active');

-- Insert sample security personnel
INSERT INTO security_personnel (name, shift, assigned_area, contact_phone, contact_email, status) VALUES
('Ahmed Hassan', 'day', 'Class Area', '+1234567890', 'ahmed@alhikmah.edu', 'active'),
('Fatima Al-Zahra', 'night', 'International M Hostel', '+1234567891', 'fatima@alhikmah.edu', 'active'),
('Omar Abdullah', 'day', 'Mosque', '+1234567892', 'omar@alhikmah.edu', 'active'),
('Aisha Ibrahim', 'night', 'Gym', '+1234567893', 'aisha@alhikmah.edu', 'active'),
('Yusuf Mahmoud', 'day', 'Block of Offices', '+1234567894', 'yusuf@alhikmah.edu', 'active'),
('Khadija Salim', 'night', 'International F Hostel', '+1234567895', 'khadija@alhikmah.edu', 'active');
