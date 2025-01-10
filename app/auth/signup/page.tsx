"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignupForm } from "@/components/auth/auth-form";
// import { signupValidationSchema } from "@/lib/validations/auth";
// import { supabaseClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    // setError("");
    // try {
    //   const { error } = await supabaseClient.auth.signUp({
    //     email,
    //     password,
    //   });
    //   if (error) throw error;
    //   router.push("/auth/login");
    // } catch (err) {
    //   setError(err.message || "Failed to signup");
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="mt-2 text-gray-600">Get started with your new account</p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}
