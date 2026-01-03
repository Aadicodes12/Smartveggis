"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@/contexts/SessionContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User } from "lucide-react";

interface UserProfileCardProps {
  userId: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ userId }) => {
  const { profile, fetchUserProfile } = useSession();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(profile?.first_name || "");
  const [lastName, setLastName] = useState(profile?.last_name || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [location, setLocation] = useState(profile?.location || "");
  const [role, setRole] = useState(profile?.role || "client"); // Default to client

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || "");
      setLastName(profile.last_name || "");
      setPhone(profile.phone || "");
      setLocation(profile.location || "");
      setRole(profile.role || "client");
    }
  }, [profile]);

  const handleUpdateProfile = async () => {
    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        location: location,
        role: role,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) {
      console.error("Error updating profile:", error);
      toast.error(t('update_error'));
    } else {
      toast.success(t('update_success'));
      fetchUserProfile(userId); // Re-fetch to update context
      setIsEditing(false);
    }
  };

  if (!profile) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{t('profile_card_title')}</CardTitle>
          <CardDescription>Loading profile...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-24">
            <p className="text-gray-500">{t('profile_card_title')}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg dark:bg-gray-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <User className="h-8 w-8 text-green-600 dark:text-green-400" />
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t('profile_card_title')}</CardTitle>
        </div>
        <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">{t('first_name')}</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">{t('last_name')}</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">{t('email')}</Label>
            <Input id="email" type="email" value={profile.id} disabled /> {/* Display user ID as email for now */}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">{t('phone')}</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!isEditing}
              placeholder="e.g., +91 9876543210"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">{t('location')}</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={!isEditing}
              placeholder="e.g., Mumbai, India"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">{t('role')}</Label>
            <Input
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as 'client' | 'vendor')}
              disabled={!isEditing}
            />
          </div>
          {isEditing && (
            <Button onClick={handleUpdateProfile} className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white">
              {t('update_profile')}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;