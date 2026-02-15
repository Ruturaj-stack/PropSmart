/**
 * Enhanced AI Chatbot Service - More Natural & Conversational
 * Advanced intent recognition with context-aware responses
 */

interface ChatResponse {
  message: string;
  suggestions?: string[];
}

// Enhanced pattern matching with more variations
const INTENT_PATTERNS = {
  greeting: /^(hi|hello|hey|good morning|good afternoon|good evening|sup|yo|namaste|hola|greetings)/i,
  thanks: /(thank|thanks|thx|appreciate|grateful)/i,
  goodbye: /(bye|goodbye|see you|later|gtg|cya)/i,
  
  // Property search
  budget: /(budget|price|cost|afford|expensive|cheap|₹|rs|rupees|lakh|crore|spend|payment)/i,
  location: /(location|area|where|city|neighborhood|near|locality|region|bangalore|mumbai|delhi|pune|hyderabad)/i,
  type: /(apartment|villa|house|pg|flat|studio|penthouse|duplex|type of property|kind of)/i,
  bedrooms: /(bedroom|bhk|bed|room|2bhk|3bhk|1bhk)/i,
  amenities: /(amenities|facilities|features|gym|pool|parking|garden|club|security|power backup)/i,
  
  // Features & Help
  comparison: /(compare|difference|better|vs|versus|which is|versus)/i,
  recommendation: /(recommend|suggest|best|good|top|show me|find me)/i,
  process: /(how to|how do|process|steps|procedure|guide|help me)/i,
  investment: /(investment|roi|return|appreciation|yield|profit|growth|rental income)/i,
  
  // Platform features
  features: /(feature|what can you|capabilities|what do you do|help)/i,
  save: /(save|favorite|bookmark|like)/i,
  alerts: /(alert|notification|notify|inform|tell me when)/i,
  
  // Conversational
  whatAreYou: /(what are you|who are you|your name|you called|introduce)/i,
  joke: /(joke|funny|laugh|humor)/i,
  compliment: /(good|great|awesome|nice|excellent|perfect|amazing|wonderful)/i,
};

/**
 * Main chatbot response generator with enhanced NLP
 */
