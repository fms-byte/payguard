"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/auth/auth-form";
// import { loginValidationSchema } from "@/lib/validations/auth";
// import { supabaseClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    // setError("");
    // try {
    //   const { error } = await supabaseClient.auth.signInWithPassword({
    //     email,
    //     password,
    //   });
    //   if (error) throw error;
    //   router.push("/(dashboard)/dashboard");
    // } catch (err) {
    //   setError(err.message || "Failed to login");
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-gray-600">Please sign in to your account</p>
      </div>
      <LoginForm />
    </div>
  </div>
  );
}
