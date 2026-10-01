"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProtectedRoute } from "@/components/layout/protected-route";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { techniciansApi, getErrorMessage } from "@/lib/api";
import { useAuthStore } from "@/lib/auth/store";

function TechProfilePage() {
  const user = useAuthStore((s) => s.user);
  const profile = user?.technicianProfile;
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      bio: profile?.bio || "",
      skills: (profile?.skills || []).join(", "),
      experienceYears: profile?.experienceYears ?? 0,
      hourlyRate: profile?.hourlyRate ?? 0,
      location: profile?.location || "",
    },
  });

  const onSubmit = async (data: {
    bio: string;
    skills: string;
    experienceYears: number;
    hourlyRate: number;
    location: string;
  }) => {
    setSubmitting(true);
    try {
      await techniciansApi.updateProfile({
        bio: data.bio,
        skills: data.skills.split(",").map((s) => s.trim()).filter(Boolean),
        experienceYears: Number(data.experienceYears),
        hourlyRate: Number(data.hourlyRate),
        location: data.location,
      });
      toast.success("Profile updated");
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
        <h1 className="mb-8 text-3xl font-bold tracking-tight">Technician Profile</h1>
        <Card>
          <CardHeader>
            <CardTitle>Professional details</CardTitle>
            <CardDescription>Update your skills, rates, and bio</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" {...register("bio")} rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Input id="skills" placeholder="plumbing, electrical" {...register("skills")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experienceYears">Years of experience</Label>
                <Input id="experienceYears" type="number" {...register("experienceYears")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly rate (BDT)</Label>
                <Input id="hourlyRate" type="number" {...register("hourlyRate")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" {...register("location")} />
              </div>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

export default function TechProfile() {
  return (
    <ProtectedRoute roles={["TECHNICIAN"]}>
      <TechProfilePage />
    </ProtectedRoute>
  );
}
