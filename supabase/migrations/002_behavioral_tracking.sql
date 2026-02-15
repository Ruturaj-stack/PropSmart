-- ============================================
-- PHASE 1: Behavioral Learning & Core Intelligence
-- ============================================

-- Table: user_behavior
-- Tracks all user interactions with properties
CREATE TABLE IF NOT EXISTS user_behavior (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  property_id TEXT NOT NULL, -- references properties (using TEXT for mock data compatibility)
  action_type TEXT NOT NULL CHECK (action_type IN ('view', 'click', 'save', 'unsave', 'share')),
  duration_seconds INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_behavior_user_id ON user_behavior(user_id);
CREATE INDEX IF NOT EXISTS idx_user_behavior_property_id ON user_behavior(property_id);
CREATE INDEX IF NOT EXISTS idx_user_behavior_action_type ON user_behavior(action_type);
CREATE INDEX IF NOT EXISTS idx_user_behavior_created_at ON user_behavior(created_at);

-- Table: user_search_patterns
-- Stores user search history for learning preferences
CREATE TABLE IF NOT EXISTS user_search_patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  search_query JSONB NOT NULL,
  result_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_search_patterns_user_id ON user_search_patterns(user_id);
CREATE INDEX IF NOT EXISTS idx_search_patterns_created_at ON user_search_patterns(created_at);

-- Table: recently_viewed
-- Quick access to recently viewed properties
CREATE TABLE IF NOT EXISTS recently_viewed (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  property_id TEXT NOT NULL,
  viewed_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, property_id)
);

CREATE INDEX IF NOT EXISTS idx_recently_viewed_user_id ON recently_viewed(user_id);
CREATE INDEX IF NOT EXISTS idx_recently_viewed_viewed_at ON recently_viewed(viewed_at DESC);

-- Table: saved_properties
-- User's saved/favorited properties
CREATE TABLE IF NOT EXISTS saved_properties (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  property_id TEXT NOT NULL,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, property_id)
);

CREATE INDEX IF NOT EXISTS idx_saved_properties_user_id ON saved_properties(user_id);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS
ALTER TABLE user_behavior ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_search_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE recently_viewed ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_properties ENABLE ROW LEVEL SECURITY;

-- user_behavior policies
CREATE POLICY "Users can insert their own behavior"
  ON user_behavior FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own behavior"
  ON user_behavior FOR SELECT
  USING (auth.uid() = user_id);

-- user_search_patterns policies
CREATE POLICY "Users can insert their own searches"
  ON user_search_patterns FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own searches"
  ON user_search_patterns FOR SELECT
  USING (auth.uid() = user_id);

-- recently_viewed policies
CREATE POLICY "Users can manage their own recently viewed"
  ON recently_viewed FOR ALL
  USING (auth.uid() = user_id);

-- saved_properties policies
CREATE POLICY "Users can manage their own saved properties"
  ON saved_properties FOR ALL
  USING (auth.uid() = user_id);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to clean up old behavior data (keep last 90 days)
CREATE OR REPLACE FUNCTION cleanup_old_behavior()
RETURNS void AS $$
BEGIN
  DELETE FROM user_behavior
  WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;

-- Function to get user's preferred locations (based on search history)
CREATE OR REPLACE FUNCTION get_user_preferred_locations(p_user_id UUID)
RETURNS TABLE(location TEXT, frequency BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    search_query->>'location' as location,
    COUNT(*) as frequency
  FROM user_search_patterns
  WHERE user_id = p_user_id
    AND search_query->>'location' IS NOT NULL
    AND search_query->>'location' != ''
  GROUP BY search_query->>'location'
  ORDER BY frequency DESC
  LIMIT 5;
END;
$$ LANGUAGE plpgsql;
