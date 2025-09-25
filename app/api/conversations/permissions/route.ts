import { canStartConversation } from "@/lib/actions/companion.actions";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await canStartConversation();
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ allowed: false, remaining: 0, error: error?.message || "Failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}


