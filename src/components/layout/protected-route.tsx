"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth/store";
import type { Role } from "@/types";
import { PageLoader } from "@/components/shared/loading";

export function ProtectedRoute({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles?: Role[];
}) {
  const router = useRouter();
  const { isAuthenticated, user, isLoading, hasRole } = useAuthStore();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated || !user) {
      router.replace("/login");
      return;
    }
    if (roles && roles.length > 0 && !hasRole(...roles)) {
      const fallback =
        user.role === "ADMIN" ? "/admin" : user.role === "TECHNICIAN" ? "/technician" : "/customer";
      router.replace(fallback);
    }
  }, [isAuthenticated, user, isLoading, roles, hasRole, router]);

  if (isLoading || !isAuthenticated || !user) {
    return <PageLoader />;
  }

  if (roles && roles.length > 0 && !hasRole(...roles)) {
    return <PageLoader />;
  }

  return <>{children}</>;
}
