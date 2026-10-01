"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProtectedRoute } from "@/components/layout/protected-route";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RoleBadge } from "@/components/shared/status-badge";
import { ProfilePhotoField } from "@/components/shared/profile-photo";
import { usersApi, getErrorMessage } from "@/lib/api";
import { useAuthStore } from "@/lib/auth/store";

type FormValues = {
  name: string;
  phone?: string;
  address?: string;
};

function ProfilePage() {
  const { user, setUser, fetchMe } = useAuthStore();
  const [submitting, setSubmitting] = useState(false);
  // undefined = no change | string = new URL | null = remove
  const [pendingPhoto, setPendingPhoto] = useState<string | null | undefined>(undefined);

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
      });
      setPendingPhoto(undefined);
    }
  }, [user, reset]);

  const currentPhoto = user?.profilePhoto || user?.avatar || null;

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    try {
      const payload: {
        name?: string;
        phone?: string;
        address?: string;
        profilePhoto?: string | null;
      } = {
        name: data.name,
        phone: data.phone,
        address: data.address,
      };

      if (pendingPhoto !== undefined) {
        payload.profilePhoto = pendingPhoto;
      }

      const res = await usersApi.updateMe(payload);
      if (res.data) {
        setUser(res.data);
      } else if (fetchMe) {
        await fetchMe();
      }
      setPendingPhoto(undefined);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container flex-1 py-10 max-w-lg">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">Profile Settings</h1>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Your account</CardTitle>
              {user && <RoleBadge role={user.role} />}
            </div>
            <CardDescription>{user?.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Profile picture section */}
              <ProfilePhotoField
                name={user?.name || "User"}
                photoUrl={pendingPhoto === undefined ? currentPhoto : pendingPhoto}
                onChange={(url) => setPendingPhoto(url)}
                disabled={submitting}
              />

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name", { required: true })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" {...register("phone")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" {...register("address")} />
              </div>
              <Button type="submit" disabled={submitting} className="rounded-full">
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

export default function Profile() {
  return (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  );
}