"use client";

import { Badge } from "@/components/ui/badge";
import { bookingStatusColor, paymentStatusColor, cn } from "@/lib/utils/utils";

export function BookingStatusBadge({ status }: { status: string }) {
  const safeStatus = status || "";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
        bookingStatusColor(safeStatus)
      )}
    >
      {safeStatus.replace(/_/g, " ")}
    </span>
  );
}

export function PaymentStatusBadge({ status }: { status: string }) {
  const safeStatus = status || "";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        paymentStatusColor(safeStatus)
      )}
    >
      {safeStatus}
    </span>
  );
}

export function RoleBadge({ role }: { role: string }) {
  const colors: Record<string, string> = {
    ADMIN: "bg-purple-100 text-purple-800 border-purple-200",
    TECHNICIAN: "bg-blue-100 text-blue-800 border-blue-200",
    CUSTOMER: "bg-slate-100 text-slate-800 border-slate-200",
  };
  return (
    <Badge variant="outline" className={cn("font-medium", colors[role] || "")}>
      {role}
    </Badge>
  );
}

