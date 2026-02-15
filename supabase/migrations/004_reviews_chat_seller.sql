-- ============================================
-- PHASE 4: Reviews, Ratings & User Content
-- ============================================

-- Table: property_reviews
-- User reviews and ratings for properties
CREATE TABLE IF NOT EXISTS property_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id TEXT NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  comment TEXT NOT NULL,
  helpful_count INTEGER DEFAULT 0,
  verified_booking BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Table: review_helpfulness
-- Track which users found reviews helpful
CREATE TABLE IF NOT EXISTS review_helpfulness (
  review_id UUID REFERENCES property_reviews(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  is_helpful BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (review_id, user_id)
);

-- Table: seller_profiles
-- Extended profiles for property sellers/owners
CREATE TABLE IF NOT EXISTS seller_profiles (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  business_name TEXT,
  phone TEXT,
  email TEXT,
  verified BOOLEAN DEFAULT false,
  total_properties INTEGER DEFAULT 0,
  avg_rating DECIMAL(3,2) DEFAULT 0,
  response_rate DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Table: chat_conversations
-- AI chatbot conversation history
CREATE TABLE IF NOT EXISTS chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT DEFAULT 'New Conversation',
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Table: chat_messages
-- Individual messages in conversations
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES chat_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_reviews_property ON property_reviews(property_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON property_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON property_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created ON property_reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_seller_verified ON seller_profiles(verified);
CREATE INDEX IF NOT EXISTS idx_chat_user ON chat_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conv ON chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created ON chat_messages(created_at);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE property_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_helpfulness ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Reviews: Anyone can read, only authors can update/delete
CREATE POLICY "Anyone can view reviews"
  ON property_reviews FOR SELECT
  USING (true);

CREATE POLICY "Users can create reviews"
  ON property_reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews"
  ON property_reviews FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews"
  ON property_reviews FOR DELETE
  USING (auth.uid() = user_id);

-- Review helpfulness
CREATE POLICY "Anyone can view helpfulness"
  ON review_helpfulness FOR SELECT
  USING (true);

CREATE POLICY "Users can mark reviews helpful"
  ON review_helpfulness FOR ALL
  USING (auth.uid() = user_id);

-- Seller profiles: Public read, owner write
CREATE POLICY "Anyone can view seller profiles"
  ON seller_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their seller profile"
  ON seller_profiles FOR ALL
  USING (auth.uid() = id);

-- Chat: Users can only see their own conversations
CREATE POLICY "Users can view their own conversations"
  ON chat_conversations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create conversations"
  ON chat_conversations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their conversations"
  ON chat_conversations FOR UPDATE
  USING (auth.uid() = user_id);

-- Messages: Only from own conversations
CREATE POLICY "Users can view their own messages"
  ON chat_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM chat_conversations
      WHERE id = conversation_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages in their conversations"
  ON chat_messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM chat_conversations
      WHERE id = conversation_id AND user_id = auth.uid()
    )
  );

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Update review helpful count
CREATE OR REPLACE FUNCTION update_review_helpful_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE property_reviews
  SET helpful_count = (
    SELECT COUNT(*) FROM review_helpfulness
    WHERE review_id = NEW.review_id AND is_helpful = true
  )
  WHERE id = NEW.review_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER review_helpfulness_trigger
  AFTER INSERT OR UPDATE OR DELETE ON review_helpfulness
  FOR EACH ROW
  EXECUTE FUNCTION update_review_helpful_count();

-- Update review timestamp
CREATE OR REPLACE FUNCTION update_review_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER review_update_timestamp
  BEFORE UPDATE ON property_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_review_timestamp();

-- Get average rating for property
CREATE OR REPLACE FUNCTION get_property_avg_rating(p_property_id TEXT)
RETURNS DECIMAL(3,2) AS $$
BEGIN
  RETURN (
    SELECT COALESCE(AVG(rating), 0)
    FROM property_reviews
    WHERE property_id = p_property_id
  );
END;
$$ LANGUAGE plpgsql;

-- Get review count for property
CREATE OR REPLACE FUNCTION get_property_review_count(p_property_id TEXT)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM property_reviews
    WHERE property_id = p_property_id
  );
END;
$$ LANGUAGE plpgsql;
