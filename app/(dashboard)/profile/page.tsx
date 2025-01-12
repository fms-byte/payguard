"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { User } from "@/lib/schema/users";
import { useToast } from "@/hooks/use-toast"


export default function ProfilePage() {
  const [profile, setProfile] = useState<Omit<User, "password"> | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();

        console.log(data)
        setProfile(data);
      } catch (error) {
        console.error('Error loading profile:', error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Failed to load profile. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [toast]);

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
        <p className="text-muted-foreground">Please sign in to view your profile</p>
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
            <p className="text-muted-foreground">{profile.email}</p>
          </div>
          
          <div className="space-y-2">
            <Label>First Name</Label>
            <p className="text-muted-foreground">
              {profile.firstName || "Not provided"}
            </p>
          </div>
          
          <div className="space-y-2">
            <Label>Last Name</Label>
            <p className="text-muted-foreground">
              {profile.lastName || "Not provided"}
            </p>
          </div>
          
          <div className="space-y-2">
            <Label>Role</Label>
            <p className="text-muted-foreground capitalize">
              {profile.role}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
