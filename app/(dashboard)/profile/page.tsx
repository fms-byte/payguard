"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/components/shared/loading-spinner";

export default function ProfilePage() {
  const [profile, setProfile] = useState<{
    email?: string;
    firstName?: string;
    lastName?: string;
    created_at?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();
      
      const { data: { user } } = await supabase.auth.getUser();

      console.log(user)
      
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        setProfile({
          email: user.email,
          firstName: profile?.first_name,
          lastName: profile?.last_name,
          created_at: new Date(user.created_at).toLocaleDateString()
        });
      }
      
      setLoading(false);
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Please sign in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="container min-h-[90vh] items-center justify-center max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <p className="text-gray-600">{profile.email}</p>
          </div>
          
          <div className="space-y-2">
            <Label>First Name</Label>
            <p className="text-gray-600">{profile.firstName || "Not provided"}</p>
          </div>
          
          <div className="space-y-2">
            <Label>Last Name</Label>
            <p className="text-gray-600">{profile.lastName || "Not provided"}</p>
          </div>
          
          <div className="space-y-2">
            <Label>Member Since</Label>
            <p className="text-gray-600">{profile.created_at}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
