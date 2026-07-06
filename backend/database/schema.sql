-- PostgreSQL Relational Database Schema Migration File
-- Project LIFE: Charitable & Educational Trust Operating System
-- Target: production-grade scalability (₹0 -> ₹10 Crore/year transaction throughput)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Custom Enum Types
CREATE TYPE user_role AS ENUM ('donor', 'volunteer', 'csr', 'admin', 'super_admin');
CREATE TYPE campaign_category AS ENUM ('education', 'healthcare', 'emergency', 'csr');
CREATE TYPE campaign_status AS ENUM ('draft', 'review', 'active', 'paused', 'completed');
CREATE TYPE payment_status AS ENUM ('pending', 'success', 'failed', 'refunded');
CREATE TYPE media_type AS ENUM ('image', 'video', 'document');
CREATE TYPE volunteer_level AS ENUM ('beginner', 'active', 'champion');
CREATE TYPE preferred_category AS ENUM ('education', 'healthcare', 'both');

-- 1. USERS TABLE
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE,
  password_hash TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'donor',
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'India',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for authentication logins
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- 2. DONORS PROFILE
CREATE TABLE donor_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_donated DECIMAL(15, 2) DEFAULT 0.00,
  avg_donation DECIMAL(15, 2) DEFAULT 0.00,
  donation_count INT DEFAULT 0,
  preferred_category preferred_category DEFAULT 'both',
  last_donation_date TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id)
);

-- Index for LTV queries
CREATE INDEX idx_donor_profiles_ltv ON donor_profiles(total_donated DESC);

-- 3. CAMPAIGNS TABLE
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category campaign_category NOT NULL DEFAULT 'healthcare',
  goal_amount DECIMAL(15, 2) NOT NULL,
  raised_amount DECIMAL(15, 2) DEFAULT 0.00,
  status campaign_status NOT NULL DEFAULT 'draft',
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for URL routing via slugs & filtering active campaigns
CREATE INDEX idx_campaigns_slug ON campaigns(slug);
CREATE INDEX idx_campaigns_status ON campaigns(status);

-- 4. CAMPAIGN MEDIA
CREATE TABLE campaign_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  media_url TEXT NOT NULL,
  media_type media_type NOT NULL DEFAULT 'image'
);

-- 5. DONATIONS TABLE
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  amount DECIMAL(12, 2) NOT NULL CHECK (amount > 0),
  payment_status payment_status NOT NULL DEFAULT 'pending',
  payment_gateway TEXT NOT NULL, -- 'razorpay', 'cashfree', etc.
  transaction_id TEXT UNIQUE NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for donation ledger reports and CRM segments
CREATE INDEX idx_donations_donor_id ON donations(donor_id);
CREATE INDEX idx_donations_campaign_id ON donations(campaign_id);
CREATE INDEX idx_donations_status ON donations(payment_status);
CREATE INDEX idx_donations_txn ON donations(transaction_id);

-- 6. VOLUNTEERS TABLE
CREATE TABLE volunteers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  skills TEXT[] DEFAULT '{}',
  referral_code TEXT UNIQUE NOT NULL,
  total_referrals INT DEFAULT 0,
  total_donations_generated DECIMAL(15, 2) DEFAULT 0.00,
  level volunteer_level NOT NULL DEFAULT 'beginner',
  UNIQUE(user_id)
);

-- Index for leaderboard rank queries
CREATE INDEX idx_volunteers_referrals ON volunteers(total_referrals DESC);
CREATE INDEX idx_volunteers_ref_code ON volunteers(referral_code);

-- 7. CSR TABLE
CREATE TABLE csr_partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  budget DECIMAL(15, 2) DEFAULT 0.00,
  industry TEXT,
  UNIQUE(user_id)
);

-- 8. TRANSACTIONS LOG (RAW GATEWAY RESPONSE AUDIT)
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donation_id UUID REFERENCES donations(id) ON DELETE SET NULL,
  gateway_response JSONB NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. CAMPAIGN UPDATES
CREATE TABLE campaign_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. AUDIT LOGS (ADMIN COMPLIANCE TIMELINE)
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id UUID,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for auditing timelines
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp DESC);
