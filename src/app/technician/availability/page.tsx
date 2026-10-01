"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, Save, CalendarClock } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProtectedRoute } from "@/components/layout/protected-route";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageLoader } from "@/components/shared/loading";
import { techniciansApi, getErrorMessage } from "@/lib/api";
import type { WeekDay } from "@/types";

const DAYS: WeekDay[] = [
  "SATURDAY",
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
];

const DAY_LABEL: Record<string, string> = {
  SATURDAY: "Sat",
  SUNDAY: "Sun",
  MONDAY: "Mon",
  TUESDAY: "Tue",
  WEDNESDAY: "Wed",
  THURSDAY: "Thu",
  FRIDAY: "Fri",
};

type Slot = { dayOfWeek: WeekDay; startTime: string; endTime: string };

function AvailabilityPage() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await techniciansApi.getAvailability();
        // Backend returns dayOfWeek (not day)
        const data: Slot[] = (res.data || []).map((s: any) => ({
          dayOfWeek: (s.dayOfWeek as WeekDay) || s.day || "MONDAY",
          startTime: (s.startTime || "09:00").slice(0, 5),
          endTime: (s.endTime || "17:00").slice(0, 5),
        }));
        setSlots(
          data.length
            ? data
            : (["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY"] as WeekDay[]).map((d) => ({
                dayOfWeek: d,
                startTime: "09:00",
                endTime: "17:00",
              }))
        );
        setDirty(false);
      } catch (err) {
        toast.error(getErrorMessage(err));
        setSlots(
          (["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY"] as WeekDay[]).map((d) => ({
            dayOfWeek: d,
            startTime: "09:00",
            endTime: "17:00",
          }))
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const updateSlot = (dayOfWeek: WeekDay, field: "startTime" | "endTime", value: string) => {
    setSlots((prev) =>
      prev.map((s) => (s.dayOfWeek === dayOfWeek ? { ...s, [field]: value } : s))
    );
    setDirty(true);
  };

  const toggleDay = (dayOfWeek: WeekDay) => {
    setSlots((prev) => {
      const exists = prev.find((s) => s.dayOfWeek === dayOfWeek);
      if (exists) return prev.filter((s) => s.dayOfWeek !== dayOfWeek);
      return [...prev, { dayOfWeek, startTime: "09:00", endTime: "17:00" }];
    });
    setDirty(true);
  };

  /** PUT /technician/availability */
  const save = async () => {
    if (slots.length === 0) {
      toast.error("Select at least one day");
      return;
    }

    for (const s of slots) {
      const start = s.startTime.slice(0, 5);
      const end = s.endTime.slice(0, 5);
      if (!/^\d{2}:\d{2}$/.test(start) || !/^\d{2}:\d{2}$/.test(end)) {
        toast.error(`Invalid time on ${s.dayOfWeek}`);
        return;
      }
      if (start >= end) {
        toast.error(`${s.dayOfWeek}: start time must be before end time`);
        return;
      }
    }

    setSaving(true);
    try {
      const payload = slots.map((s) => ({
        dayOfWeek: s.dayOfWeek, // UPPERCASE — backend enum
        startTime: s.startTime.slice(0, 5),
        endTime: s.endTime.slice(0, 5),
        isActive: true,
      }));

      await techniciansApi.updateAvailability(payload);
      toast.success("Availability updated successfully");
      setDirty(false);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <PageLoader />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container flex-1 py-10 max-w-2xl">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <CalendarClock className="h-8 w-8 text-primary" />
              Availability
            </h1>
            <p className="mt-1 text-muted-foreground">
              Set the days and hours you are available for bookings
            </p>
          </div>

          {/* Header Update button */}
          <Button onClick={save} disabled={saving || slots.length === 0} className="rounded-full">
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {dirty ? "Update availability" : "Save availability"}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Weekly schedule</CardTitle>
            <CardDescription>
              Toggle a day on/off, set working hours, then click{" "}
              <strong>Update availability</strong>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {DAYS.map((day) => {
              const slot = slots.find((s) => s.dayOfWeek === day);
              return (
                <div
                  key={day}
                  className="flex flex-wrap items-center gap-3 rounded-xl border p-3 bg-card"
                >
                  <Button
                    type="button"
                    variant={slot ? "default" : "outline"}
                    size="sm"
                    className="w-28 rounded-full"
                    onClick={() => toggleDay(day)}
                  >
                    {DAY_LABEL[day] || day.slice(0, 3)}
                  </Button>
                  {slot ? (
                    <>
                      <div className="flex items-center gap-2">
                        <Label className="text-xs text-muted-foreground">From</Label>
                        <Input
                          type="time"
                          value={slot.startTime}
                          onChange={(e) => updateSlot(day, "startTime", e.target.value)}
                          className="w-32"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-xs text-muted-foreground">To</Label>
                        <Input
                          type="time"
                          value={slot.endTime}
                          onChange={(e) => updateSlot(day, "endTime", e.target.value)}
                          className="w-32"
                        />
                      </div>
                    </>
                  ) : (
                    <span className="text-sm text-muted-foreground">Off</span>
                  )}
                </div>
              );
            })}

            {/* Bottom Update button */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                onClick={save}
                disabled={saving || slots.length === 0}
                className="rounded-full min-w-[180px]"
              >
                {saving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Update availability
              </Button>
              {dirty && (
                <span className="text-xs text-amber-600 dark:text-amber-400">
                  You have unsaved changes
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

export default function TechAvailabilityPage() {
  return (
    <ProtectedRoute roles={["TECHNICIAN"]}>
      <AvailabilityPage />
    </ProtectedRoute>
  );
}