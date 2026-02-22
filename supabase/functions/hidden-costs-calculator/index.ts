import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { propertyPrice, state, propertyStatus, propertyType } =
            await req.json();

        if (!propertyPrice || !state) {
            return new Response(
                JSON.stringify({ error: "propertyPrice and state are required" }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        // Stamp duty rates by state
        const stampDutyRates: Record<string, number> = {
            Maharashtra: 0.06,
            Mumbai: 0.06,
            Pune: 0.06,
            Karnataka: 0.05,
            Bangalore: 0.05,
            Gujarat: 0.045,
            Ahmedabad: 0.045,
            Delhi: 0.06,
            "New Delhi": 0.06,
            Noida: 0.07,
            Gurgaon: 0.07,
            Hyderabad: 0.05,
            Chennai: 0.07,
            Kolkata: 0.06,
            Jaipur: 0.05,
            Goa: 0.035,
            Chandigarh: 0.05,
            Kochi: 0.08,
            Mysore: 0.05,
        };

        const registrationRate = 0.01; // 1%

        const stampDutyRate = stampDutyRates[state] ?? 0.05;
        const stampDuty = Math.round(propertyPrice * stampDutyRate);
        const registration = Math.round(propertyPrice * registrationRate);

        // GST applies only to under-construction properties
        let gst = 0;
        const status = (propertyStatus || "").toLowerCase().replace(/\s+/g, "_");
        if (status === "under_construction") {
            gst =
                propertyType === "affordable"
                    ? Math.round(propertyPrice * 0.01)
                    : Math.round(propertyPrice * 0.05);
        }

        const totalOneTimeCosts = stampDuty + registration + gst;
        const totalAllInPrice = propertyPrice + totalOneTimeCosts;

        return new Response(
            JSON.stringify({
                stampDuty,
                stampDutyRate,
                registration,
                registrationRate,
                gst,
                totalOneTimeCosts,
                totalAllInPrice,
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    } catch (err) {
        return new Response(
            JSON.stringify({ error: "Invalid request body" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
});
