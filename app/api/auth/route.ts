import { NextRequest, NextResponse } from "next/server";
import { login, signup, logout } from "./action";
import { loginSchema, signupSchema } from "@/lib/schema/users";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    // console.log("From API: ", body);

    switch (action) {
      case "login": {
        const validatedData = loginSchema.parse(body.data);
        await login(validatedData);
        return NextResponse.json({ success: true });
      }

      case "signup": {
        const validatedData = signupSchema.parse(body.data);
        const userId = await signup(validatedData);
        const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_API}/profiles`, {
          method: 'POST',
          headers: {
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            id: userId,
            first_name: validatedData.firstName,
            last_name: validatedData.lastName,
            email: validatedData.email,
            role: "user"
          })
        });
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to create profile');
        }
        return NextResponse.json({ success: true });
      }

      case "logout": {
        await logout();
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
