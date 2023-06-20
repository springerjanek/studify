import { createClient } from "@supabase/supabase-js";
import { config } from "../enviroments/supabase.config";

export const supabase = createClient(config.supabaseUrl, config.supabaseKey);
