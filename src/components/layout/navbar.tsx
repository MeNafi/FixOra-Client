"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Calendar,
  Settings,
  CreditCard,
  ArrowRight,
  Users,
  FolderOpen,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useAuthStore } from "@/lib/auth/store";
import { getInitials, cn } from "@/lib/utils/utils";
import { toast } from "sonner";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/register?role=TECHNICIAN", label: "For professionals" },
  { href: "/technicians", label: "About us" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout, hasRole } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const dashboardHref = hasRole("ADMIN")
    ? "/admin"
    : hasRole("TECHNICIAN")
      ? "/technician"
      : "/customer";

  return (
    <header className="sticky top-0 z-50 w-full transition-all">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-primary/90 via-primary to-primary/90 text-primary-foreground text-xs py-1.5 px-4 text-center font-medium shadow-inner">
        <div className="container flex items-center justify-center gap-2">
          <Sparkles className="h-3.5 w-3.5 shrink-0 animate-pulse" />
          <span>
            New: Same-day service is now available in select cities.{" "}
            <Link
              href="/services"
              className="underline underline-offset-4 hover:opacity-80 transition-opacity font-semibold"
            >
              Explore services
            </Link>
          </span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="border-b bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
        <div className="container flex h-16 items-center justify-between gap-4">
          {/* Brand Logo & Title */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg sm:text-xl tracking-tight transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/20">
              <Wrench className="h-4 w-4" strokeWidth={2.2} />
            </div>
            <span className="leading-none">
              Fix<span className="text-primary">O</span>ra
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive =
                pathname.startsWith(link.href.split("?")[0]) &&
                link.href.startsWith("/");

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "relative px-3.5 py-1.5 text-sm font-medium transition-colors rounded-full",
                    isActive
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-accent/80 rounded-full -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="group relative h-11 w-11 rounded-full p-0 flex items-center justify-center focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    <Avatar className="h-10 w-10 border-[2.5px] border-primary p-[1.5px] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:shadow-md group-hover:shadow-primary/20">
                      <AvatarImage
                        src={user.profilePhoto || user.avatar || undefined}
                        alt={user.name}
                        className="h-full w-full rounded-full object-cover"
                      />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 shadow-lg">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground leading-none">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push(dashboardHref)}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>

                  {hasRole("CUSTOMER") && (
                    <>
                      <DropdownMenuItem
                        onClick={() => router.push("/customer/bookings")}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        My Bookings
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push("/customer/payments")}
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Payments
                      </DropdownMenuItem>
                    </>
                  )}

                  {hasRole("ADMIN") && (
                    <>
                      <DropdownMenuItem
                        onClick={() => router.push("/admin/users")}
                      >
                        <Users className="mr-2 h-4 w-4" />
                        Users
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push("/admin/technicians")}
                      >
                        <Wrench className="mr-2 h-4 w-4" />
                        Technicians
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push("/admin/bookings")}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Bookings
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push("/admin/payments")}
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Payments
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push("/admin/categories")}
                      >
                        <FolderOpen className="mr-2 h-4 w-4" />
                        Categories
                      </DropdownMenuItem>
                    </>
                  )}

                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive focus:text-destructive focus:bg-destructive/10"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="font-medium"
                >
                  <Link href="/login">Log in</Link>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="rounded-full px-4 shadow-sm"
                >
                  <Link href="/register">
                    Get started <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9 rounded-lg"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t bg-background lg:hidden"
            >
              <div className="container space-y-2 py-4">
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {!isAuthenticated && (
                  <div className="flex flex-col gap-2 pt-3 border-t">
                    <Button
                      variant="outline"
                      asChild
                      className="w-full rounded-lg"
                    >
                      <Link href="/login" onClick={() => setMobileOpen(false)}>
                        Log in
                      </Link>
                    </Button>
                    <Button asChild className="w-full rounded-lg">
                      <Link
                        href="/register"
                        onClick={() => setMobileOpen(false)}
                      >
                        Get started
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
