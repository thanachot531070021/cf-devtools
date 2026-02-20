-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  date_of_birth DATETIME,
  status TEXT DEFAULT 'active',
  avatar_url TEXT,
  last_login_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_created_at ON users(created_at);
CREATE INDEX IF NOT EXISTS idx_deleted_at ON users(deleted_at);
