-- Create incidents table
CREATE TABLE IF NOT EXISTS incidents (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('theft', 'vandalism', 'fighting', 'other')),
  date DATE NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  severity INTEGER NOT NULL CHECK (severity >= 1 AND severity <= 5),
  recovered BOOLEAN DEFAULT FALSE,
  reported_by TEXT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create security_measures table
CREATE TABLE IF NOT EXISTS security_measures (
  id BIGSERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  implemented_date DATE NOT NULL,
  location TEXT,
  effectiveness INTEGER CHECK (effectiveness >= 1 AND effectiveness <= 5),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'planned')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create security_personnel table
CREATE TABLE IF NOT EXISTS security_personnel (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  shift TEXT NOT NULL CHECK (shift IN ('day', 'night')),
  assigned_area TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_incidents_date ON incidents(date);
CREATE INDEX IF NOT EXISTS idx_incidents_location ON incidents(location);
CREATE INDEX IF NOT EXISTS idx_incidents_type ON incidents(type);
CREATE INDEX IF NOT EXISTS idx_incidents_status ON incidents(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_incidents_updated_at BEFORE UPDATE ON incidents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_security_measures_updated_at BEFORE UPDATE ON security_measures
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_security_personnel_updated_at BEFORE UPDATE ON security_personnel
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_measures ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_personnel ENABLE ROW LEVEL SECURITY;

-- Create policies (for now, allow all operations - you can restrict later)
CREATE POLICY "Allow all operations on incidents" ON incidents FOR ALL USING (true);
CREATE POLICY "Allow all operations on security_measures" ON security_measures FOR ALL USING (true);
CREATE POLICY "Allow all operations on security_personnel" ON security_personnel FOR ALL USING (true);
