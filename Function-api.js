import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_KEY
);

export const handler = async () => {

const { data } = await supabase
.from("measurements")
.select("*")
.order("created_at", { ascending: false })
.limit(50);

return {
statusCode: 200,
body: JSON.stringify(data)
};
};
