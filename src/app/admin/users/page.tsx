"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Search, ShieldOff, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AdminNav } from "@/components/layout/admin-nav";
import { ProtectedRoute } from "@/components/layout/protected-route";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RoleBadge } from "@/components/shared/status-badge";
import { PageLoader, EmptyState } from "@/components/shared/loading";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { adminApi, getErrorMessage } from "@/lib/api";
import type { User } from "@/types";
import { getInitials, cn } from "@/lib/utils/utils";

const ROLE_TABS = ["all", "CUSTOMER", "TECHNICIAN", "ADMIN"];

function UsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [banTarget, setBanTarget] = useState<User | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getUsers({
        searchTerm: search || undefined,
        role: role === "all" ? undefined : role,
      });
      setUsers(res.data || []);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [search, role]);

  useEffect(() => {
    load();
  }, [load]);

  const confirmToggleBan = async () => {
    if (!banTarget) return;
    const next = banTarget.activeStatus === "BANNED" ? "ACTIVE" : "BANNED";
    setBusy(true);
    try {
      await adminApi.updateUser(banTarget.id, { activeStatus: next });
      toast.success(next === "BANNED" ? "User banned" : "User unbanned");
      setBanTarget(null);
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <AdminNav />
      <main className="container flex-1 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="mt-1 text-muted-foreground">View, filter, and manage platform users</p>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs value={role} onValueChange={setRole}>
            <TabsList className="flex h-auto flex-wrap gap-1">
              {ROLE_TABS.map((r) => (
                <TabsTrigger key={r} value={r} className="text-xs sm:text-sm">
                  {r === "all" ? "All roles" : r.charAt(0) + r.slice(1).toLowerCase()}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              load();
            }}
            className="flex gap-2"
          >
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64"
            />
            <Button type="submit" size="icon" aria-label="Search">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>

        {loading ? (
          <PageLoader />
        ) : users.length === 0 ? (
          <EmptyState title="No users found" description="Try a different search term or role filter" />
        ) : (
          <div className="space-y-3">
            {users.map((u) => (
              <Card key={u.id}>
                <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarImage src={u.avatar || undefined} alt={u.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                        {getInitials(u.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{u.name}</p>
                      <p className="truncate text-sm text-muted-foreground">{u.email}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <RoleBadge role={u.role} />
                        <span
                          className={cn(
                            "text-xs font-medium",
                            u.activeStatus === "BANNED" ? "text-destructive" : "text-muted-foreground"
                          )}
                        >
                          {u.activeStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                  {u.role !== "ADMIN" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className={
                        u.activeStatus === "BANNED"
                          ? undefined
                          : "[--btn-fill:theme(colors.red.600)] border-red-200 text-red-700 dark:border-red-800 dark:text-red-400"
                      }
                      onClick={() => setBanTarget(u)}
                    >
                      {u.activeStatus === "BANNED" ? (
                        <>
                          <ShieldCheck className="mr-1.5 h-4 w-4" /> Unban
                        </>
                      ) : (
                        <>
                          <ShieldOff className="mr-1.5 h-4 w-4" /> Ban
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <ConfirmDialog
        open={!!banTarget}
        onOpenChange={(v) => !v && setBanTarget(null)}
        title={banTarget?.activeStatus === "BANNED" ? "Unban this user?" : "Ban this user?"}
        description={
          banTarget
            ? banTarget.activeStatus === "BANNED"
              ? `${banTarget.name} will regain access to their account.`
              : `${banTarget.name} will immediately lose access to their account.`
            : undefined
        }
        confirmLabel={banTarget?.activeStatus === "BANNED" ? "Yes, unban" : "Yes, ban user"}
        destructive={banTarget?.activeStatus !== "BANNED"}
        loading={busy}
        onConfirm={confirmToggleBan}
      />

      <Footer />
    </div>
  );
}

export default function AdminUsersPage() {
  return (
    <ProtectedRoute roles={["ADMIN"]}>
      <UsersManagement />
    </ProtectedRoute>
  );
}
