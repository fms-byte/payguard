import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id);

    if (error) {
      console.error("Error fetching profile:", error);
      return NextResponse.json(
        { error: "Error fetching profile" },
        { status: 500 }
      );
    }

    const profile = data[0];

    return NextResponse.json({
      email: profile.email,
      firstName: profile?.first_name,
      lastName: profile?.last_name,
      role: profile?.role,
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await createClient();
    const { firstName, lastName } = await request.json();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: firstName,
        last_name: lastName,
      })
      .eq("id", user.id)
      .select()

    if (error) {
      console.error("Error fetching profile:", error);
      return NextResponse.json(
        { error: "Error fetching profile" },
        { status: 500 }
      );
    }

    if (error) {
      console.error("Error updating profile:", error);
      return NextResponse.json(
        { error: "Error updating profile" },
        { status: error }
      );
    }

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
