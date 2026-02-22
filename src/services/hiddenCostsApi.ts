import { supabase } from "@/integrations/supabase/client";

export interface HiddenCostsRequest {
    propertyPrice: number;
    state: string;
    propertyStatus: string;
    propertyType: string;
}

export interface HiddenCostsResponse {
    stampDuty: number;
    stampDutyRate: number;
    registration: number;
    registrationRate: number;
    gst: number;
    totalOneTimeCosts: number;
    totalAllInPrice: number;
}

/**
 * Stamp duty rates by state / city — used as a local fallback when the
 * Edge Function is unreachable.
 */
const STAMP_DUTY_RATES: Record<string, number> = {
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

/**
 * Local fallback calculation — mirrors the Edge Function logic so the
 * feature still works when the function is not yet deployed.
 */
function calculateLocally(req: HiddenCostsRequest): HiddenCostsResponse {
    const stampDutyRate = STAMP_DUTY_RATES[req.state] ?? 0.05;
    const registrationRate = 0.01;

    const stampDuty = Math.round(req.propertyPrice * stampDutyRate);
    const registration = Math.round(req.propertyPrice * registrationRate);

    let gst = 0;
    const status = (req.propertyStatus || "")
        .toLowerCase()
        .replace(/\s+/g, "_");
    if (status === "under_construction") {
        gst =
            req.propertyType === "affordable"
                ? Math.round(req.propertyPrice * 0.01)
                : Math.round(req.propertyPrice * 0.05);
    }

    const totalOneTimeCosts = stampDuty + registration + gst;
    const totalAllInPrice = req.propertyPrice + totalOneTimeCosts;

    return {
        stampDuty,
        stampDutyRate,
        registration,
        registrationRate,
        gst,
        totalOneTimeCosts,
        totalAllInPrice,
    };
}

/**
 * Call the Supabase Edge Function.  Falls back to a local calculation
 * when the function is unavailable (e.g. not yet deployed).
 */
export async function calculateHiddenCosts(
    payload: HiddenCostsRequest
): Promise<HiddenCostsResponse> {
    try {
        const { data, error } = await supabase.functions.invoke(
            "hidden-costs-calculator",
            { body: payload }
        );

        if (error) throw error;
        return data as HiddenCostsResponse;
    } catch (err) {
        console.warn(
            "Edge Function unavailable — using local fallback:",
            err
        );
        return calculateLocally(payload);
    }
}