export function generateChatbotResponse(userMessage: string): ChatResponse {
  const msg = userMessage.toLowerCase().trim();
  
  // === GREETINGS === 
  if (INTENT_PATTERNS.greeting.test(msg)) {
    const greetings = [
      "Hello! 👋 Great to see you! I'm your PropSmart AI assistant, here to make your property search effortless. What kind of property are you dreaming about?",
      "Hey there! 🏡 Welcome to PropSmart! I'm your personal real estate assistant. Whether you're buying, renting, or investing, I've got you covered. What can I help you with?",
      "Hi! 😊 I'm thrilled to assist you today! Looking for your dream home? Need investment advice? Or just browsing? I'm here for all of it!",
    ];
    return {
      message: greetings[Math.floor(Math.random() * greetings.length)],
      suggestions: [
        "Find affordable properties",
        "Best investment areas",
        "Compare property types",
        "How does your platform work?"
      ]
    };
  }

  // === THANKS ===
  if (INTENT_PATTERNS.thanks.test(msg)) {
    return {
      message: "You're very welcome! 😊 I'm always here to help. Is there anything else you'd like to know about properties or our platform?",
      suggestions: [
        "Search for properties",
        "Set up price alerts",
        "Investment tips",
        "Platform features"
      ]
    };
  }

  // === GOODBYE ===
  if (INTENT_PATTERNS.goodbye.test(msg)) {
    return {
      message: "Goodbye! 👋 It was great helping you today. Feel free to come back anytime you need assistance with properties. Happy house hunting! 🏡",
      suggestions: []
    };
  }

  // === WHO ARE YOU ===
  if (INTENT_PATTERNS.whatAreYou.test(msg)) {
    return {
      message: "I'm your PropSmart AI Assistant! 🤖 Think of me as your personal real estate expert who never sleeps. I help you discover properties, compare options, understand market trends, calculate investments, and navigate our platform. I'm powered by smart algorithms and trained on real estate knowledge to make your property search seamless!",
      suggestions: [
        "What features do you offer?",
        "Help me find a property",
        "Investment advice",
        "How to use filters?"
      ]
    };
  }

  // === COMPLIMENTS ===
  if (INTENT_PATTERNS.compliment.test(msg) && msg.split(' ').length < 5) {
    return {
      message: "Thank you! 😊 I really appreciate that! I'm here to make your property search as smooth as possible. What else can I help you with?",
      suggestions: [
        "Find properties",
        "Compare options",
        "Investment insights",
        "Tell me more features"
      ]
    };
  }

  // === BUDGET ===
  if (INTENT_PATTERNS.budget.test(msg)) {
    // Extract numbers
    const numbers = msg.match(/\d+/g);
    
    if (numbers && numbers.length > 0) {
      const budget = numbers[0];
      const unit = msg.includes('crore') || msg.includes('cr') ? 'Cr' : 'L';
      
      return {
        message: `Perfect! Looking for properties around ₹${budget}${unit}! 💰\n\nHere's what I recommend:\n\n1. **Browse Properties**: Use our advanced filters to find listings in your range\n2. **Set Price Alerts**: Get notified when new properties match your budget\n3. **Investment Analysis**: Check rental yields and ROI for each property\n4. **Smart Comparison**: Compare up to 4 properties side-by-side\n\nShall I guide you through the search filters?`,
        suggestions: [
          "Show me the filters",
          "Set up price alerts",
          "Best ROI properties",
          "Budget-friendly areas"
        ]
      };
    }
    
    return {
      message: "Budget planning is the foundation of a smart property search! 💰\n\nLet me help you:\n\n**For Buyers**: Tell me your budget (e.g., '50 lakhs' or '1.5 crore')\n**For Renters**: Monthly rent budget (e.g., '25k per month')\n**For Investors**: Investment amount and expected returns\n\nI'll show you the best properties that maximize value within your budget! Plus, our EMI calculator makes it easy to understand your monthly commitments.",
      suggestions: [
        "Properties under ₹50L",
        "₹50L - ₹1Cr range",
        "₹1Cr+ luxury homes",
        "EMI calculator"
      ]
    };
  }

  // === LOCATION ===
  if (INTENT_PATTERNS.location.test(msg)) {
    // Check for specific cities
    const cities = {
      bangalore: '🌟 Bangalore (IT Hub, Great Appreciation)',
      mumbai: '🏙️ Mumbai (Financial Capital, Premium Properties)',  
      delhi: '🏛️ Delhi NCR (Political Capital, Diverse Options)',
      pune: '🎓 Pune (Educational Hub, Affordable)',
      hyderabad: '💎 Hyderabad (Pharma City, Emerging Market)',
    };
    
    let cityMention = '';
    for (const [key, value] of Object.entries(cities)) {
      if (msg.includes(key)) {
        cityMention = `\n\nGreat choice! ${value} is an excellent market right now!`;
        break;
      }
    }
    
    return {
      message: `Location is EVERYTHING in real estate! 🗺️${cityMention}\n\n**We cover major metros:**\n• Bangalore - IT hub, high appreciation\n• Mumbai - Premium properties, great rental yields\n• Delhi NCR - Diverse inventory\n• Pune - Affordable, student-friendly\n• Hyderabad - Emerging pharma/tech hub\n\n**What we show you:**\n✓ Interactive maps with property markers\n✓ Nearby landmarks (schools, hospitals, malls)\n✓ Connectivity scores (metro, highways)\n✓ Neighborhood insights\n✓ Area development plans\n\nWhich location interests you most?`,
      suggestions: [
        "Bangalore tech corridors",
        "Mumbai suburbs vs city",
        "Best areas for families",
        "High-growth localities"
      ]
    };
  }

  // === PROPERTY TYPE ===
  if (INTENT_PATTERNS.type.test(msg)) {
    return {
      message: "Let me break down your options! 🏘️\n\n**🏢 Apartments**\n• Best for: Urban living, maintenance-free\n• Price: ₹40L - ₹3Cr\n• Pros: Security, amenities, community\n\n**🏡 Villas**\n• Best for: Privacy, luxury, families\n• Price: ₹80L - ₹10Cr+\n• Pros: Space, customization, prestige\n\n**🏠 Independent Houses**\n• Best for: Complete freedom\n• Price: ₹50L - ₹5Cr\n• Pros: No society rules, privacy\n\n**🏢 PG/Studios**\n• Best for: Singles, students, bachelors\n• Price: ₹5k - ₹25k/month\n• Pros: Affordable, flexible\n\nEach type has different investment potential and lifestyle benefits. What matters most to you - privacy, amenities, or affordability?",
      suggestions: [
        "Apartment vs Villa comparison",
        "Best for families",
        "Investment properties",
        "First-time buyer guide"
      ]
    };
  }

  // === BEDROOMS ===
  if (INTENT_PATTERNS.bedrooms.test(msg)) {
    const bedroomNum = msg.match(/[123]/);
    const bhk = bedroomNum ? bedroomNum[0] : null;
    
    if (bhk) {
      const advice = {
        '1': { for: 'Singles/Couples', price: '₹30L-80L', rental: '₹8k-20k' },
        '2': { for: 'Small families', price: '₹50L-1.2Cr', rental: '₹15k-35k' },
        '3': { for: 'Growing families', price: '₹75L-2Cr', rental: '₹20k-50k' },
      }[bhk] || { for: 'Large families', price: '₹1Cr+', rental: '₹40k+' };
      
      return {
        message: `${bhk} BHK - Great choice! 🏡\n\n**Perfect for:** ${advice.for}\n**Typical Price:** ${advice.price}\n**Rental Range:** ${advice.rental}/month\n\n**Smart Tip**: Consider ${bhk} BHK properties in emerging areas for better appreciation. Our investment insights show real-time rental yields and 5-year growth projections!\n\nWant to see specific ${bhk} BHK properties or compare different configurations?`,
        suggestions: [
          `${bhk} BHK in high-demand areas`,
          `${bhk} BHK investment potential`,
          "Compare bedroom sizes",
          "Best layouts"
        ]
      };
    }
    
    return {
      message: "Choosing the right size is crucial! 🛏️\n\n**Quick Guide:**\n• **1 BHK**: Singles/couples (600-800 sqft)\n• **2 BHK**: Small families (900-1200 sqft)\n• **3 BHK**: Medium families (1200-1600 sqft)\n• **4+ BHK**: Large families (1800+ sqft)\n\n**Pro Tip**: Think 5 years ahead! Growing family? Buy an extra room now rather than moving later. Our property comparison tool helps you see price differences clearly.",
      suggestions: [
        "1 BHK starter homes",
        "2 BHK best value",
        "3 BHK family homes",
        "Size vs price analysis"
      ]
    };
  }

  // === AMENITIES ===
  if (INTENT_PATTERNS.amenities.test(msg)) {
    return {
      message: "Amenities can make or break your lifestyle! 🌟\n\n**Must-Have Amenities:**\n✓ 24/7 Security & CCTV\n✓ Power Backup\n✓ Water Supply\n✓ Parking (covered)\n\n**Lifestyle Upgrades:**\n🏊 Swimming Pool\n🏋️ Gym & Fitness Center\n🌳 Garden & Kids Play Area\n🎾 Sports Facilities\n🏢 Clubhouse\n\n**Premium Features:**\n• Home Automation\n• Concierge Services\n• EV Charging Points\n• Rainwater Harvesting\n\n**Smart Search**: Use our filters to find properties with your must-have amenities. Pro tip: More amenities = higher maintenance costs!",
      suggestions: [
        "Filter by amenities",
        "Luxury vs basic properties",
        "Family-friendly features",
        "Pet-friendly homes"
      ]
    };
  }

  // === COMPARISON ===
  if (INTENT_PATTERNS.comparison.test(msg)) {
    return {
      message: "Comparing properties is where smart decisions happen! 🔍\n\n**Our Comparison Tool Shows:**\n\n📊 **Side-by-Side View** (up to 4 properties)\n• Price & Price per sqft\n• Bedrooms, bathrooms, area\n• Amenities count\n• Location scores\n\n💡 **Smart Insights**\n• Green highlights for best values\n• Investment potential ratings\n• Rental yield calculations\n• 5-year appreciation forecasts\n\n🎯 **How to Compare**\n1. Click 'Compare' button on property cards\n2. Select up to 4 properties\n3. View detailed comparison table\n4. Make informed decisions!\n\nThe comparison bar appears at the bottom when you select properties. Try it!",
      suggestions: [
        "Go to properties page",
        "Investment comparison tips",
        "How to choose best value",
        "Price vs quality analysis"
      ]
    };
  }

  // === RECOMMENDATIONS ===
  if (INTENT_PATTERNS.recommendation.test(msg)) {
    return {
      message: "Our AI recommendations are like having a personal real estate advisor! 🎯\n\n**How it Works:**\n\n🧠 **Smart Learning**\n• Tracks properties you view\n• Analyzes your searches\n• Notes what you save\n• Understands your budget\n\n✨ **Personalized Matches**\n• Properties matching your preferences\n• Similar to what you liked\n• Better deals in your range\n• Trending in your areas\n\n📈 **Investment Rankings**\n• High ROI properties first\n• Upcoming appreciation areas\n• Rental yield potential\n• Market demand analysis\n\n**Your Recommendations Page** shows properties scored 0-100 based on YOUR preferences. The more you browse, the smarter it gets!",
      suggestions: [
        "View my recommendations",
        "How scoring works",
        "Update preferences",
        "Best investment picks"
      ]
    };
  }

  // === PROCESS / HOW TO ===
  if (INTENT_PATTERNS.process.test(msg)) {
    return {
      message: "Let me walk you through the PropSmart experience! 📋\n\n**🏡 Finding Your Property:**\n1. **Search & Filter**: Location, budget, type, size\n2. **Browse Listings**: View photos, details, scores\n3. **Save Favorites** ❤️:  Create your shortlist\n4. **Compare Options** ⚖️: Side-by-side analysis\n\n**📊 Smart Features:**\n5. **Investment Insights**: ROI, yields, appreciation\n6. **Set Alerts** 🔔: Get notified of price drops\n7. **AI Recommendations**: Personalized suggestions\n\n**💬 Getting Started:**\n8. **Contact Owners**: Direct communication\n9. **Schedule Visits**: Book property tours\n10. **Close Deal**: Assistance available\n\nNo registration needed to browse! Create an account to save properties and set alerts. What specific step needs clarity?",
      suggestions: [
        "How to save properties",
        "Setting up alerts",
        "Understanding property scores",
        "Contact sellers directly"
      ]
    };
  }

  // === INVESTMENT ===
  if (INTENT_PATTERNS.investment.test(msg)) {
    return {
      message: "Smart investing is our specialty! 📈💰\n\n**Investment Insights We Provide:**\n\n🎯 **Rental Yield** (2-4% annually)\n• Rental income ÷ Property value\n• Shows cash flow potential\n• Compare across properties\n\n📊 **Price Analysis**\n• Current price vs market avg\n• ₹ per sqft comparisons\n• Value rating (Good/Fair/Premium)\n\n📈 **Appreciation Forecasts**\n• 3-year growth estimate\n• 5-year ROI projections\n• Based on area trends\n\n🔥 **Demand Level** (High/Medium/Low)\n• Market activity indicators\n• Resale potential\n• Liquidity analysis\n\n**Pro Tips:**\n✓ Look for high rental yield in IT corridors\n✓ Check infrastructure development plans\n✓ Metro connectivity boosts appreciation 20-30%\n✓ Emerging areas offer best long-term growth\n\nWant to see high-ROI properties or specific area analysis?",
      suggestions: [
        "High rental yield properties",
        "Best appreciation areas",
        "EMI vs Rent calculator",
        "Investment strategy guide"
      ]
    };
  }

  // === PLATFORM FEATURES ===
  if (INTENT_PATTERNS.features.test(msg)) {
    return {
      message: "PropSmart is packed with features to make your search effortless! 🚀\n\n **🎯 Smart Search**\n• Advanced filters (20+ criteria)\n• Map view with property pins\n• Instant results\n\n**🤖 AI-Powered**\n• Personalized recommendations\n• Smart property scoring (0-100)\n• Behavioral learning\n\n**⚖️ Compare & Analyze**\n• Side-by-side comparison (4 properties)\n• Investment insights dashboard\n• Rental yield calculator\n\n**🔔 Smart Alerts**\n• Price drop notifications\n• New listings alerts\n• Custom search alerts\n\n**⭐ Reviews & Ratings**\n• User reviews for properties\n• Verified tenant feedback\n• Helpful voting system\n\n**💬 24/7 AI Assistant** (that's me! 👋)\n• Instant answers\n• Property guidance\n• Platform navigation\n\nWhat would you like to explore first?",
      suggestions: [
        "Try advanced search",
        "Set up my first alert",
        "Compare properties",
        "View recommendations"
      ]
    };
  }

  // === SAVE/FAVORITES ===
  if (INTENT_PATTERNS.save.test(msg)) {
    return {
      message: "Saving properties is super easy! ❤️\n\n**How to Save:**\n1. Browse property listings\n2. Click the **heart icon** ❤️ on any property card\n3. Property is saved to your favorites!\n\n**Your Saved Properties:**\n• Accessible from homepage\n• Compare saved properties easily\n• Track price changes\n• Create your shortlist\n\n**Pro Tip**: Save at least 5-10 properties before comparing. This helps you understand market rates and make better decisions!\n\nYour saved properties appear in the 'Saved Properties' section on the homepage. Try saving one now!",
      suggestions: [
        "Browse properties to save",
        "View saved properties",
        "Compare saved items",
        "Set alerts on favorites"
      ]
    };
  }

  // === ALERTS ===
  if (INTENT_PATTERNS.alerts.test(msg)) {
    return {
      message: "Never miss a great deal with Smart Alerts! 🔔\n\n**Alert Types:**\n\n📉 **Price Drop Alerts**\n• Get notified when prices decrease\n• Set on specific properties or areas\n\n🆕 **New Listings**\n• Matching your search criteria\n• Be first to know\n\n💾 **Saved Search Alerts**\n• Save complex filters\n• Auto-notify on matches\n\n📈 **Price Increase Alerts**\n• Track market trends\n• Understand appreciation\n\n**How to Set Up:**\n1. Go to Alerts page (🔔 icon in navbar)\n2. Choose alert type\n3. Set filters (location, budget, type)\n4. Toggle 'Active'\n\nAlerts are checked daily and sent via notifications. Visit `/alerts` to create your first alert!",
      suggestions: [
        "Create price alert",
        "Set up new listing alert",
        "Manage my alerts",
        "Alert best practices"
      ]
    };
  }

  // === JOKE ===
  if (INTENT_PATTERNS.joke.test(msg)) {
    const jokes = [
      "Why don't property hunters ever get lost? Because they always follow the... property map! 🗺️😄",
      "What did the tenant say to the landlord? 'I'm floored by this apartment!' 🏠😂",
      "Why did the house go to the doctor? It had window panes! 🪟😆",
      "How do properties stay in shape? They do house work! 💪🏡",
    ];
    return {
      message: jokes[Math.floor(Math.random() * jokes.length)] + "\n\nNeed help finding your dream property? I'm better at that than jokes! 😊",
      suggestions: [
        "Show me properties",
        "Help me search",
        "Investment tips",
        "Platform features"
      ]
    };
  }

  // === DEFAULT INTELLIGENT RESPONSE ===
  const hasQuestion = /\?/.test(msg);
  const isShort = msg.split(' ').length <= 3;
  
  if (hasQuestion || msg.length > 20) {
    return {
      message: "That's a great question! 🤔 While I may not have a specific answer for that exact query, I'm constantly learning to serve you better.\n\n**Here's what I CAN definitely help with:**\n\n🔍 **Property Search**\n• Finding properties by budget, location, type\n• Advanced filtering and recommendations\n\n📊 **Investment Analysis**\n• Rental yields and ROI calculations\n• Price comparisons and market trends\n\n⚖️ **Smart Comparison**\n• Side-by-side property analysis\n• Value assessment\n\n🔔 **Alerts & Tracking**\n• Price drop notifications\n• New listing alerts\n\nCould you rephrase your question or let me know which of these areas interests you?",
      suggestions: [
        "Find properties in my budget",
        "Best investment areas",
        "How to use comparison",
        "Platform features"
      ]
    };
  }

  // Very short/unclear input
  return {
    message: "I'm here to help! 😊 I can assist you with:\n\n• **Finding Properties**: Budget, location, size\n• **Investment Advice**: ROI, yields, appreciation\n• **Platform Features**: How to compare, save, set alerts\n• **Market Insights**: Trends, pricing, demand\n\nWhat would you like to explore?",
    suggestions: [
      "Show me affordable properties",
      "Best areas to invest",
      "How does comparison work?",
      "Platform tour"
    ]
  };
}

/**
 * Generate contextual suggestions based on user history (future enhancement)
 */
export function generateSuggestions(context?: {
  lastViewed?: string[];
  savedCount?: number;
  searchHistory?: string[];
}): string[] {
  const suggestions: string[] = [];

  if (context?.lastViewed && context.lastViewed.length > 0) {
    suggestions.push("Properties similar to what you viewed");
  }

  if (context?.savedCount && context.savedCount > 0) {
    suggestions.push("Compare my saved properties");
    suggestions.push(`Analysis of my ${context.savedCount} saved properties`);
  }

  if (context?.searchHistory && context.searchHistory.length > 0) {
    suggestions.push("Refine my recent searches");
  }

  // Default suggestions
  suggestions.push(
    "Best properties under ₹75L",
    "High ROI investment properties",
    "Set up price drop alerts",
    "How to buy property guide"
  );

  return suggestions.slice(0, 4);
}
