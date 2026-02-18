
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const SUPABASE_URL = "https://ogodcfkptrpckhdfkamn.supabase.co";
const SUPABASE_KEY = "sb_publishable_kL6RhYceIXmthXMfMhudjQ_Sz7--JmD"; // Anon Key

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("Missing Supabase credentials.");
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const propertiesPath = path.join(__dirname, '../public/properties.json');

async function verifySystem() {
    console.log("🔍 Starting System Verification...\n");
    let allPassed = true;

    // 1. Verify Local Data
    console.log("1️⃣  Verifying Local Data (properties.json)...");
    if (fs.existsSync(propertiesPath)) {
        try {
            const data = fs.readFileSync(propertiesPath, 'utf8');
            const properties = JSON.parse(data);
            console.log(`   ✅ properties.json found with ${properties.length} items.`);

            // Check UUIDs
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            const validUUIDs = properties.every(p => uuidRegex.test(p.id));

            if (validUUIDs) {
                console.log("   ✅ All Property IDs are valid UUIDs.");
            } else {
                console.error("   ❌ Some Property IDs are NOT valid UUIDs. Sync might fail.");
                allPassed = false;
            }
        } catch (e) {
            console.error("   ❌ Error reading/parsing properties.json:", e.message);
            allPassed = false;
        }
    } else {
        console.error("   ❌ properties.json NOT found.");
        allPassed = false;
    }

    // 2. Verify Database Connection & Tables
    console.log("\n2️⃣  Verifying Database...");

    // Check Properties Table
    const { count: dbCount, error: countError } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true });

    if (countError) {
        console.error("   ❌ Error checking 'properties' table:", countError.message);
        allPassed = false;
    } else {
        console.log(`   ✅ 'properties' table accessible. Row count: ${dbCount}`);
    }

    // Check Saved Properties Table Existence (by selecting 0 rows)
    const { error: savedError } = await supabase
        .from('saved_properties')
        .select('*')
        .limit(0);

    if (savedError) {
        console.error("   ❌ Error accessing 'saved_properties' table:", savedError.message);
        console.error("      (Did you run the migration SQL?)");
        allPassed = false;
    } else {
        console.log("   ✅ 'saved_properties' table verified.");
    }

    console.log("\n" + (allPassed ? "🎉 Verification PASSED! System is ready." : "xxxxxxxx Verification FAILED. Check errors above."));
}

verifySystem();
