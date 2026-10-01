import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "BDT") {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date, opts?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    ...opts,
  }).format(new Date(date));
}

export function formatDateOnly(date: string | Date) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(date));
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/** Booking status — clear color coding */
export function bookingStatusColor(status: string) {
  const normalizedStatus = status?.toUpperCase();

  const map: Record<string, string> = {
    REQUESTED: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800", // Yellow/Orange
    ACCEPTED: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800", // Blue
    DECLINED: "bg-red-100 text-red-700 border-red-300 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800", // Red
    PAID: "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800", // Purple
    IN_PROGRESS: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800", // Green
    COMPLETED: "bg-slate-200 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700", // Gray
    CANCELLED: "bg-rose-950 text-rose-100 border-rose-800 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800", // Dark Red
  };

  return map[normalizedStatus] || "bg-zinc-100 text-zinc-700 border-zinc-200";
}

export function paymentStatusColor(status: string) {
  const normalizedStatus = status?.toUpperCase();

  const map: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
    COMPLETED: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
    FAILED: "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300",
    REFUNDED: "bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300",
  };

  return map[normalizedStatus] || "bg-zinc-100 text-zinc-700";
}

/**
 * Action button variants for clarity.
 */
export function actionBtnClass(action: "pay" | "delete" | "cancel" | "accept" | "decline" | "start" | "complete" | "default") {
  const map: Record<string, string> = {
    pay: "bg-blue-600 hover:bg-blue-700 text-white",
    delete: "bg-red-600 hover:bg-red-700 text-white",
    cancel: "border-red-200 text-red-700 dark:border-red-800 dark:text-red-400 [--btn-fill:theme(colors.red.600)] hover:border-red-600",
    accept: "bg-emerald-600 hover:bg-emerald-700 text-white",
    decline: "bg-red-600 hover:bg-red-700 text-white",
    start: "bg-purple-600 hover:bg-purple-700 text-white",
    complete: "bg-emerald-600 hover:bg-emerald-700 text-white",
    default: "",
  };

  return map[action] || "";
}