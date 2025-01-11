"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { LoginFormData, SignupFormData } from "@/lib/schema/users";

export async function login(data: LoginFormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw error;
  }
}

export async function signup(data: SignupFormData) {
  const supabase = await createClient();
  const { email, password, firstName, lastName } = data;

  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (authError) throw authError;

    return authData.user?.id;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
}

export async function logout() {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    revalidatePath("/", "layout");
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
}
